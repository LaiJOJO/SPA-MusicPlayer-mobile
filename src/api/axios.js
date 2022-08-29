import axios from "axios";

const request = axios.create({
  // baseURL:'http://localhost:3000',
  baseURL:'http://127.0.0.1:3000',
  timeout:5000
})

export default request