import axios from 'axios'

const api = axios.create({
    withCredentials: false
})

export default api
