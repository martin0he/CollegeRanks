import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useState } from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";

export const SignupPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: name,
            email: email,
            password: password,
          }),
        }
      );

      if (response.ok) {
        // Registration successful
        console.log("Registration successful!");
      } else {
        // Registration failed
        console.error("Registration failed. Please check your input.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <>
      <Container maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            mt: 5,
            mb: 3,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#e1d6ba" }}>
            <PersonAddIcon />
          </Avatar>
          <Typography variant="h5">Register</Typography>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
            </Grid>
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
              onClick={handleRegister}
            >
              Register
            </Button>
            <Grid container justifyContent={"flex-end"}>
              <Grid item>
                <AnchorLink
                  style={{
                    textDecoration: "none",
                    color: "black",
                    textDecorationLine: "underline",
                  }}
                  href="#login"
                >
                  Already have an account? Login Here
                </AnchorLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};
