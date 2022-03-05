import Axios from 'axios'

const baseUrl = 'http://localhost:5000/api'

const getAppointments = () => {
  return Axios.get(`${baseUrl}/appointments`)
    .then((response) => {
    return response.data.data
  }).catch(e => {
      console.log(e)
  })
}

export default {
    getAppointments
}