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

        const stats = await axios.get(
          `http://localhost:8080/uni/stats/${selectedUni._id}`
        );
        const overall = await axios.get(
          `http://localhost:8080/uni/overall/${selectedUni._id}`
        );
        setUniOverall(overall.data?.average);
        setUniStats(stats.data);
        console.log(overall.data);
        console.log(stats.data);

        // Update the ratings on the server
      } else {
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
      <Grid container>
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
                  label="Select University..."
                  variant="outlined"
                  sx={{ width: "330px" }}
                />
              )}
            />
            <Button variant="contained" color="inherit" onClick={handleSubmit}>
              Check
            </Button>
          </Box>
        </Grid>
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
          <Grid container fontSize="20px">
            {error ? (
              <Typography variant="subtitle1" color="error">
                {error}
              </Typography>
            ) : (
              Object.entries(uniStats).map(([metric, average]) => (
                <Grid container spacing={12}>
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
              <Typography fontSize="1.1em" fontWeight={500}>{`Overall Rating: ${
                uniOverall !== null ? uniOverall.toFixed(2) : "N/A"
              }`}</Typography>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Box>
  );
};
