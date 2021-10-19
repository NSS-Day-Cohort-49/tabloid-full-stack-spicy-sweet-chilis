import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

const MainPost = ({ post }) => {
  return (
    <>
      <Card>
        <CardBody>
          <img
            src={post.imageLocation}
            className="mainimg"
            alt={post.userProfile.displayName}
          />
          <br />
          <div className="bodyLP">
            <div>
              <h5>
                <Link to={`/posts/detail/${post.id}`}>{post.title}</Link>
              </h5>
              <br />
              {post.category.name}
            </div>
            <div>{new Date(post.publishDateTime).toLocaleDateString()}</div>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default MainPost;
