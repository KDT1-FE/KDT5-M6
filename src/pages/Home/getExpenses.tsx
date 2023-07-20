import axios, { AxiosInstance } from 'axios';

//year랑 month를 매개변수로 받아 월별 api 호출하는 함수
export default function getExpenses(year: string, month: string) {
  //url 기본값 설정
  axios.defaults.baseURL = 'https://chickenlecture.xyz/api/';
  //baseInstance 뒤에 get 붙여서 바로 사용 가능
  const baseInstance: AxiosInstance = axios.create();

  const expensesApi = async () => {
    const res = await baseInstance.get(
      `expenses/calendar?year=${year}&month=${month}&userId=${import.meta.env.VITE_USER_ID}`,
    );
    return res.data;
  };

  return expensesApi();
}
