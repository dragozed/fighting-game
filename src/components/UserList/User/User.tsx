import React from "react";
import { useEffect } from "react";

interface UserProps {
  user: { userName: string; userRole: string };
}

export const User: React.FC<UserProps> = ({ user }) => {
  return (
    <div>
      {user.userName} {user.userRole}
    </div>
  );
};
