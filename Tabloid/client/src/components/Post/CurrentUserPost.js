import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import "./Post.css"

const CurrentUserPost = ({ post }) => {
    
  return (
      <>
    <Card >
      <CardBody className="postCard">
      <div><img src={post.imageLocation} className="mypostimg" alt={post.userProfile.displayName}/></div>
          <div><h3>{post.title}</h3>
          <br/>
          {post.category.name}</div>      
          <div>{post.publishDateTime}</div>
      </CardBody>   
    </Card>
    </>
  );
};

export default CurrentUserPost;
