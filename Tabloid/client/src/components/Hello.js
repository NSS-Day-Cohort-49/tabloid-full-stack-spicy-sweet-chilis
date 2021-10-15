import React, { useEffect, useState } from "react";
import { getAllPosts } from "../modules/PostManager";
import LatestPost from "./Post/LatestPost";
import "./Post/Post.css";
import MainPost from "./Post/MainPost";
import User from "./UserProfile/User";
import { getAllUsers } from "../modules/UserProfileManager";

export default function Hello() {
  const [posts, setPosts] = useState([]);
  const [ users, setUsers] = useState([]);

  const getPosts = () => {
    getAllPosts().then((posts) => setPosts(posts));
  };


  const getUsers = () => {
    getAllUsers().then(users => setUsers(users));
  };

  useEffect(() => {
    getPosts();
    getUsers();
  }, []);


  const sortedUsers = users.sort((a, b) => {
    return (
      new Date(b.createDateTime) - new Date(a.createDateTime)
    );
  });

  console.log(sortedUsers)

  const postMap = posts.map((post) => <LatestPost post={post} key={post.id} />);

  const Main = posts.map((post) => <MainPost post={post} key={post.id} />);

  const userMap = sortedUsers.map((user) => (
    <User user={user} key={user.id} />
  ))

  return (
    <>
      <h1>Latest Post:</h1>
      <div className="containerLP">
        <div className="latestPost">
        <br/>
          <div className="mainLP">{Main.slice(0, 1)}</div>
          <div className="otherLP">{postMap.slice(1, 4)}</div>
        </div>
        <div className="newauthors">
        <center><h1>New Authors:</h1></center>
        <br/>
          {userMap.slice(0,3)}
        </div>
      </div>
    </>
  );
}
