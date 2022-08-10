import React, { useContext } from "react";
import Modal from "react-modal";
import { Button, Typography } from "@mui/material";

Modal.setAppElement("#root"); //to prevent assistive technologies such as screenreaders from reading content outside of the content of your modal

interface LoginModalProps {
  isLoginOpen: boolean;
  getIsLoginOpen: (isloginopen: boolean) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  getIsLoginOpen,
  isLoginOpen,
}) => {
  return (
    <>
      <Modal
        isOpen={isLoginOpen}
        onRequestClose={() => getIsLoginOpen(false)}
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
        <Button
          size="large"
          className="backButton"
          sx={{ position: "absolute", top: "1rem", left: "1rem" }}
          color="secondary"
          variant="contained"
          onClick={() => {
            getIsLoginOpen(false);
          }}
        >
          Back
        </Button>
      </Modal>
    </>
  );
};
