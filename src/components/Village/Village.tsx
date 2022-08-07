import React, { useContext } from "react";
import {
  Button,
  Typography,
  Grid,
  Box,
  Container,
  AppBar,
} from "@mui/material";

import { Materials } from "./Materials/Materials";

import { VillageStatusContext } from "../../contexts/VillageStatusContext";

import { villageRequirementsCalculator } from "./utils/villageRequirementsCalculator";
import "./Village.scss";
import address from "./img/address.png";

interface VillageProps {
  getIsVillageOpen: (isgamestarted: boolean) => void;
}

export const Village: React.FC<VillageProps> = ({ getIsVillageOpen }) => {
  const { villageStatus, setVillageStatus } = useContext(VillageStatusContext);

  const trainingGroundsOnClick = () => {
    if (
      villageStatus.wood >= villageStatus.trainingGroundsWoodReq &&
      villageStatus.stone >= villageStatus.trainingGroundsStoneReq &&
      villageStatus.iron >= villageStatus.trainingGroundsIronReq
    ) {
      setVillageStatus({
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
    }
  };

  return (
    <>
      <Box>
        <Container fixed>
          <AppBar>
            <div className="village">
              <Grid container spacing={12}>
                <Grid item xs={4}>
                  <Materials
                    wood={villageStatus.wood}
                    stone={villageStatus.stone}
                    iron={villageStatus.iron}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="h5" textAlign="center">
                    {"Requirements=" +
                      villageStatus.trainingGroundsWoodReq +
                      " wood " +
                      villageStatus.trainingGroundsStoneReq +
                      " stone " +
                      villageStatus.trainingGroundsIronReq +
                      " iron "}
                  </Typography>
                  <img src={address} height="200" className="addressImg" />
                </Grid>
                <Grid item xs={4}>
                  <div className="bg-img">
                    <Typography variant="h5" textAlign="center">
                      {"TrainingGroundsLevel=" +
                        villageStatus.trainingGroundsLevel}
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
                </Grid>
              </Grid>
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
          </AppBar>
        </Container>
      </Box>
    </>
  );
};
