import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import "./HealthBar.scss";

interface HealthBarProps {
  healthPoints: number;
}

export const HealthBar: React.FC<HealthBarProps> = ({ healthPoints }) => {
  const [maxHealthPoints, setMaxHealthPoints] = useState(healthPoints);
  const [healthPercentage, setHealthPercentage] = useState(100 + "%");

  useEffect(() => {
    setHealthPercentage((healthPoints / maxHealthPoints) * 100 + "%");
    //set maxhealtpoints if healthpoints increases
    if (healthPoints > maxHealthPoints) {
      setMaxHealthPoints(healthPoints);
    }
    console.log(healthPercentage);
  }, [healthPoints]);

  const styleHealthBar = (healthpercentage: string) => ({
    background:
      "linear-gradient(90deg, red " + healthpercentage + ", white 0%)",
    border: "solid",
    borderColor: "brown",
  });
  return (
    <>
      <div>
        <div style={styleHealthBar(healthPercentage)}>
          <Typography variant="h5" color="primary" align="center">
            {healthPoints}
          </Typography>
        </div>
      </div>
    </>
  );
};
