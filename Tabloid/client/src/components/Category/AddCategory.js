import React, { useState, useEffect } from "react";
import { useHistory, useParams} from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { AddCategory, updateCategory } from "../../modules/CategoryManager.js";
import {  getCategoryById } from '../../modules/CategoryManager.js';

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