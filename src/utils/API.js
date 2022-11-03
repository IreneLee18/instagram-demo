const headers = {
  "app-id": process.env.REACT_APP_APPID,
};
const postHeaders = {
  ...headers,
  "Content-Type": "application/json",
};
export const allUser = () => {
  return fetch("https://dummyapi.io/data/v1/user", {
    headers,
  }).then((res) => res.json());
};
export const allPost = (limit) => {
  return fetch(`https://dummyapi.io/data/v1/post?page=0&limit=${limit}`, {
    headers,
  }).then((res) => res.json());
};
export const userID = (id) => {
  return fetch(`https://dummyapi.io/data/v1/user/${id}`, {
    headers,
  }).then((res) => res.json());
};
export const userPost = (id) => {
  return fetch(`https://dummyapi.io/data/v1/user/${id}/post?page=0`, {
    headers,
  }).then((res) => res.json());
};
export const userPostID = (id) => {
  return fetch(`https://dummyapi.io/data/v1/post/${id}`, {
    headers,
  }).then((res) => res.json());
};

export const updateUsePostID = (id, data) => {
  return fetch(`https://dummyapi.io/data/v1/post/${id}`, {
    method: "PUT",
    headers: postHeaders,
    body: JSON.stringify(data),
  }).then((res) => res.json());
};

export const userPostComment = (id) => {
  return fetch(`https://dummyapi.io/data/v1/post/${id}/comment`, {
    headers,
  }).then((res) => res.json());
};
export const createComment = (data) => {
  return fetch("https://dummyapi.io/data/v1/comment/create", {
    method: "POST",
    headers: postHeaders,
    body: JSON.stringify(data),
  }).then((res) => res.json());
};
export const createPost = (data) => {
  return fetch("https://dummyapi.io/data/v1/post/create", {
    method: "POST",
    headers: postHeaders,
    body: JSON.stringify(data),
  }).then((res) => res.json());
};
