import React, { useEffect, useState } from "react";
import { getAllPosts } from "../modules/PostManager";
import LatestPost from "./Post/LatestPost";
import './Post/Post.css'
import MainPost from "./Post/MainPost";

export default function Hello() {

  const [ posts, setPosts] = useState([]);

  const getPosts = () => {
    getAllPosts().then(posts => setPosts(posts));
  };

  useEffect(() => {
    getPosts()
  }, []);

  const postMap = posts.map((post) => (
    <LatestPost post={post} key={post.id} />
  ))

  const Main = posts.map((post) => (
    <MainPost post={post} key={post.id} />
  ))


  return (
    <>
    <h1>Latest Post:</h1>
    <div className="containerLP">
      <div className="latestPost">
        <div className="mainLP">
      {Main.slice(0,1)}
      </div>
      <div className="otherLP">
      {postMap.slice(1,4)}
      </div>
      </div>
    </div>
    </>
  );
}