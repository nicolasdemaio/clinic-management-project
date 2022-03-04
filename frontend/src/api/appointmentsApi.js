import Axios from 'axios'

const baseUrl = 'http://localhost:5000/api'


const getAppointments = () => {
  const token = localStorage.getItem('authToken')
  return Axios.get(`${baseUrl}/appointments`, {
    headers: { Authentication: token },
  }).then((response) => {
    return response.data.data
  }).catch(e => {
      console.log(e)
  })
}

export default {
    getAppointments
}