import axios from 'axios'
import qs from 'query-string'

axios.defaults.baseURL = 'https://chickenlecture.xyz/api/'

export const api = axios

export const apiInstance = axios.create()
apiInstance.defaults.paramsSerializer = params => qs.stringify(params)
