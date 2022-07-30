import React from "react";
import { Button, Typography } from "@mui/material";

interface SkillBarProps {
  skillCount: number;
  skillName: string;
  getDamageInfo: (skilldamage: number, targetname: string) => void;
  skillDamage: number;
}

export const SkillBar: React.FC<SkillBarProps> = ({
  skillCount,
  skillName,
  getDamageInfo,
  skillDamage,
}) => {
  return (
    <>
      <Typography variant="h5" color="primary" align="center">
        <Button
          size="large"
          className="backButton"
          color="secondary"
          variant="contained"
          onClick={() => {
            getDamageInfo(skillDamage, "character2"); //character2 is targetname
          }}
        >
          {skillName}
        </Button>
      </Typography>
    </>
  );
};
