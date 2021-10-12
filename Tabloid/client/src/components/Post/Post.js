import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
    
  return (
      <>
    <Card >
     
      <CardBody>
          <h3>{post.title}</h3>
        {post.content}       
      </CardBody>   
    </Card>
    </>
  );
};

export default Post;
