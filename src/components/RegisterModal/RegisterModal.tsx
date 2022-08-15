import React, { useState } from "react";
import Modal from "react-modal";
import { Button, TextField, Typography, FormControl } from "@mui/material";
import axios from "axios";
import bcrypt from "bcryptjs";

Modal.setAppElement("#root"); //to prevent assistive technologies such as screenreaders from reading content outside of the content of modal

interface RegisterModalProps {
  isRegisterOpen: boolean;
  getIsRegisterOpen: (isRegisteropen: boolean) => void;
}
const salt = bcrypt.genSaltSync(10);

export const RegisterModal: React.FC<RegisterModalProps> = ({
  isRegisterOpen,
  getIsRegisterOpen,
}) => {
  const [formInput, setFormInput] = useState({
    userName: "",
    eMail: "",
    password: "",
  });

  const submitVillageStatus =
    async (/*event: React.FormEvent<HTMLFormElement>*/) => {
      await axios.post("https://fighting-game-backend.herokuapp.com/villageStatus/addStatus", {
        userName: formInput.userName,
      });
      //async arrow func declaration
    };

  const submitUser = async (/*event: React.FormEvent<HTMLFormElement>*/) => {
    //async arrow func declaration
    await axios.post("https://fighting-game-backend.herokuapp.com/users/addUser", {
      userName: formInput.userName,
      password: bcrypt.hashSync(formInput.password, salt), //encrypted password
      eMail: formInput.eMail,
    });
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    setFormInput((FormInput) => ({
      ...FormInput,
      [event.target.name]: name,
    }));
  };
  return (
    <>
      <Modal
        isOpen={isRegisterOpen}
        onRequestClose={() => getIsRegisterOpen(false)}
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
            backgroundColor: "mediumseagreen",
          },
        }}
      >
        <Typography variant="h5">Register Form</Typography>
        <FormControl variant="standard">
          <TextField
            label="UserName"
            name="userName"
            onChange={changeHandler}
          />
          <TextField label="E-Mail" name="eMail" onChange={changeHandler} />
          <TextField
            label="Password"
            type="password"
            name="password"
            onChange={changeHandler}
          />
          <Button
            type="submit"
            size="large"
            sx={{ top: "1rem" }}
            className="submitButton"
            color="primary"
            variant="contained"
            onClick={() => {
              submitVillageStatus();
              submitUser();
              getIsRegisterOpen(false);
            }}
          >
            Submit
          </Button>
          <Button
            size="large"
            className="backButton"
            sx={{ top: "2rem" }}
            color="secondary"
            variant="contained"
            onClick={() => {
              getIsRegisterOpen(false);
            }}
          >
            Back
          </Button>
        </FormControl>
      </Modal>
    </>
  );
};
