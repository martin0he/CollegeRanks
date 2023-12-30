import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Icon } from "@mui/material";

interface CustomCardProps {
  title: string;
  icon: React.ReactNode;
  body: string;
}

const CustomCard: React.FC<CustomCardProps> = ({ title, icon, body }) => {
  return (
    <Card sx={{ borderRadius: "20px", height: "100%" }}>
      <CardHeader
        title={title}
        action={
          <IconButton aria-label="settings">
            <Icon>{icon}</Icon>
          </IconButton>
        }
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {body}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CustomCard;
