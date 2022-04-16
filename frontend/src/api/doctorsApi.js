import axios from "./axios";

const DOCTORS_URL = "api/doctors";

const getDoctorById = (aDoctorId = '') => {
  return axios
    .get(DOCTORS_URL + "/" + aDoctorId)
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      console.log(e);
    });
};

export default {
  getDoctorById,
};
