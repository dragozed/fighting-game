import React from "react";
import { Typography } from "@mui/material";
import "./HealthBar.scss";
import { ClassNames } from "@emotion/react";

interface HealthBarProps {
  healthPoints: number;
}

export const HealthBar: React.FC<HealthBarProps> = ({ healthPoints }) => {
  return (
    <>
      <div className="backgroundred">
        <Typography variant="h5" color="primary" align="center">
          {healthPoints}
        </Typography>
      </div>
    </>
  );
};
