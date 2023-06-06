import axios from 'axios';
const BASE_URL = 'http://127.0.0.1:8080/'
//const BASE_URL = 'http://localhost:8080/'

export default axios.create({
    baseURL: BASE_URL
});