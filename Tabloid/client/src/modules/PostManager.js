const baseUrl = '/api/post';

export const getAllPosts = () => {
    return fetch(baseUrl)
      .then((res) => res.json())
  };

export const getMyPosts = () => {
    return fetch(`${baseUrl}/mypost`)
    .then((res) => res.json())
};