import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Button } from "reactstrap";

const Tag = ({ tag }) => {

  return (
    <>
    <Card>
      <CardBody>
          <strong>{tag.name}</strong>
          <Link to="/tags/form">Edit</Link>
      </CardBody>
    </Card>
    </>
  );
}
export default Tag;