import React, { useEffect, useState } from "react";
import { getAllPosts, getMyPosts } from "../../modules/PostManager.js";
import Post from './Post.js'


const PostList = () => {
  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    getMyPosts().then(posts => setPosts(posts));
  };

  useEffect(() => {
    getPosts()
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center">
        {posts.map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </div>
    </div>
  );
};

export default PostList;
