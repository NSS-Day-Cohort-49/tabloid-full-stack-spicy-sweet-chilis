import React, { useEffect, useState } from "react";
import { useHistory, useParams } from 'react-router-dom';
import { addPost, getPostById, updatePost } from "../../modules/PostManager.js";
import { getAllCategories } from "../../modules/CategoryManager.js";

const PostForm = () => {
    const [post, setPost] = useState({})
    const [ category, setCategory ] = useState([])
    const history = useHistory(); 
    const { postId } = useParams();

    useEffect(() => {
        if(postId)
        {getPostById(postId)
        .then(p => {
            setPost(p)
        })}
        getAllCategories().then(setCategory)
    }, [])

    const handleControlledInputChange = (event) => {
        const newPost = { ...post }
          newPost[event.target.id] = event.target.value
          setPost(newPost)
        }

        const handleClickSavePost = () => {
            if (post.title === undefined || post.content === undefined) {
                window.alert("Please complete the form")
            } else if (postId) {
                updatePost({
                    id: post.id,
                    title: post.title,
                    content: post.content,
                    imageLocation: post.imageLocation,
                    createDateTime: new Date(Date.now()).toISOString(),
                    publishDateTime: post.publishDateTime,
                    isApproved: true,
                    categoryId: post.categoryId
                })
            } else {
                const newPost = {
                    title: post.title,
                    content: post.content,
                    imageLocation: post.imageLocation,
                    createDateTime: new Date(Date.now()).toISOString(),
                    publishDateTime: post.publishDateTime,
                    isApproved: true,
                    categoryId: post.categoryId
              }
              addPost(newPost)
              .then((p) => history.push("/posts"))
              }
            }

    return (
        <>
        <form className="postForm">
            <h2 className="postForm__title post_header">Post Form</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" required autoFocus className="form-control" placeholder="Required" value={post.title} onChange={handleControlledInputChange} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="content">Content:</label>
                    <input type="text" id="content" required autoFocus className="form-control" placeholder="Required" value={post.content} onChange={handleControlledInputChange} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="imageLocation">Image Location</label>
                    <input type="text" id="imageLocation" required autoFocus className="form-control" placeholder="" value={post.imageLocation} onChange={handleControlledInputChange} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="publishDateTime">Publication Date:</label>
                    <input type="date" id="publishDateTime" required autoFocus className="form-control" placeholder="Enter a date" value={post.publishDateTime} onChange={handleControlledInputChange} />
                </div>
            </fieldset>
            <fieldset>
          <div className="form-group">
            <label htmlFor="category">Category </label>
            <select value={post.categoryId} name="categoryId" id="categoryId" className="form-control" onChange={handleControlledInputChange}>
              <option value="0">Select a Category</option>
              {category.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </fieldset>
            <div className="buttons"><button className="btns" onClick={
                (event) => {
                    event.preventDefault()
                    handleClickSavePost()
                }
            }>
            {postId ? "Update Post" : "Save post"}
            </button>  <button className="btns" onClick={() => history.goBack()}>Cancel</button></div>
        </form>
        </>
    )
}

export default PostForm;