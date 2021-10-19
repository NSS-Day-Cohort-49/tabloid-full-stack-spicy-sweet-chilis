import React, { useEffect, useState } from "react";
import { getAllCategories } from "../../modules/CategoryManager.js";
import Category from "./Category.js";
import { Link } from "react-router-dom";



export const CategoryList = () => {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        getAllCategories().then(categories => setCategories(categories));
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
