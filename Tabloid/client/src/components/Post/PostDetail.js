import React, { useEffect, useState } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { useParams } from "react-router-dom";
import { getPostById } from "../../modules/PostManager.js";
import Post from './Post.js'

const PostDetails = () => {
    const [post, setPost ] = useState();
    const { id } = useParams();

    useEffect(() => {
        getPostById(id).then(setPost);
    }, []);

    if (!post) {
        return null;
    }

    return (
        <div className="container">
      <div className="row justify-content-center">
      <img src={post.imageLocation} />
      <div>
        Posted by: {post.userProfile.displayName}
        <p>
        Title: {post.title}
        </p>
        
        {post.content}
        <br/>
        {new Date(post.publishDateTime).toLocaleDateString()}
        </div>
      </div>
    </div>
    )
}

export default PostDetails;