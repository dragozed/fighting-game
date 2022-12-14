import React, { useContext, useEffect } from "react";
import { Button, Typography, Box } from "@mui/material";
import Cookies from "js-cookie";
import axios from "axios";

import { Materials } from "./Materials/Materials";

import { VillageStatusContext } from "../../contexts/VillageStatusContext";

import { villageRequirementsCalculator } from "./utils/villageRequirementsCalculator";
import "./Village.scss";
import address from "./img/address.png";
import "bootstrap/dist/css/bootstrap.min.css";

interface VillageProps {
  getIsVillageOpen: (isgamestarted: boolean) => void;
}

export const Village: React.FC<VillageProps> = ({ getIsVillageOpen }) => {
  const { villageStatus, setVillageStatus } = useContext(VillageStatusContext);

  useEffect(() => {
    getVillageStatus();
  }, []);

  const getVillageStatus = async () => {
    const getVillageStatus = await axios.get(
      "https://fighting-game-backend.herokuapp.com/villageStatus",
      {
        params: {
          userName: JSON.parse(Cookies.get("userInfo") || "").userName,
        },
      }
    );
    setVillageStatus(getVillageStatus.data[0].villageStatus);
  };

  const trainingGroundsOnClick = async () => {
    if (
      villageStatus.wood >= villageStatus.trainingGroundsWoodReq &&
      villageStatus.stone >= villageStatus.trainingGroundsStoneReq &&
      villageStatus.iron >= villageStatus.trainingGroundsIronReq
    ) {
      setVillageStatus({
        //set context
        wood: villageStatus.wood - villageStatus.trainingGroundsWoodReq,
        iron: villageStatus.iron - villageStatus.trainingGroundsIronReq,
        stone: villageStatus.stone - villageStatus.trainingGroundsStoneReq,
        trainingGroundsLevel: villageStatus.trainingGroundsLevel + 1,
        trainingGroundsWoodReq: villageRequirementsCalculator(
          "TrainingGrounds",
          villageStatus.trainingGroundsLevel
        ).woodReq,
        trainingGroundsIronReq: villageRequirementsCalculator(
          "TrainingGrounds",
          villageStatus.trainingGroundsLevel
        ).ironReq,
        trainingGroundsStoneReq: villageRequirementsCalculator(
          "TrainingGrounds",
          villageStatus.trainingGroundsLevel
        ).stoneReq,
      });
      console.log(villageStatus);
      await axios.post(
        "https://fighting-game-backend.herokuapp.com/villageStatus/updateStatus",
        {
          //set DB
          userName: JSON.parse(Cookies.get("userInfo") || "").userName,
          villageStatus: {
            //can not set vilageStatus directly
            wood: villageStatus.wood - villageStatus.trainingGroundsWoodReq,
            iron: villageStatus.iron - villageStatus.trainingGroundsIronReq,
            stone: villageStatus.stone - villageStatus.trainingGroundsStoneReq,
            trainingGroundsLevel: villageStatus.trainingGroundsLevel + 1,
            trainingGroundsWoodReq: villageRequirementsCalculator(
              "TrainingGrounds",
              villageStatus.trainingGroundsLevel
            ).woodReq,
            trainingGroundsIronReq: villageRequirementsCalculator(
              "TrainingGrounds",
              villageStatus.trainingGroundsLevel
            ).ironReq,
            trainingGroundsStoneReq: villageRequirementsCalculator(
              "TrainingGrounds",
              villageStatus.trainingGroundsLevel
            ).stoneReq,
          },
        }
      );
    }
  };

  return (
    <>
      <Box sx={{ width: 1, height: 1 }}>
        <div className="village">
          <div className="col col-12">
            <div className="col 4 firstMaterials">
              <Materials
                wood={villageStatus.wood}
                stone={villageStatus.stone}
                iron={villageStatus.iron}
              />
            </div>
            <div className="col 4">
              <Typography variant="h5" textAlign="center">
                {"Requirements=" +
                  villageStatus.trainingGroundsWoodReq +
                  " wood " +
                  villageStatus.trainingGroundsStoneReq +
                  " stone " +
                  villageStatus.trainingGroundsIronReq +
                  " iron "}
              </Typography>
              <Typography variant="h6" textAlign="center">
                {"Currently giving +" +
                  villageStatus.trainingGroundsLevel * 5 +
                  " damage to character and minion"}
              </Typography>
              <img src={address} height="200" className="addressImg" />
            </div>

            <div className="col 4 lastMaterials">
              <div className="bg-img">
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
              </div>
            </div>
          </div>
        </div>
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
      </Box>
    </>
  );
};
