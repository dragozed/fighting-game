import React, { useContext, useState } from "react";
import Modal from "react-modal";
import { Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import bcrypt from "bcryptjs";

Modal.setAppElement("#root"); //to prevent assistive technologies such as screenreaders from reading content outside of the content of modal

interface RegisterModalProps {
  isRegisterOpen: boolean;
  getIsRegisterOpen: (isRegisteropen: boolean) => void;
}
const salt = bcrypt.genSaltSync(10);

export const RegisterModal: React.FC<RegisterModalProps> = ({
  getIsRegisterOpen,
  isRegisterOpen,
}) => {
  const [formInput, setFormInput] = useState({
    userName: "",
    eMail: "",
    password: "",
  });
  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    //async arrow func declaration
    event.preventDefault(); //prevent page refresh
    await axios.post(
      "https://fighting-game-backend.herokuapp.com/users/addUser",
      {
        userName: formInput.userName,
        password: bcrypt.hashSync(formInput.password, salt), //encrypted password
        eMail: formInput.eMail,
      }
    );
    console.log(formInput.userName);
  };
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    setFormInput((FormInput) => ({
      ...FormInput,
      [event.target.name]: name,
    }));
    console.log(formInput);
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
        <form onSubmit={submitHandler}>
          <TextField
            label="UserName"
            name="userName"
            onChange={changeHandler}
          />
          <TextField label="E-Mail" name="eMail" onChange={changeHandler} />
          <TextField
            label="Password"
            name="password"
            onChange={changeHandler}
          />
          <Button
            type="submit"
            size="large"
            sx={{ top: "10%" }}
            className="submitButton"
            color="primary"
            variant="contained"
          >
            Submit
          </Button>
        </form>
        <Button
          size="large"
          className="backButton"
          sx={{ top: "1rem" }}
          color="secondary"
          variant="contained"
          onClick={() => {
            getIsRegisterOpen(false);
          }}
        >
          Back
        </Button>
      </Modal>
    </>
  );
};
