import {
  Autocomplete,
  Box,
  Button,
  Grid,
  Slider,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import axios from "axios";

export const ReviewPage: React.FC = () => {
  const metrics = [
    "Academics",
    "Food",
    "Dorms",
    "Social",
    "Location",
    "Opportunities",
    "Clubs",
    "Safety",
  ];

  const descriptions: Record<string, string> = {
    Academics:
      "Refers to the quality and academic prowess of the school and its faculty.",
    Food: "Refers to the quality, variability, and inclusiveness of the dining hall cuisine.",
    Dorms:
      "Refers to the structure, cleanliness, modernity, habitability and overall living conditions of the school dorms.",
    Social:
      "Refers to the ability to socialize on campus, as well as student groups that promote interactions within the student body.",
    Location:
      "Refers to the ease of access to the campus, proximity to public transportation and/or areas of commerce.",
    Opportunities:
      "Refers to professional, personal, and/or academic opportunities made available to students of all levels.",
    Clubs: "Refers to the quantity and quality of student-led organizations.",
    Safety:
      "Refers to the level of safety in/around campus and its amount of police presence.",
  };

  const weights: Record<string, number> = {
    Academics: 0.16,
    Food: 0.08,
    Dorms: 0.12,
    Social: 0.12,
    Location: 0.15,
    Opportunities: 0.17,
    Clubs: 0.08,
    Safety: 0.12,
  };

  const [sliderValues, setSliderValues] = useState<{ [key: string]: number }>(
    metrics.reduce((acc, metric) => ({ ...acc, [metric]: 50 }), {})
  );

  const handleSliderChange =
    (metric: string) => (event: Event, newValue: number | number[]) => {
      console.log('Event:', event);
      setSliderValues((prevValues) => ({
        ...prevValues,
        [metric]: newValue as number,
      }));
    };

  const handleInputChange =
    (metric: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value === "" ? 0 : Number(event.target.value);
      setSliderValues((prevValues) => ({
        ...prevValues,
        [metric]: value,
      }));
    };

  const handleBlur = (metric: string) => () => {
    const value = sliderValues[metric];
    if (value < 0) {
      setSliderValues((prevValues) => ({ ...prevValues, [metric]: 0 }));
    } else if (value > 100) {
      setSliderValues((prevValues) => ({ ...prevValues, [metric]: 100 }));
    }
  };

  const calculateWeightedAverage = () => {
    const valuesArray = Object.keys(weights).map(
      (metric) => sliderValues[metric]
    );
    const weightsArray = Object.values(weights);

    return weightedAverage(valuesArray, weightsArray);
  };

  const weightedAverage = (nums: number[], weights: number[]): number => {
    const [sum, weightSum] = weights.reduce(
      (acc: [number, number], w: number, i: number) => {
        acc[0] = acc[0] + nums[i] * w;
        acc[1] = acc[1] + w;
        return acc;
      },
      [0, 0]
    );
    return weightSum !== 0 ? sum / weightSum : 0;
  };

  const [universities, setUniversities] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Fetch the list of university names
    const fetchUniversities = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/unis/names`);
        setUniversities(response.data);
      } catch (error) {
        console.error("Error fetching universities:", error);
      }
    };

    fetchUniversities();
  }, []);

  useEffect(() => {
    // verify current user status
    const verify = async () => {
      try {
        const verification = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/verify`, {
          withCredentials: true,
        });
        setIsLoggedIn(verification.data);
      } catch (error) {
        console.log("Could not verify:", error);
      }
    };

    verify();
  }, []);

  const handleSubmit = async () => {
    try {
      // Call the backend API to get the university by name
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/uni`, {
        name: selectedUniversity,
      });

      if (response.data) {
        const selectedUni = response.data;

        const updateRating = await axios.patch(
          `${import.meta.env.VITE_BACKEND_URL}/uni/overall/${selectedUni._id}`,
          {
            overallRating: calculateWeightedAverage(),
          },
          { withCredentials: true }
        );

        console.log(updateRating.data);

        // Update the ratings on the server
        const updateResponse = await axios.patch(
          `${import.meta.env.VITE_BACKEND_URL}/uni/metrics/${selectedUni._id}`,
          {
            ratings: sliderValues,
          },
          { withCredentials: true }
        );

        console.log("Updated University:", updateResponse.data);
      } else {
        console.error("University not found");
      }
    } catch (error) {
      console.log("Error updating rating:", error);
    }
  };

  return (
    <Box>
      <Grid container direction="column" rowSpacing={1}>
        <Grid item>
          <Box py={2} px={3}>
            <Typography variant="h4" mb={3}>
              <b>Review Your School</b>
            </Typography>
            <Grid container direction="row" spacing={2}>
              {Object.keys(weights).map((metric) => (
                <Grid item xs={6} key={metric}>
                  <Tooltip
                    title={descriptions[metric]}
                    arrow
                    sx={{ width: "0%" }}
                    placement="top-start"
                  >
                    <Typography variant="subtitle2" gutterBottom>
                      {metric}
                    </Typography>
                  </Tooltip>

                  <Slider
                    size="small"
                    valueLabelDisplay="off"
                    aria-label="pretto slider"
                    value={sliderValues[metric]}
                    onChange={handleSliderChange(metric)}
                    onBlur={handleBlur(metric)}
                  />
                  <TextField
                    size="small"
                    id={`${metric}-input`}
                    variant="outlined"
                    value={sliderValues[metric]}
                    onChange={handleInputChange(metric)}
                    onBlur={handleBlur(metric)}
                    inputProps={{
                      step: 1,
                      min: 0,
                      max: 100,
                      type: "number",
                    }}
                  />
                </Grid>
              ))}
            </Grid>
            <Box
              py={1}
              sx={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <Typography
                sx={{ fontWeight: "bold" }}
              >{`Score: ${calculateWeightedAverage().toFixed(2)}`}</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          sx={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            paddingBottom: 2,
          }}
        >
          <Box>
            <Autocomplete
              options={universities}
              getOptionLabel={(universities) => universities}
              value={selectedUniversity}
              onChange={(event, newValue) => {
                setSelectedUniversity(newValue);
                console.log('Event:', event);
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
                console.log('Event:', event);
              }}
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search for Universities..."
                  variant="outlined"
                  sx={{ width: "450px" }}
                />
              )}
            />
          </Box>
        </Grid>
        <Grid
          item
          sx={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            paddingBottom: 4,
          }}
        >
          <Button
            variant="contained"
            color="inherit"
            onClick={handleSubmit}
            sx={{
              bgcolor: "inherit",
              "&:hover": { bgcolor: "#f5f4f3" },
              cursor: isLoggedIn ? "pointer" : "not-allowed",
            }}
            disabled={!isLoggedIn}
          >
            {isLoggedIn ? "Submit" : "Login to Submit"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
