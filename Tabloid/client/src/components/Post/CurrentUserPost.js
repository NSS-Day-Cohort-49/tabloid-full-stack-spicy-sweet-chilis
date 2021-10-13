import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

const CurrentUserPost = ({ post }) => {
    
  return (
      <>
    <Card >
    <p className="text-left px-2">Posted by: {post.userProfile.displayName}        
         </p>
      <CardBody>
          <h3>{post.title}</h3>      
      </CardBody>   
    </Card>
    </>
  );
};

export default CurrentUserPost;
