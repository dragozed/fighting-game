import React from "react";
import { Button, Typography } from "@mui/material";

interface SkillBarProps {
  skillCount: number;
  skillName: string;
  getDamageInfo: (skilldamage: number, targetname: string) => void;
  skillDamage: number;
  skillTarget: string;
}

export const SkillBar: React.FC<SkillBarProps> = ({
  skillCount,
  skillName,
  getDamageInfo,
  skillDamage,
  skillTarget,
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
            console.log(skillTarget);
            getDamageInfo(skillDamage / 2, skillTarget); //character2 is targetname
          }}
        >
          {skillName}
        </Button>
      </Typography>
    </>
  );
};
