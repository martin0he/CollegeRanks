import { Box, Grid, Slider, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

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
  return (
    <Box
      py={4}
      width="45%"
      height="40%"
      sx={{ justifyContent: "center", alignItems: "center", direction: "flex" }}
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
  );
};
