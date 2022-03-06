import axios from "axios"

export default axios.create({
    baseURL: 'http://api.clinic-management.duckdns.org'
})