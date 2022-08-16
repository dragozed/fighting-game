import React, { useState, useContext } from "react";
import Modal from "react-modal";
import { Button, TextField, Typography, FormControl } from "@mui/material";
import axios from "axios";
import bcrypt from "bcryptjs";
import Cookies from "js-cookie";

import { VillageStatusContext } from "../../contexts/VillageStatusContext";

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
  const { villageStatus, setVillageStatus } = useContext(VillageStatusContext);

  const [infoText, setInfoText] = useState(
    "Do not give your password to anyone else under any circumstances"
  );
  const [formInput, setFormInput] = useState({
    userName: "",
    password: "",
  });
  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    //async arrow func declaration
    event.preventDefault();
    let namePassMatchFlag = false;
    const getUsers = await axios.get(
      "https://fighting-game-backend.herokuapp.com/users"
    );
    const found = getUsers.data.find(
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
        //Login Successful
        const getVillageStatus = await axios.get(
          "https://fighting-game-backend.herokuapp.com/villageStatus",
          { params: { userName: found.userName } }
        );
        setVillageStatus(getVillageStatus.data[0].villageStatus); //getting 0th only more than 1 matching = S A D

        Cookies.set("userInfo", JSON.stringify(found));
        getIsLoginSuccessful(true);

        setInfoText("Login Successful");
        getIsLoginOpen(false);
      } else {
        setInfoText("Password and username do not match");
      }
    }
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
      <FormControl variant="standard">
        <form onSubmit={submitHandler}>
          <TextField
            label="UserName"
            name="userName"
            onChange={changeHandler}
          />
          <TextField
            label="Password"
            type="password"
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
            getIsLoginOpen(false);
          }}
        >
          Back
        </Button>
      </FormControl>
      <Typography variant="h6" sx={{ mt: "2rem" }}>
        {infoText}
      </Typography>
    </Modal>
  );
};
