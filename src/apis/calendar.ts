import axios from 'axios'

const headers = {
  'Content-Type': 'application/json'
}

const axiosInstance = axios.create({
  baseURL: 'https://chickenlecture.xyz/api/',
  headers
})

export const submitApi = async (updatedData: any) => {
  const SUBMITURL = '/expenses'
  const res = await axiosInstance.post(SUBMITURL, updatedData)
  return res
}

export const calendarApi = async (year: string, month: string, userId: string) => {
  const CALENDARTURL = `/expenses/calendar?year=${year}&month=${month}&userId=${userId}`
  const res = await axiosInstance.get(CALENDARTURL)
  return res
}

export const updateCalendar = async (itemId: string, price: object) => {
  const UPDATEURL = `/expenses/${itemId}`
  const res = await axiosInstance.put(UPDATEURL, price)
  return res
}

export const deleteItem = async (itemId: string) => {
  const UPDATEURL = `/expenses/${itemId}`
  const res = await axiosInstance.delete(UPDATEURL)
  return res
}

export const updateAmount = async (itemId: string, updateprice: object) => {
  const UPDATEAMOUNTURL = `/expenses/${itemId}`
  const res = await axiosInstance.put(UPDATEAMOUNTURL, updateprice)
  return res
}
