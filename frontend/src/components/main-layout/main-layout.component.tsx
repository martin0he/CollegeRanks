/* eslint-disable object-curly-newline */
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { logoImg } from "../../assets";
import React from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { SectionIdEnum } from "../../types/section-id/section-id";
import { Navigation } from "./navigation/navigation.component";
import { Masthead } from "./masthead-layout.component";
import { UserStatus } from "./user.component";

export type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box height="100vh">
      <AppBar position="fixed" sx={{ background: "#F5E8D2", color: "#880C79" }}>
        <Toolbar>
          <Box flexGrow={1}>
            <AnchorLink
              style={{ textDecoration: "none" }}
              href={`#${SectionIdEnum.home}`}
              offset={isSmall ? "56px" : "64px"}
            >
              <Box
                display="flex"
                alignItems="center"
                gap={0.6}
                sx={{ cursor: "pointer" }}
              >
                <img width="54px" height="54px" src={logoImg} alt="logo" />
                <Typography
                  sx={{
                    width: "fit-content",
                    fontSize: "1.75em",
                    fontWeight: "600",
                    color: "#880C79"
                  }}
                >
                  CollegeRanks
                </Typography>
              </Box>
            </AnchorLink>
          </Box>
          <Navigation isSmall={isSmall} />
          <UserStatus />
        </Toolbar>
        
      </AppBar>
      <Box>
        <Toolbar />
        {children}
        <Masthead />
      </Box>
    </Box>
  );
};
