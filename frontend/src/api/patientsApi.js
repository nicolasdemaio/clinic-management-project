import axios from "./axios";

const PATIENTS_URL = "api/patients";

const getPatientById = (aPatientId) => {
  return axios
    .get(PATIENTS_URL + "/" + aPatientId)
    .then((response) => {
        console.log(response.data)
      return response.data;
    })
    .catch((e) => {
      console.log(e);
    });
};

export default {
  getPatientById,
};
