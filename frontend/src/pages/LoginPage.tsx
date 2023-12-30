import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { useState } from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";
import LoginIcon from '@mui/icons-material/Login';


export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        // Authentication successful, redirect or handle accordingly
        console.log("Login successful!");
      } else {
        // Authentication failed
        console.log("Login failed. Please check your credentials.");
      }
      document.location.reload();
    } catch (error) {
      console.log("Error during login:", error);
    }
  };

  return (
    <>
      <Container maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            mt: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#e1d6ba" }}>
            <LoginIcon />
          </Avatar>
          <Typography variant="h5" sx={{ color: "inherit" }}>
            Login
          </Typography>
          <Box sx={{ mt: 1 }}> 
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                color: "inherit",
                bgcolor: "inherit",
                "&:hover": { bgcolor: "#f5f4f3" },
              }}
              onClick={handleLogin}
            >
              Login
            </Button>
            <Grid container justifyContent={"flex-end"}>
              <Grid item>
                <AnchorLink style={{ textDecoration: "none" }} href="#signup">
                  Don't have an account? Register Here
                </AnchorLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};
