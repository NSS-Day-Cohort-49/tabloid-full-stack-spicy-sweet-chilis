import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { addCategory } from "../modules/CategoryManager";
import { getAllCategories } from '../../modules/categoryManager';



const CategoryForm = () => {
    const emptyCategory = {
        name: ''
    };

    const [category, setCategory] = useState(emptyCategory);
    const history = useHistory()

    const handleInputChange = (evt) => {
    const value = evt.target.value;
    const key = evt.target.id;

    const categoryCopy = { ...category };

    categoryCopy[key] = value;
    setCategory(categoryCopy);
    };

    const handleSave = (evt) => {
    evt.preventDefault();

    addCategory(category).then(() => {
        setCategory(emptyCategory);
        getAllCategories();
        history.push("/categories")
    });
    };

    return (
    <Form>
        <FormGroup>
        <Label for="name">Name</Label>
        <Input type="text" name="name" id="name" placeholder="category name"
            value={category.name}
            onChange={handleInputChange} />
        </FormGroup>
        <Button className="btn btn-primary" onClick={handleSave}>Submit</Button>
    </Form>
    );
};

export default CategoryForm;


// export default function AddCategoryForm() {
//     const history = useHistory();
//     const [categoryName, setCategoryName] = useState();

//     const form = (y) => {
//         y.preventDefault();
//         addCategory({ name: categoryName })
//         .then(() => history.push("/add"))
//     };

//     return(
//         <Form onSubmit={form}>
//             <FormGroup>
//                 <Label for="categoryText">Category</Label>
//                 <Input id="categoryName" type="textarea" onChange={y => setCategoryName(y.target.value)} />
//             </FormGroup>
//             <FormGroup>
//                 <Button>Save</Button>
//             </FormGroup>
//         </Form>
//     )
// }