import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import "./HealthBar.scss";

interface HealthBarProps {
  healthPoints: number;
  characterVisualName: string;
}

export const HealthBar: React.FC<HealthBarProps> = ({
  healthPoints,
  characterVisualName,
}) => {
  const [maxHealthPoints, setMaxHealthPoints] = useState(healthPoints);
  const [healthPercentage, setHealthPercentage] = useState(100 + "%");

  useEffect(() => {
    setHealthPercentage((healthPoints / maxHealthPoints) * 100 + "%");
    //set maxhealtpoints if healthpoints increases
    if (healthPoints > maxHealthPoints) {
      setMaxHealthPoints(healthPoints);
    }
  }, [healthPoints, maxHealthPoints]);

  const styleHealthBar = (healthpercentage: string) => ({
    background:
      "linear-gradient(90deg, red " + healthpercentage + ", white 0%)",
    border: "solid",
    borderColor: "brown",
  });
  return (
    <>
      <Typography variant="h5" color="primary" align="center">
        {characterVisualName}
      </Typography>
      <div style={styleHealthBar(healthPercentage)}>
        <Typography variant="h5" color="primary" align="center">
          {healthPoints}
        </Typography>
      </div>
    </>
  );
};
