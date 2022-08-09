import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import { User } from "./User/User";

interface UserListProps {}

export const UserList: React.FC<UserListProps> = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const response = await axios.get(
      "https://fighting-game-backend.herokuapp.com/users"
    );
    setUsers(response.data);
  };

  const postUser = async (username: string, userrole: string) => {
    await axios.post(
      "https://fighting-game-backend.herokuapp.com/users/addUser",
      {
        userName: username,
        userRole: userrole,
      }
    );
  };

  const updateUser = async (id: string) => {
    await axios.post(
      "https://fighting-game-backend.herokuapp.com/users/updateUser",
      {
        id: id,
      }
    );
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="user-list">
      {users.map((user, index) => (
        <User user={user} key={index} />
      ))}
    </div>
  );
};
