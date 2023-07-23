import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://yolo-wallet.vercel.app/'
})

export default api
