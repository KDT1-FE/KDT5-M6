import axios, { AxiosInstance } from 'axios';

export default function getExpenses(year: string, month: string) {
  axios.defaults.baseURL = 'http://52.78.195.183:3003/api/';

  const baseInstance: AxiosInstance = axios.create();

  const expensesApi = async () => {
    const res = await baseInstance.get(
      `expenses/calendar?year=${year}&month=${month}&userId=team3`,
    );
    return res.data;
  };

  return expensesApi();
}
