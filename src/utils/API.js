const headers = {
  "app-id": process.env.REACT_APP_APPID,
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
export const user = (id) => {
  return fetch(`https://dummyapi.io/data/v1/user/${id}`, {
    headers,
  }).then((res) => res.json());
};
export const userPost = (id) => {
  return fetch(`https://dummyapi.io/data/v1/user/${id}/post?page=0&limit=5`, {
    headers,
  }).then((res) => res.json());
};
