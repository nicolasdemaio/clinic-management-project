import axios from "./axios";

const PATIENTS_URL = "api/patients";

const getPatientById = (aPatientId = '') => {
  return axios
    .get(PATIENTS_URL + "/" + aPatientId)
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
