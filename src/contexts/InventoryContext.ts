import { createContext } from "react";
import { InventoryType } from "../types/InventoryType";

//character1,character2,boss dead or alive status

const inventory = {
  inventory: {
    characters: [""],
    minions: [""],
  },
  setInventory: (inventory: InventoryType) => {},
};

export const InventoryContext = createContext(inventory);
