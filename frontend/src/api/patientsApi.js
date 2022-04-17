import axios from "./axios";

const PATIENTS_URL = "api/patients";

const authToken = localStorage.getItem('authToken');
const roles = localStorage.getItem('roles');

const config = {
  headers : {
    Authorization : authToken
  },
  // params: {
  //   roles: roles,
  //   username: roles,
  //   rol: roles
  // },
  // username: roles,
  // roles: roles,
  // rol: roles,
  data: {
    // username: roles,
    // rol: roles,
    roles: roles
  }
}

const getPatientById = (aPatientId = '') => {
  return axios
    .get(PATIENTS_URL + "/" + aPatientId, config)
    .then((response) => {
      console.log(response.status)
      return response.data;
    })
    .catch((e) => {
      console.log(e);
    });
};

export default {
  getPatientById,
};
