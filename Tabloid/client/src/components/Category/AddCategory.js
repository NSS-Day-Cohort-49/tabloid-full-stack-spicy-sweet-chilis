import React, { useState, useEffect } from "react";
import { useHistory, useParams} from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { AddCategory, updateCategory } from "../../modules/CategoryManager.js";
import { getAllCategories, getCategoryById } from '../../modules/CategoryManager.js';

const CategoryForm = () => {
    const history = useHistory()

    const [category, setCategory] = useState({
    })
    
    const {id} = useParams()


    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (id) {
            getCategoryById(id).then((event) => {
                setCategory(event)
                setIsLoading(false)
            })
        } else {
            setIsLoading(false)
        }
    }, [])


    const handleInputChange = (evt) => {
        const value = evt.target.value
        const key = evt.target.id

        const categoryCopy = { ...category }

        categoryCopy[key] = value
        setCategory(categoryCopy)
    }

    const handleSave = (evt) => {
        evt.preventDefault()

        if (id) {
            setIsLoading(true)
            updateCategory({
                id: id,
                name: category.name,
            }).then(() => history.push("/category"))
        } else {
            AddCategory({
                name: category.name,
            }).then(() => {
                history.push("/category")
            })
        }

        
    }

    return (
        <Form>
            <FormGroup>
                <Label for="name">Name</Label>
                <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="category name"
                    value={category.name}
                    onChange={handleInputChange}
                />
            </FormGroup>
            <Button
                className="btn btn-primary"
                disabled={isLoading}
                onClick={handleSave}
            >
                {id ? "Save Category" : "Add Category"}
            </Button>
        </Form>
    )
}

export default CategoryForm

// const CategoryForm = () => {
//     const emptyCategory = {
//         name: ''
//     };

//     const [category, setCategory] = useState(emptyCategory);
//     const history = useHistory()

//     const handleInputChange = (evt) => {
//     const value = evt.target.value;
//     const key = evt.target.id;

//     const categoryCopy = { ...category };

//     categoryCopy[key] = value;
//     setCategory(categoryCopy);
//     };

//     const handleSave = (evt) => {
//     evt.preventDefault();

//     AddCategory(category).then(() => {
//         setCategory(emptyCategory);
//         getAllCategories();
//         history.push("/categories")
//     });
//     };

//     return (
//     <Form>
//         <FormGroup>
//         <Label for="name">Name</Label>
//         <Input type="text" name="name" id="name" placeholder="category name"
//             value={category.name}
//             onChange={handleInputChange} />
//         </FormGroup>
//         <Button className="btn btn-primary" onClick={handleSave}>Submit</Button>
//     </Form>
//     );
// };

// export default CategoryForm;


// export default function AddCategoryForm() {
//     const history = useHistory();
//     const [categoryName, setCategoryName] = useState();

//     const form = (y) => {
//         y.preventDefault();
//         AddCategory({ name: categoryName })
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