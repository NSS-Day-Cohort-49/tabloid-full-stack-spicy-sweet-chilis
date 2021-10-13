import firebase from "firebase/app";
import "firebase/auth";
import { getToken } from "./authManager";

const baseUrl = '/api/post';

export const getAllPosts = () => {
    return fetch(baseUrl)
      .then((res) => res.json())
  };

  export const getMyPosts = (id) => {
    return getToken().then((token) => {
      return fetch(`${baseUrl}/myPost`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("An unknown error occorred while trying to fetch your posts");
        }
      });
    });
  };

export const getPostById = (id) => {
    return fetch(`${baseUrl}/${id}`)
        .then((res) => res.json())
};

export const addPost = (post) => {
    return fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
  };