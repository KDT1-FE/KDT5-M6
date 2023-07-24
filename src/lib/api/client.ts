import axios, { AxiosRequestConfig } from "axios";

const BASE_URL = "https://chickenlecture.xyz";

const axiosConfig: AxiosRequestConfig = {
  baseURL: BASE_URL,
  headers: {
    "content-type": "application/json",
  },
};

const client = axios.create(axiosConfig);

export default client;
