import React, { useEffect, useState } from "react";
import { getAllCategories } from "../../modules/CategoryManager.js";
import Category from "./Category.js";
import { Link } from "react-router-dom";



export const CategoryList = () => {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        getAllCategories().then(setCategories)
    }, [])

    return (
        <section>
            <div>
                <Link to="/category/add">New Category</Link>
            </div>
            {categories.map((c) => (
                <Category key={c.id} category={c} />
            ))}
        </section>
    )
}

export default CategoryList

// const CategoryList = () => {
//     const [categories, setCategories] = useState([]);

//     const getCategories = () => {
//         getAllCategories()
//         .then(categories => setCategories(categories));
//     };

//     useEffect(() => {
//         getCategories()
//     }, []);

//     return (
//         <div className="container">
//             <div className="row justify-content-center">
//                 {categories.map((category) => (
//                     <Category category={category} key={category.id} />
//                 ))}
//             </div>
//         </div>
//     )
// };

// export default CategoryList