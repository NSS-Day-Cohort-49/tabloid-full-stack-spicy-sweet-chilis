import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

const LatestPost = ({ post }) => {
    
  return (
      <>
      <Card className="otherLP">
      <CardBody className="postCard">
          <div className="bodyLP"><div className="titleLP"><h5><Link to={`/posts/detail/${post.id}`}>{post.title}</Link></h5>      
          <br/>
          {post.category.name}</div>      
          <div>{new Date(post.publishDateTime).toLocaleDateString()}</div>
          </div>
          <img src={post.imageLocation} className="mypostimg" alt={post.userProfile.displayName}/>
      <br/>
      </CardBody>   
    </Card>
    </>
  );
};

export default LatestPost;
