import React, { useState, useEffect, useContext } from "react";
import { Button, Typography } from "@mui/material";

import { VillageStatusContext } from "../../contexts/VillageStatusContext";

import "./Village.scss";

interface VillageProps {
  getIsVillageOpen: (isgamestarted: boolean) => void;
}

export const Village: React.FC<VillageProps> = ({ getIsVillageOpen }) => {
  const [villageStatus, setVillageStatus] = useState(
    useContext(VillageStatusContext)
  );
  const [trainingGroundsReq, setTrainingGroundsReq] = useState([0, 0, 0]); //wood,stone,iron

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
          <Typography variant="h5" textAlign="center">
            {"Wood=" + villageStatus.wood}
          </Typography>
          <Typography variant="h5" textAlign="center">
            {"Stone=" + villageStatus.stone}
          </Typography>
          <Typography variant="h5" textAlign="center">
            {"Iron=" + villageStatus.iron}
          </Typography>
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
                setVillageStatus((prevState) => ({
                  //thats important for setting OBJECTS with usestate
                  ...prevState,
                  trainingGroundsLevel: villageStatus.trainingGroundsLevel + 1,
                }));
              }}
            >
              +
            </Button>
            <Typography variant="h5" textAlign="center">
              {"Requirements=" +
                trainingGroundsReq[0] +
                " wood " +
                trainingGroundsReq[1] +
                " stone " +
                trainingGroundsReq[2] +
                " iron "}
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
};
