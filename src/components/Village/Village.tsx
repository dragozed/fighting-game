import React, { useState, useEffect, useContext } from "react";
import { Button, Typography } from "@mui/material";

import { Materials } from "./Materials/Materials";

import { VillageStatusContext } from "../../contexts/VillageStatusContext";

import { villageRequirementsCalculator } from "./utils/villageRequirementsCalculator";
import "./Village.scss";

interface VillageProps {
  getIsVillageOpen: (isgamestarted: boolean) => void;
}

export const Village: React.FC<VillageProps> = ({ getIsVillageOpen }) => {
  const villageStatus = useContext(VillageStatusContext);

  useEffect(() => {
    console.log(villageStatus);
  }, [villageStatus.wood]);

  function trainingGroundsOnClick() {
    villageStatus.wood =
      villageStatus.wood - villageStatus.trainingGroundsWoodReq;

    villageStatus.stone =
      villageStatus.stone - villageStatus.trainingGroundsStoneReq;
    villageStatus.iron =
      villageStatus.iron - villageStatus.trainingGroundsIronReq;

    villageStatus.trainingGroundsLevel = villageStatus.trainingGroundsLevel + 1;

    villageStatus.trainingGroundsWoodReq = villageRequirementsCalculator(
      "TrainingGrounds",
      villageStatus.trainingGroundsLevel
    ).woodReq;
    villageStatus.trainingGroundsStoneReq = villageRequirementsCalculator(
      "TrainingGrounds",
      villageStatus.trainingGroundsLevel
    ).stoneReq;
    villageStatus.trainingGroundsIronReq = villageRequirementsCalculator(
      "TrainingGrounds",
      villageStatus.trainingGroundsLevel
    ).ironReq;
  }

  return (
    <>
      <Button
        size="large"
        className="backButton"
        sx={{ position: "absolute", top: "1rem", left: "1rem" }}
        color="secondary"
        variant="contained"
        onClick={() => {
          getIsVillageOpen(false);
        }}
      >
        Back
      </Button>
      <div className="village">
        <div className="materials">
          <Materials
            wood={villageStatus.wood}
            stone={villageStatus.stone}
            iron={villageStatus.iron}
          />
        </div>
        <div className="buildings">
          <div className="row">
            <Typography variant="h5" textAlign="center">
              {"TrainingGroundsLevel=" + villageStatus.trainingGroundsLevel}
            </Typography>
            <Button
              size="small"
              className="training-grounds-button"
              sx={{}}
              disabled={false}
              color="secondary"
              variant="contained"
              onClick={() => {
                trainingGroundsOnClick();
              }}
            >
              +
            </Button>
            <Typography variant="h5" textAlign="center">
              {"Requirements=" +
                villageStatus.trainingGroundsWoodReq +
                " wood " +
                villageStatus.trainingGroundsStoneReq +
                " stone " +
                villageStatus.trainingGroundsIronReq +
                " iron "}
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
};
