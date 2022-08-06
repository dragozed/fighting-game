import React, { useContext } from "react";
import { Button, Typography } from "@mui/material";

import { Materials } from "./Materials/Materials";

import { VillageStatusContext } from "../../contexts/VillageStatusContext";

import { villageRequirementsCalculator } from "./utils/villageRequirementsCalculator";
import "./Village.scss";

interface VillageProps {
  getIsVillageOpen: (isgamestarted: boolean) => void;
}

export const Village: React.FC<VillageProps> = ({ getIsVillageOpen }) => {
  const { data, setData } = useContext(VillageStatusContext);

  const trainingGroundsOnClick = () => {
    setData({
      wood: data.wood - data.trainingGroundsWoodReq,
      iron: data.iron - data.trainingGroundsIronReq,
      stone: data.stone - data.trainingGroundsStoneReq,
      trainingGroundsLevel: data.trainingGroundsLevel + 1,
      trainingGroundsWoodReq: villageRequirementsCalculator(
        "TrainingGrounds",
        data.trainingGroundsLevel
      ).woodReq,
      trainingGroundsIronReq: villageRequirementsCalculator(
        "TrainingGrounds",
        data.trainingGroundsLevel
      ).ironReq,
      trainingGroundsStoneReq: villageRequirementsCalculator(
        "TrainingGrounds",
        data.trainingGroundsLevel
      ).stoneReq,
    });
  };

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
          <Materials wood={data.wood} stone={data.stone} iron={data.iron} />
        </div>
        <div className="buildings">
          <div className="row">
            <Typography variant="h5" textAlign="center">
              {"TrainingGroundsLevel=" + data.trainingGroundsLevel}
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
                data.trainingGroundsWoodReq +
                " wood " +
                data.trainingGroundsStoneReq +
                " stone " +
                data.trainingGroundsIronReq +
                " iron "}
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
};
