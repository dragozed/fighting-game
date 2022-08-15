import { createContext } from "react";
import { UserInfoType } from "../types/UserInfoType";

const userInfo = {
  userInfo: { username: "", email: "" },
  setUserInfo: (userInfo: UserInfoType) => {},
};

export const UserInfoContext = createContext(userInfo);
