import React, { useState, useContext, useEffect } from "react";
import { Button, MenuItem, Box, FormControl, InputLabel } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Cookies from "js-cookie";
import axios from "axios";

import { InventoryContext } from "../../contexts/InventoryContext";

import "./Inventory.scss";
import { minWidth } from "@mui/system";

interface InventoryProps {
  getIsInventoryOpen: (isinventoryopen: boolean) => void;
}

export const Inventory: React.FC<InventoryProps> = ({ getIsInventoryOpen }) => {
  const [characterName, setCharacterName] = useState("");
  const { inventory, setInventory } = useContext(InventoryContext);

  useEffect(() => {
    getInventory();
  }, []);

  const getInventory = async () => {
    const getInventory = await axios.get(
      "https://fighting-game-backend.herokuapp.com/inventory",
      {
        params: {
          userName: JSON.parse(Cookies.get("userInfo") || "").userName,
        },
      }
    );
    setInventory(getInventory.data[0].inventory);
  };

  const handleChange = (event: SelectChangeEvent) => {
    const string = event.target.value as string;
    console.log(string, inventory.characters);
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <FormControl style={{ minWidth: "180px" }}>
          <InputLabel>Select Character</InputLabel>
          <Select
            value={characterName}
            label="CharacterName"
            onChange={handleChange}
          >
            {inventory.characters.map((character, index) => (
              <MenuItem value={character} key={index}>
                {character}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Button
        size="large"
        className="backButton"
        sx={{ position: "absolute", top: "1rem", left: "1rem" }}
        color="secondary"
        variant="contained"
        onClick={() => {
          getIsInventoryOpen(false);
        }}
      >
        Back
      </Button>
    </>
  );
};
