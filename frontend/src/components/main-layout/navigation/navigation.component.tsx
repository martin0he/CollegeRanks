/* eslint-disable object-curly-newline */
import { Close, Menu } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Dialog,
  Hidden,
  IconButton,
  Slide,
  Toolbar,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { useState } from "react";
import { SectionIdEnum } from "../../../types/section-id/section-id";
import AnchorLink from "react-anchor-link-smooth-scroll";

export type NavigationProps = {
  isSmall: boolean;
};

const navigationItems = [
  {
    text: "Home",
    to: SectionIdEnum.home,
  },
  {
    text: "Ranking",
    to: SectionIdEnum.ranking,
  },
  {
    text: "Review",
    to: SectionIdEnum.review,
  },
  {
    text: "Login",
    to: SectionIdEnum.login,
  },
  {
    text: "Signup",
    to: SectionIdEnum.signup,
  },
];

const Transition = React.forwardRef(
  (
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
  ) => {
    return <Slide direction="left" ref={ref} {...props} />;
  }
);

export const Navigation: React.FC<NavigationProps> = ({ isSmall }) => {
  const [open, setOpen] = useState(false);
  const onOpenHandler = () => setOpen(true);
  const onCloseHandler = () => setOpen(false);

  const mappedItems = navigationItems.map(({ to, text }) => {
    return (
      <AnchorLink
        className="all_unset"
        key={to}
        href={`#${to}`}
        offset={isSmall ? "56px" : "64px"}
      >
        <Button
          color="inherit"
          size="large"
          fullWidth={isSmall}
          onClick={onCloseHandler}
          sx={{ color: '#880C79' }}
        >
          {text}
        </Button>
      </AnchorLink>
    );
  });

  return (
    <>
      <Hidden smDown>
        <Box display="flex" gap={2}>
          {mappedItems}
        </Box>
      </Hidden>
      <Hidden smUp>
        <IconButton color="inherit" onClick={onOpenHandler}>
          <Menu />
        </IconButton>
        <Dialog
          open={open}
          fullScreen
          fullWidth
          TransitionComponent={Transition}
          hideBackdrop
          PaperProps={{
            sx: {
              boxShadow: "none",
            },
          }}
        >
          <AppBar
            position="static"
            sx={{ background: "#F5E8D2", color: "text.primary" }}
          >
            <Toolbar>
              <Typography variant="h5" sx={{ flexGrow: 1 }}>
                Menu
              </Typography>
              <IconButton color="inherit" onClick={onCloseHandler}>
                <Close />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Box display="flex" flexDirection="column" py={3} width="100%">
            {mappedItems}
          </Box>
        </Dialog>
      </Hidden>
    </>
  );
};
