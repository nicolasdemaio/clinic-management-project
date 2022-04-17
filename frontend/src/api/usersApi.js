import axios from "./axios";

const USERS_URL = "api/users";

const authToken = localStorage.getItem('authToken');
const roles = localStorage.getItem('roles');

const config = {
  headers : {
    Authorization : authToken
  },
  data: {
    roles: roles
  }
};

const getUserById = (aUserId = '') => {
  return axios
    .get(USERS_URL + "/" + aUserId, config)
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      console.log(e);
    });
};

export default {
  getUserById,
};
