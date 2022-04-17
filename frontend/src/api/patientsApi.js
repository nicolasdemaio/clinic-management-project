import axios from "./axios";

const PATIENTS_URL = "api/patients";

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

const getPatientById = (aPatientId = '') => {
  return axios
    .get(PATIENTS_URL + "/" + aPatientId, config)
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      console.log(e);
    });
};

export default {
  getPatientById,
};
