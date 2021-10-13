import React, { useEffect, useState } from "react";
import { getMyPosts } from "../../modules/PostManager.js";
import CurrentUserPost from './CurrentUserPost.js'


const CurrentUserPostList = () => {
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
          <CurrentUserPost post={post} key={post.id} />
        ))}
      </div>
    </div>
  );
};

export default CurrentUserPostList;
