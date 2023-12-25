import {
  Box,
  Grid,
  Slider,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React, { useState } from "react";

export const ReviewPage: React.FC = () => {
  const metrics = [
    "Difficulty",
    "Food",
    "Dorms",
    "Social Life",
    "Location",
    "Opportunities",
    "Clubs",
    "Safety",
  ];

    const [sliderValues, setSliderValues] = useState<{ [key: string]: number }>(
      metrics.reduce((acc, metric) => ({ ...acc, [metric]: 30 }), {})
    );
  
    const handleSliderChange = (metric: string) => (event: Event, newValue: number | number[]) => {
      setSliderValues((prevValues) => ({
        ...prevValues,
        [metric]: newValue as number,
      }));
    };
  
    const handleInputChange = (metric: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
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


  return (
    <Box
      py={4}
      width="45%"
      height="60%"
      sx={{ justifyContent: "center", alignItems: "center", direction: "flex" }}
    >
      <Grid container spacing={2}>
        {metrics.map((metric, index) => (
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
    </Box>
  );
};
