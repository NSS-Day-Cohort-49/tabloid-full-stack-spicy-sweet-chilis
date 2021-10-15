import React, { useEffect, useState } from "react"
import { Card, CardBody, CardFooter } from "reactstrap"
import { deleteCategory, updateCategory, getAllCategories, getCategoryById } from "../../modules/CategoryManager"
import { useHistory, useParams } from "react-router"

const Category = ( {category} ) => {
    const history = useHistory()

    const handleDelete = (evt) => {
        evt.preventDefault()
        const confirmDelete = window.confirm("Are you sure you would like to delete the post?")
        if (confirmDelete) {
        deleteCategory(category.id).then(() => {history.push('/category')})
    }
    }
    
    // useEffect(() => {
    //     getCategoryById(id).then((resp) => {
    //         setCategory(resp)
    //     })
    // }, []);

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