import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { deletePost, getPostById } from "../../modules/PostManager.js";

const PostDetails = () => {
    const [ post, setPost ] = useState();
    const { id } = useParams();

    const history = useHistory();

    const deleteThePost = (event) => {
      event.preventDefault()
      const confirmDelete = window.confirm("Are you sure you would like to delete the post?")
      if (confirmDelete) {
          deletePost(post.id).then(() => {history.push('/posts')})
      };
  }

    useEffect(() => {
        getPostById(id).then((response) => {
          setPost(response)})
    }, []);

    if (!post) {
        return null;
    }

    return (
    <div className="container">
      <div className="row justify-content-center">
      <img src={post.imageLocation} alt={post.title} />
      <p>
      <div>
        <h2>Title: {post.title}</h2>
        <p>
          {post.category.name}
          </p>
          <p>
        Posted by: {post.userProfile.displayName}           
        {new Date(post.publishDateTime).toLocaleDateString()}
        </p>
        {post.content}
        <br/>
        <button className="btns" onClick={() => {
                history.push(`/posts/edit/${post.id}`)
			        }}>Edit</button>
        <button onClick={deleteThePost}>Delete</button>
        </div>
        </p>
      </div>
    </div>
    )
}

export default PostDetails;