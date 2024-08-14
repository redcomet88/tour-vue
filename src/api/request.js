import axios from 'axios'

const service =  axios.create({
    baseURL: '/api',
    timeout: 1200,
})

export default service
