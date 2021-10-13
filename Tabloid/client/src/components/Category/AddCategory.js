import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { addCategory } from "../modules/CategoryManager";

export default function AddCategoryForm() {
    const history = useHistory();
    const [categoryName, setCategoryName] = useState();

    const form = (y) => {
        y.preventDefault();
        addCategory({ name: categoryName })
        .then(() => history.push("/add"))
    };

    return(
        <Form onSubmit={form}>
            <FormGroup>
                <Label for="categoryText">Category</Label>
                <Input id="categoryName" type="textarea" onChange={y => setCategoryName(y.target.value)} />
            </FormGroup>
            <FormGroup>
                <Button>Save</Button>
            </FormGroup>
        </Form>
    )
}