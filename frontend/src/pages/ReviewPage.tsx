import {
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
    metrics.reduce((acc, metric) => ({ ...acc, [metric]: 30 }), {})
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

  const [options, setOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  useEffect(() => {
    // Make API call to fetch options from the database
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/unis");
        setOptions(response.data); // Assuming the API returns an array of strings
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      // Call the backend API to get the university by name
      const response = await axios.get(
        `http://localhost:8080/uni/${selectedOption}`
      );

      if (response.data) {
        const selectedUni = response.data; // Assuming the API response structure

        // Update the rating on the server
        const updateResponse = await axios.patch(
          `http://localhost:8080/unis/${selectedUni._id}`,
          {
            rating: calculateWeightedAverage()
          }
        );

        // Log the updated university (replace with your actual update logic)
        console.log("Updated University:", updateResponse.data.updatedUni);
      } else {
        console.error("University not found");
      }
    } catch (error) {
      console.log("Error updating rating:", error);
    }
  };

  return (
    <>
      <Box
        py={4}
        width="45%"
        height="40%"
        sx={{
          justifyContent: "center",
          alignItems: "center",
          direction: "flex",
        }}
      >
        <Typography variant="h4" mb={3}>
          <b>Review Your School</b>
        </Typography>
        <Grid container spacing={2}>
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
        <Typography>{`Avg is ${calculateWeightedAverage()}`}</Typography>
      </Box>
      <div>
        <select
          id="dropdown"
          value={selectedOption || ""}
          onChange={handleSelectChange}
        >
          <option value="" disabled>
            Select your school:
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </>
  );
};
