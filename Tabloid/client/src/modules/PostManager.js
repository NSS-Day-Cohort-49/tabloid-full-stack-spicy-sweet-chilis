import firebase from "firebase/app";
import "firebase/auth";
import { getToken } from "./authManager";

const baseUrl = '/api/post';

export const getAllPosts = () => {
  return getToken().then((token) => {  
  return fetch(baseUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(resp => {
    if (resp.ok) {
      return resp.json();
  } else if (resp.status === 401) {
      throw new Error("Unauthorized");
  } else {
      throw new Error("An unknown error occurred while trying to save a new post.");
  }
  });
});
};

  export const getMyPosts = (id) => {
    return getToken().then((token) => {
      return fetch(`${baseUrl}/myPost`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(resp => {
        if (resp.ok) {
          return resp.json();
      } else if (resp.status === 401) {
          throw new Error("Unauthorized");
      } else {
          throw new Error("An unknown error occurred while trying to save a new post.");
      }
      });
    });
  };

export const getPostById = (id) => {
  return getToken().then((token) => {  
    return fetch(`${baseUrl}/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(resp => {
      if (resp.ok) {
        return resp.json();
    } else if (resp.status === 401) {
        throw new Error("Unauthorized");
    } else {
        throw new Error("An unknown error occurred while trying to save a new post.");
    }
    });
  });
};

export const addPost = (post) => {
  return getToken().then((token) => {
    return fetch(baseUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(post)
    }).then(resp => {
      if (resp.ok) {
        return resp.json();
    } else if (resp.status === 401) {
        throw new Error("Unauthorized");
    } else {
        throw new Error("An unknown error occurred while trying to save a new post.");
    }
    });
  });
};

export const updatePost = (post) => {
  return getToken().then((token) => {
    return fetch(baseUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(post)
    }).then(resp => {
      if (resp.ok) {
        return resp.json();
    } else if (resp.status === 401) {
        throw new Error("Unauthorized");
    } else {
        throw new Error("An unknown error occurred while trying to save a new post.");
    }
    })
  })
}

export const deletePost = (postId) => {
  return getToken().then((token) => {
    return fetch(`${baseUrl}/delete/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });
  });
};