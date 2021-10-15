import { getToken } from "./authManager";
import "firebase/auth";

const apiUrl = "/api/tag";

export const getAllTags = () => {
  return getToken().then((token) => {
    return fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(resp => {
      if (resp.ok) {
        return resp.json();
      } else if (resp.status === 401) {
        throw new Error("Unauthorized");
      }
    });
  });
};

export const addTag = (tag) => {
  return getToken().then((token) => {
    return fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tag)
    }).then(resp => {
      if (resp.ok) {
        return resp.json();
      } else if (resp.status === 401) {
        throw new Error("Unauthorized");
      } else {
        throw new Error("An unknown error occurred while trying to save a new tag.");
      }
    });
  });
};

export const getTagById = (id) => {
  return getToken().then((token) => {
    return fetch(`${apiUrl}/${id}}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(resp => {
      if (resp.ok) {
        return resp.json();
      } else if (resp.status === 401){
        throw new Error("Unauthorized");
      } else {
        throw new Error("An unknown error occurred while trying to save a tag.");
      }
    });
  });
};

export const updateTag = (tag) => {
  return getToken().then((token) => {
    return fetch(`${apiUrl}/${tag.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tag)
    }).then(resp => {
      if (resp.ok) {
        return resp.json();
      } else if (resp.status === 401) {
        throw new Error("Unauthorized");
      } else {
        throw new Error("An unknown error occurred while trying to update a tag.");
      }
    });
  });
};
