import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { addCategory, updateCategory } from "../modules/CategoryManager";
import { getAllCategories, getCategoryById } from '../../modules/categoryManager';

const CategoryForm = () => {
    const history = useHistory()

    const [category, setCategory] = useState({
        // name: "",
    })

    const params = useParams()

    const categoryId = params.id

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (categoryId) {
            getCategoryById(categoryId).then((event) => {
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

        if (categoryId) {
            setIsLoading(true)
            updateCategory({
                id: parseInt(categoryId),
                name: category.name,
            }).then(() => history.push("/category"))
        } else {
            addCategory({
                name: category.name,
            }).then(() => {
                history.push("/category")
            })
        }

        // addCategory(category).then(() => {
        //     history.push("/category")
        // })
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
                {categoryId ? "Save Category" : "Add Category"}
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

//     addCategory(category).then(() => {
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