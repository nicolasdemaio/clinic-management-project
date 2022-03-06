import axios from './axios'

const APPOINTMENTS_URL = 'api/appointments'

const getAppointments = () => {
  return axios.get(APPOINTMENTS_URL)
    .then((response) => {
    return response.data.data
  }).catch(e => {
      console.log(e)
  })
}

export default {
    getAppointments
}