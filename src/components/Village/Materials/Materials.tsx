import React from "react";
import { Typography } from "@mui/material";

interface MaterialsProps {
  wood: number;
  stone: number;
  iron: number;
}

export const Materials: React.FC<MaterialsProps> = ({ wood, stone, iron }) => {
  return (
    <>
      <Typography variant="h5" textAlign="center">
        {"Wood=" + wood}
      </Typography>
      <Typography variant="h5" textAlign="center">
        {"Stone=" + stone}
      </Typography>
      <Typography variant="h5" textAlign="center">
        {"Iron=" + iron}
      </Typography>
    </>
  );
};
