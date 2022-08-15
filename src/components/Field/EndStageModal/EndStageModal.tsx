import React, { useContext, useEffect } from "react";
import Modal from "react-modal";
import ReactAudioPlayer from "react-audio-player";
import { Button, Typography } from "@mui/material";
import Cookies from "js-cookie";
import axios from "axios";

import { StageStatusContext } from "../../../contexts/StageStatusContext";
import { VillageStatusContext } from "../../../contexts/VillageStatusContext";

import "./EndStageModal.scss";

Modal.setAppElement("#root"); //to prevent assistive technologies such as screenreaders from reading content outside of the content of modal

interface EndStageModalProps {
  modalIsOpen: boolean;
  setModalIsOpen: (modalisopen: boolean) => void;
  getIsGameStarted: (isgamestarted: boolean) => void;
}

export const EndStageModal: React.FC<EndStageModalProps> = ({
  modalIsOpen,
  setModalIsOpen,
  getIsGameStarted,
}) => {
  const stageStatus = useContext(StageStatusContext);
  const { villageStatus, setVillageStatus } = useContext(VillageStatusContext);

  const postVillageStatus = async () => {
    console.log(villageStatus);
    await axios.post("https://fighting-game-backend.herokuapp.com/villageStatus/updateStatus", {
      userName: JSON.parse(Cookies.get("userInfo") || "").userName,
      villageStatus:
        //can not set vilageStatus directly
        {
          wood: villageStatus.wood,
          iron: villageStatus.iron,
          stone: villageStatus.stone,
          trainingGroundsLevel: villageStatus.trainingGroundsLevel,
          trainingGroundsWoodReq: villageStatus.trainingGroundsWoodReq,
          trainingGroundsIronReq: villageStatus.trainingGroundsIronReq,
          trainingGroundsStoneReq: villageStatus.trainingGroundsStoneReq,
        },
    });
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => (
        postVillageStatus(),
        setModalIsOpen(false),
        stageStatus.stagestatus === "allieswin" && stageStatus.stagenumber < 2
          ? (getIsGameStarted(true),
            (stageStatus.stagestatus = "ongoing"),
            (stageStatus.stagenumber = stageStatus.stagenumber + 1))
          : (getIsGameStarted(false), (stageStatus.stagestatus = "ongoing"))
      )}
      style={{
        overlay: {
          backgroundColor: "grey",
        },
        content: {
          display: "flex",
          color: "orange",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        },
      }}
    >
      <Typography variant="h3" textAlign="center">
        {stageStatus.stagestatus === "allieswin" ? "You Won!" : "YOU DIED"}
      </Typography>
      <Typography variant="h5" textAlign="center">
        {stageStatus.stagestatus === "allieswin" &&
        stageStatus.stagenumber === 2
          ? "That was the last stage, game is over. Back to lobby."
          : stageStatus.stagestatus === "allieswin"
          ? "Go next stage"
          : "Back to lobby"}
      </Typography>
      <Typography textAlign="center">{"Current Resources:"}</Typography>
      <Typography textAlign="center">{"Wood:" + villageStatus.wood}</Typography>
      <Typography textAlign="center">
        {"Stone:" + villageStatus.stone}
      </Typography>
      <Typography textAlign="center">{"Iron:" + villageStatus.iron}</Typography>

      {stageStatus.stagestatus === "allieswin" &&
      stageStatus.stagenumber < 2 ? (
        <Button
          size="large"
          className="modalButton"
          sx={{ top: "1rem" }}
          color="primary"
          variant="contained"
          onClick={() => {
            postVillageStatus();
            setModalIsOpen(false);
            getIsGameStarted(true);
            stageStatus.stagestatus = "ongoing";
            stageStatus.stagenumber = stageStatus.stagenumber + 1;
          }}
        >
          Next Stage
        </Button>
      ) : (
        ""
      )}
      <Button
        size="large"
        className="modalButton"
        sx={{ top: "2rem" }}
        color="secondary"
        variant="contained"
        onClick={() => {
          postVillageStatus();
          setModalIsOpen(false);
          getIsGameStarted(false);
          stageStatus.stagestatus = "ongoing";
        }}
      >
        Close
      </Button>

      {stageStatus.stagestatus === "allieswin" ? (
        <ReactAudioPlayer
          src="https://cdn.pixabay.com/audio/2021/08/04/audio_12b0c7443c.mp3?filename=success-fanfare-trumpets-6185.mp3"
          autoPlay
        />
      ) : stageStatus.stagestatus === "enemieswin" ? (
        <ReactAudioPlayer
          src="https://static.wikia.nocookie.net/dota2_gamepedia/images/c/c4/Misc_soundboard_sad_bone.mp3"
          autoPlay
        />
      ) : (
        ""
      )}
    </Modal>
  );
};
