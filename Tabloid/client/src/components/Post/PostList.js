import React, { useEffect, useState } from "react";
import { getAllPosts } from "../../modules/PostManager.js";
import Post from './Post.js'
import { Link } from "react-router-dom";


const PostList = () => {
  const [ posts, setPosts] = useState([]);

  const getPosts = () => {
    getAllPosts().then(posts => setPosts(posts));
  };

  useEffect(() => {
    getPosts()
  }, []);

  return (
    <div className="container">
      {posts.map((post) => (
          <Post post={post} key={post.id} />
        ))}
      
    </div>
  );
};

export default PostList;
