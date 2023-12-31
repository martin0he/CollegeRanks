import {
  Autocomplete,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";

export const SchoolInfoPage: React.FC = () => {
  const [uniStats, setUniStats] = useState({});
  const [uniOverall, setUniOverall] = useState<number | null>(null);
  const [error, setError] = useState("");

  const [universities, setUniversities] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [inputValue, setInputValue] = useState("");

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

  const handleSubmit = async () => {
    try {
      // Call the backend API to get the university by name
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/uni`, {
        name: selectedUniversity,
      });

      if (response.data) {
        const selectedUni = response.data;

        const stats = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/uni/metrics/${selectedUni._id}`
        ); // selected university's metrics
        const overall = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/uni/overall/${selectedUni._id}`
        ); // selected university's overall rating
        setUniOverall(overall.data?.average);
        setUniStats(stats.data);
        // Update the ratings on the server
      } else {
        setError(error);
        console.error("University not found");
      }
    } catch (error) {
      console.log("Error showing rating:", error);
    }
  };

  return (
    <Box>
      <Typography variant="h4" px={3} mt={3}>
        <b>Check Your School</b>
      </Typography>
      <Grid
        container
        direction="column"
        sx={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Grid item px={3}>
          <Box
            sx={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
            py={5}
          >
            <Autocomplete
              options={universities}
              getOptionLabel={(universities) => universities}
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
                  label="Select University..."
                  variant="outlined"
                  sx={{ width: "330px" }}
                />
              )}
            />
            <Button
              variant="contained"
              color="inherit"
              onClick={handleSubmit}
              sx={{ bgcolor: "inherit", "&:hover": { bgcolor: "#f5f4f3" } }}
            >
              Check
            </Button>
          </Box>
        </Grid>
        <Grid
          item
          sx={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
          paddingBottom={4}
          px={5}
        >
          <Box>
            <Grid
              container
              fontSize="16px"
              sx={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              {error ? (
                <Typography variant="subtitle1" color="error">
                  {error}
                </Typography>
              ) : (
                Object.entries(uniStats).map(([metric, average]) => (
                  <Grid
                    container
                    spacing={12}
                    sx={{
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <Grid item key={metric} xs={4} sm={5} md={6}>
                      <Typography variant="subtitle1" fontSize="1.1em">
                        {`${metric}: `}
                      </Typography>
                    </Grid>
                    <Grid item key={metric}>
                      <Typography variant="subtitle1" fontSize="1.1em">
                        {`${average}`}
                      </Typography>
                    </Grid>
                  </Grid>
                ))
              )}
              <Grid item>
                <Typography
                  fontSize="1.1em"
                  fontWeight={500}
                >{`Overall Rating: ${
                  uniOverall !== null ? uniOverall.toFixed(2) : "N/A"
                }`}</Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
