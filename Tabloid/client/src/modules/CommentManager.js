import { getToken } from "./authManager";
const apiUrl = '/api/comment';

export const getAllComments = () => {
    return fetch(apiUrl)
        .then((res) => res.json())
};

export const getAllCommentsOnPost = (id) => {
    return getToken().then((token) => {
      return fetch(`${apiUrl}/getCommentsByPostId/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((resp) => resp.json())
      });
  };

  export const getCommentById = (id) => {
    return getToken().then((token) => {
    return fetch(`${apiUrl}/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((resp) => resp.json())
  });
};

export const addComment = (comment) => {
  return getToken().then((token) => {
    return fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(comment)
    })
    // .then(resp => {
    //   if (resp.ok) {
    //     return resp.json();
    // } else if (resp.status === 401) {
    //     throw new Error("Unauthorized");
    // } else {
    //     throw new Error("An unknown error occurred while trying to save a new Comment.");
    // }
    // });
  });
};

export const updateComment = (comment) => {
  return getToken().then((token) => {
    return fetch(apiUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(comment)
    })
    // .then(resp => {
    //   if (resp.ok) {
    //     return resp.json();
    // } else if (resp.status === 401) {
    //     throw new Error("Unauthorized");
    // } else {
    //     throw new Error("An unknown error occurred while trying to save a new Comment.");
    // }
    // })
  })
}

export const deleteComment = (commentId) => {
  return getToken().then((token) => {
    return fetch(`${apiUrl}/delete/${commentId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });
  });
};