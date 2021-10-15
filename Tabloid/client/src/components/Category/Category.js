import React from "react"
import { Card, CardBody, CardFooter } from "reactstrap"
import { deleteCategory} from "../../modules/CategoryManager"
import { useHistory } from "react-router"

const Category = ( {category} ) => {
    const history = useHistory()

    const handleDelete = (evt) => {
        evt.preventDefault()
        const confirmDelete = window.confirm("Are you sure you would like to delete the post?")
        if (confirmDelete) {
        deleteCategory(category.id).then(() => {history.push('/category')})
    }
    }
    

    if (!category) {
        return null;
    }
    
    return (
        <Card className="m-4">
            <CardBody>{category.name}</CardBody>
            <CardFooter>
                <button className="deleteCat" onClick={handleDelete}>
                    Delete
                </button>
                <button className="updateCat" 
                onClick={() => {
                        history.push(`/category/edit/${category.id}`)}}>
                            Edit
                            </button>
            </CardFooter>
        </Card>
    )
}

export default Category
