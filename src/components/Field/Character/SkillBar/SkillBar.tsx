import React from "react";
import { Button, Typography } from "@mui/material";

interface SkillBarProps {
  skillCount: number;
  skillName: string;
  getDamageInfo: (skilldamage: number, targetname: string) => void;
  skillDamage: number;
  skillTarget: string;
  disabled: boolean;
}

export const SkillBar: React.FC<SkillBarProps> = ({
  skillCount,
  skillName,
  getDamageInfo,
  skillDamage,
  skillTarget,
  disabled,
}) => {
  return (
    <>
      <Typography variant="h5" color="primary" align="center">
        <Button
          disabled={disabled}
          size="large"
          className="backButton"
          color="secondary"
          variant="contained"
          onClick={() => {
            getDamageInfo(skillDamage, skillTarget);
          }}
        >
          {skillName}
        </Button>
      </Typography>
    </>
  );
};
