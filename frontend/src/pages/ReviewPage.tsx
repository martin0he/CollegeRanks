import {
  Autocomplete,
  Box,
  Button,
  Grid,
  Slider,
  TextField,
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

  useEffect(() => {
    // Fetch the list of universities from your API endpoint
    const fetchUniversities = async () => {
      try {
        const response = await axios.get("http://localhost:8080/uninames"); // Replace with your actual API endpoint
        setUniversities(response.data);
      } catch (error) {
        console.error("Error fetching universities:", error);
      }
    };

    fetchUniversities();
  }, []);

  const handleSubmit = async () => {
    try {
      // Call the backend API to get the university by name
      const response = await axios.post("http://localhost:8080/uni", {
        name: selectedUniversity,
      });

      if (response.data) {
        const selectedUni = response.data; // Assuming the API response structure
       
        const updateRating = await axios.patch(`http://localhost:8080/uni/rating/${selectedUni._id}`,
        {
          overallRating: calculateWeightedAverage(),
        });

        console.log("Uni: ", updateRating.data);

        // Update the ratings on the server
        const updateResponse = await axios.patch(
          //works, but receives wrong input from .get
          `http://localhost:8080/uni/ratings/${selectedUni._id}`,
          {
            ratings: sliderValues,
          }
        );

        
        // Log the updated university (replace with your actual update logic)
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
                  <Typography variant="subtitle2" gutterBottom>
                    {metric}
                  </Typography>

                  <Slider
                    size="small"
                    valueLabelDisplay="auto"
                    aria-label="pretto slider"
                    value={sliderValues[metric]}
                    onChange={handleSliderChange(metric)}
                    onBlur={handleBlur(metric)}
                    sx={{ color: "inherit" }}
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
              getOptionLabel={(universities) => universities} // Adjust based on the structure of your university objects
              value={selectedUniversity}
              onChange={(event, newValue) => {
                setSelectedUniversity(newValue);
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
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
            paddingBottom: 2,
          }}
        >
          <Button variant="contained" color="inherit" onClick={handleSubmit}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
