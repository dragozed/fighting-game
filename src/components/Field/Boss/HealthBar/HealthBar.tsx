import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";

import { bossStatsCalculator } from "../utils/bossStatsCalculator";

import "./HealthBar.scss";

interface HealthBarProps {
  healthPoints: number;
  armor: number;
  bossName: string;
  bossVisualName: string;
}

export const HealthBar: React.FC<HealthBarProps> = ({
  healthPoints,
  armor,
  bossName,
  bossVisualName,
}) => {
  const [maxHealthPoints, setMaxHealthPoints] = useState(healthPoints);
  const [healthPercentage, setHealthPercentage] = useState(100);

  useEffect(() => {
    //when boss changes set max health
    setMaxHealthPoints(bossStatsCalculator(bossName).healthPoints);
  }, [bossName]);

  useEffect(() => {
    setHealthPercentage((healthPoints / maxHealthPoints) * 100);
  }, [healthPoints, maxHealthPoints]);

  const styleHealthBar = (healthpercentage: number) => ({
    background:
      "linear-gradient(90deg, red " + healthpercentage + "%, white 0%)",
    border: "solid",
    borderColor: "brown",
  });
  return (
    <>
      <Typography variant="h5" color="primary" align="center">
        {bossVisualName}
      </Typography>
      <div style={styleHealthBar(healthPercentage)}>
        <Typography variant="h5" color="primary" align="center">
          {healthPoints}
        </Typography>
      </div>
      <div className="stats">
        <div className="armor">{armor}</div>
      </div>
    </>
  );
};
