import moment from "moment";
import axios, { AxiosInstance } from 'axios'

export default function getExpenses(date:Date){
  axios.defaults.baseURL = ' http://52.78.195.183:3003/api/'

  const baseInstance: AxiosInstance = axios.create()

  const year = moment(date).format('YYYY')
  const month = moment(date).format('M')

  const expensesApi = async() => {
    const res = await baseInstance.get(`expenses/calendar?year=${year}&month=${month}&userId=team3`)
    return res.data
  }

  return expensesApi()
}