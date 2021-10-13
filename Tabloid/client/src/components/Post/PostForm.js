import React, { useEffect, useState } from "react";
import { useHistory, useParams } from 'react-router-dom';
import { addpost} from "../modules/postManager";

const PostFormMINE = () => {
    const [post, setPost] = useState({})
    const history = useHistory();

    const handleControlledInputChange = (event) => {
        const newPost = { ...post }
          newPost[event.target.id] = event.target.value
          setPost(newPost)
        }

        const handleClickSavepost = () => {
            if (post.title === undefined || post.content === undefined) {
                window.alert("Please complete the form")
            } else {
                const newPost = {
                    id: post.id,
                    title: post.title,
                    description: post.description,
                    url: post.url
              }
              addpost(newPost)
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
                    <input type="text" id="title" required autoFocus className="form-control" placeholder="Title" value={post.title} onChange={handleControlledInputChange} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input type="text" id="description" required autoFocus className="form-control" placeholder="Content" value={post.content} onChange={handleControlledInputChange} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="imageLocation">Image Location</label>
                    <input type="text" id="imageLocation" required autoFocus className="form-control" placeholder="Enter a post" value={post.imageLocation} onChange={handleControlledInputChange} />
                </div>
            </fieldset>
            <div className="buttons"><button className="btns" onClick={
                (event) => {
                    event.preventDefault()
                    handleClickSavepost()
                }
            }>
            Save post
            </button> </div>
        </form>
        </>
    )
}

export default postFormMINE;