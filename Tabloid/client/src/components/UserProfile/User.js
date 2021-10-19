import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import './User.css'

const User = ({ user }) => {
    
  return (
      <>
      <Card >
      <CardBody className="postCard">
      <div><img src={user.imageLocation} className="userimg" alt={user.displayName}/></div>
          <div><h3>{user.firstName}{user.lastName}</h3>      
          <br/>
          {user.email}
          <br/>
          Joined: {new Date(user.createDateTime).toLocaleDateString()}</div>
      </CardBody>   
    </Card>
    </>
  );
};

export default User;
