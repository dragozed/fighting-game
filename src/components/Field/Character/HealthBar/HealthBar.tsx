import React from "react";
import { Typography } from "@mui/material";

interface HealthBarProps {
  healthPoints: number;
}

export const HealthBar: React.FC<HealthBarProps> = ({ healthPoints }) => {
  return (
    <>
      <Typography variant="h5" color="primary" align="center">
        {healthPoints}
      </Typography>
    </>
  );
};
