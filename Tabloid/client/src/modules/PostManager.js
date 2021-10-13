import firebase from "firebase/app";
import "firebase/auth";


const baseUrl = '/api/post';

export const getAllPosts = () => {
    return fetch(baseUrl)
      .then((res) => res.json())
  };

export const getMyPosts = (firebaseUserId) => {
    return getToken().then((token) =>
    fetch(`${baseUrl}/mypost/${firebaseUserId}`, {
        method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(resp => resp.json()));
};

export const getPostById = id => {
    return fetch(`${baseUrl}/${id}`)
        .then((res) => res.json())
};

export const getToken = () => firebase.auth().currentUser.getIdToken();


export const addPost = (post) => {
    return fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
  };