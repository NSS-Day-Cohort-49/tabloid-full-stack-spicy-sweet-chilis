import React from "react"
import { Card, CardBody, CardFooter } from "reactstrap"
import { deleteCategory, getAllCategories } from "../../modules/CategoryManager"
import { useHistory } from "react-router"


const Category = ({ category }) => {
    const history = useHistory()

    const handleDelete = (evt) => {
        evt.preventDefault()

        deleteCategory(category.id).then(window.location.reload())
    }

    const handleEdit = (evt) => {
        evt.preventDefault()

        editCategory(category.id)
    }

    return (
        <Card className="m-4">
            <CardBody>{category.name}</CardBody>
            <CardFooter>
                <button className="deleteCat" onClick={handleDelete}>
                    Delete
                </button>
                <button className="updateCat" onClick={handleEdit}>Edit</button>
            </CardFooter>
        </Card>
    )
}

export default Category


// const Category = ({ category }) => {
//     return (
//         <>
//         <Card >
//             <CardBody>
//                 <h3 className="category_name"> {category.name}
//                 <Link to="/category/edit"> Edit </Link>
//                 <Link to="/category/delete"> Delete </Link>
//                 </h3>
//             </CardBody>
//         </Card>
//         </>
//     )
// };

// export default Category;