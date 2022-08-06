import React, { useContext } from "react";
import { Button, Typography, Grid, Box, Container, AppBar } from "@mui/material";

import { Materials } from "./Materials/Materials";

import { VillageStatusContext } from "../../contexts/VillageStatusContext";

import { villageRequirementsCalculator } from "./utils/villageRequirementsCalculator";
import "./Village.scss";
import address from './img/address.png';


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
      <Box>
        <Container fixed>
          <AppBar>
            <div className="village">
              <Grid container spacing={12}>
                <Grid item xs={4}>
                  <Materials wood={data.wood} stone={data.stone} iron={data.iron} />
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="h5" textAlign="center">
                    {"Requirements=" +
                      data.trainingGroundsWoodReq +
                      " wood " +
                      data.trainingGroundsStoneReq +
                      " stone " +
                      data.trainingGroundsIronReq +
                      " iron "}
                  </Typography>
                  <img src={address} height="200" className="addressImg" />
                </Grid>
                <Grid item xs={4}>
                  <div className="bg-img">
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
