import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../../modules/PostManager.js";

const PostDetails = () => {
    const [ post, setPost ] = useState();
    const { id } = useParams();


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
        
        </div>
      </div>
    </div>
    )
}

export default PostDetails;