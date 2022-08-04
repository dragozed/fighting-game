import React, { useContext } from "react";
import Modal from "react-modal";
import ReactAudioPlayer from "react-audio-player";
import { Button, Typography } from "@mui/material";

import { StageStatusContext } from "../../../contexts/StageStatusContext";

import "./EndStageModal.scss";

Modal.setAppElement("#root"); //to prevent assistive technologies such as screenreaders from reading content outside of the content of your modal

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

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
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
        {stageStatus[0] === "allieswin" ? "You Won!" : "YOU DIED"}
      </Typography>
      <Typography variant="h5" textAlign="center">
        {stageStatus[0] === "allieswin" && stageStatus[1] === 2
          ? "That was the last stage, game is over. Back to lobby."
          : stageStatus[0] === "allieswin"
          ? "Go next stage"
          : "Back to lobby"}
      </Typography>
      {stageStatus[0] === "allieswin" ? (
        <Button
          size="large"
          className="modalButton"
          sx={{ top: "1rem" }}
          color="secondary"
          variant="contained"
          onClick={() => {
            setModalIsOpen(false);
            getIsGameStarted(true);
            stageStatus[0] = "ongoing";
            stageStatus[1] = stageStatus[1] + 1;
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
          setModalIsOpen(false);
          getIsGameStarted(false);
          stageStatus[0] = "ongoing";
        }}
      >
        Close
      </Button>

      {stageStatus[0] === "allieswin" ? (
        <ReactAudioPlayer
          src="https://cdn.pixabay.com/audio/2021/08/04/audio_12b0c7443c.mp3?filename=success-fanfare-trumpets-6185.mp3"
          autoPlay
        />
      ) : stageStatus[0] === "enemieswin" ? (
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
