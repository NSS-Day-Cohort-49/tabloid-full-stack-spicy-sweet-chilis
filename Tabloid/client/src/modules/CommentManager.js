import { getToken } from "./authManager";
const apiUrl = '/api/comment';

export const getAllComments = () => {
    return fetch(apiUrl)
        .then((res) => res.json())
};

export const getAllCommentsOnPost = (id) => {
    return getToken().then((token) => {
      return fetch(`${apiUrl}/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((resp) => resp.json())
      });
  };