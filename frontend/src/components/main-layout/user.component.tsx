import { Button, Menu, MenuItem } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";



export const UserStatus: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  
  useEffect(() => {
    // Fetch the user's username
    const getuser = async () => {
      try {
        const us = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/username`, {
          withCredentials: true,
        });
        setUsername(us.data);
      } catch (error) {
        console.log("Could not verify:", error);
      }
    };

    getuser();
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    document.cookie =
      "CR-AUTH=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; //clear cookies by setting expiration to the past
    setAnchorEl(null);
    document.location.reload(); //refresh the page when logging out
  };

  return (
    <div>
      {username ? (
        <div>
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
            color="inherit"
            sx={{
              fontWeight: "700",
              fontSize: "14px",
              py: 1.2,
              px: 1,
              marginLeft: "15px",
            }}
          >
            {username.toUpperCase()}
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              color="inherit"
              sx={{ fontWeight: "500", fontSize: "14px" }}
              onClick={handleLogout}
            >
              LOGOUT
            </MenuItem>
          </Menu>
        </div>
      ) : (
        <div>
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
            color="inherit"
            sx={{
              fontWeight: "700",
              fontSize: "14px",
              py: 1.2,
              px: 1,
              marginLeft: "15px",
            }}
          >
            GUEST
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              color="inherit"
              sx={{ fontWeight: "500", fontSize: "14px" }}
            >
              <AnchorLink style={{ textDecoration: "none" }} href="#login">
                LOGIN
              </AnchorLink>
            </MenuItem>
            <MenuItem
              color="inherit"
              sx={{ fontWeight: "500", fontSize: "14px" }}
            >
              <AnchorLink style={{ textDecoration: "none" }} href="#signup">
                REGISTER
              </AnchorLink>
            </MenuItem>
          </Menu>
        </div>
      )}
    </div>
  );
};
