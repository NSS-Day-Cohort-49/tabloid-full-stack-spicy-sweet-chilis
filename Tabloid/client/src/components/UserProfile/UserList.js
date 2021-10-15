import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../modules/UserProfileManager.js";
import { Link } from "react-router-dom";
import User from './User.js'


const UserList = () => {
  const [ users, setUsers] = useState([]);

  const getUsers = () => {
    getAllUsers().then(users => setUsers(users));
  };

  useEffect(() => {
    getUsers()
  }, []);

  return (
    <div className="container">
      {users.map((user) => (
          <User user={user} key={user.id} />
        ))}
      
    </div>
  );
};

export default UserList;
