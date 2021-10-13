import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
const Category = ({ category }) => {
    return (
        <>
        <Card >
            <CardBody>
                <h3 className="category_name"> {category.name}
                <Link to="/category/edit"> Edit </Link>
                <Link to="/category/delete"> Delete </Link>
                </h3>
            </CardBody>
        </Card>
        </>
    )
};

export default Category;