import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import PostList from "./Post/PostList";
import CurrentUserPostList from "./Post/CurrentUserPostList";
import PostDetails from "./Post/PostDetail";
import PostForm from "./Post/PostForm";
import CategoryList from "./Category/CategoryList";
import TagList from "./Tag/TagList";
import TagForm from "./Tag/TagForm";
import CommentList from "./Comment/CommentList";

export default function ApplicationViews({ isLoggedIn }) {

  return (
    <main>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <Hello /> : <Redirect to="/login" />}
        </Route>

        <Route path="/posts" exact>
          {isLoggedIn ? <PostList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/myposts">
          {isLoggedIn ? <CurrentUserPostList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/posts/detail/:id">
          {isLoggedIn ? <PostDetails /> : <Redirect to="/login" />}
        </Route>

        <Route path="/posts/add" >
        {isLoggedIn ? <PostForm /> : <Redirect to="/login" />}
        </Route>

        <Route path="/category" exact>
          {isLoggedIn ? <CategoryList /> : <Redirect to="/login" />}
        </Route>
        
        <Route path="/comments/:id" exact>
          {isLoggedIn ? <CommentList /> : <Redirect to="/login" />}
        </Route>
        
        <Route path="/tags" exact>
          {isLoggedIn ? <TagList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/tags/form">
          {isLoggedIn ? <TagForm /> : <Redirect to="/login" />}
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </main>
  );
};
