import React, { useState } from "react";
import Modal from "react-modal";
import { Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import bcrypt from "bcryptjs";

Modal.setAppElement("#root"); //to prevent assistive technologies such as screenreaders from reading content outside of the content of modal

interface LoginModalProps {
  isLoginOpen: boolean;
  getIsLoginOpen: (isLoginOpen: boolean) => void;
  getIsLoginSuccessful: (isLoginOpen: boolean) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isLoginOpen,
  getIsLoginOpen,
  getIsLoginSuccessful,
}) => {
  const [infoText, setInfoText] = useState(
    "Do not give your password to anyone else under any circumstances"
  );
  const [formInput, setFormInput] = useState({
    userName: "",
    password: "",
  });
  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    let namePassMatchFlag = false;
    //async arrow func declaration
    event.preventDefault(); //prevents page refresh
    const response = await axios.get(
      "https://fighting-game-backend.herokuapp.com/users"
    );
    const found = response.data.find(
      (e: any) => e.userName === formInput.userName
    );
    if (typeof found === "undefined") {
      setInfoText("Username not found");
    } else {
      namePassMatchFlag = await bcrypt.compare(
        formInput.password,
        found.password
      );

      if (namePassMatchFlag) {
        setInfoText("Login Successful");
        getIsLoginSuccessful(true);
      } else {
        setInfoText("Password and username do not match");
      }
    }

    console.log(namePassMatchFlag);
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    setFormInput((FormInput) => ({
      ...FormInput,
      [event.target.name]: name,
    }));
  };

  return (
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
          backgroundColor: "mediumseagreen",
        },
      }}
    >
      <Typography variant="h5">Login Form</Typography>
      <form onSubmit={submitHandler}>
        <TextField label="UserName" name="userName" onChange={changeHandler} />
        <TextField
          label="Password"
          type="password"
          name="password"
          onChange={changeHandler}
        />

        <Typography variant="h6">{infoText}</Typography>
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
          getIsLoginOpen(false);
        }}
      >
        Back
      </Button>
    </Modal>
  );
};
