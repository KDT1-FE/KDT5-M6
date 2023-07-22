import { API_BASE_URL } from '@/data/constants';
import axios, { isAxiosError } from 'axios';

export async function fetchMonthlyConsumptions(labels: string[]) {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/expenses/summary?period=monthly&userId=${
        import.meta.env.VITE_USER_ID
      }`,
    );

    // 서버로 부터 응답이 왔는데 에러인 경우(에기에 걸리는 경우는 현재로서는 없음)
    if (response.status !== 200) {
      return {
        data: null,
        statusCode: response.status,
        message: '서버로부터 응답이 왔는데 에러가 왔음',
      };
    }
    // 원하는 데이터가 오는 경우
    const data: { _id: string; totalAmount: number }[] = response.data;
    // [ {_id: '2023-02', totalAmount: 1214900}, {_id: '2023-03', totalAmount: 1214900}, {_id: '2023-04', totalAmount: 1214900}, {_id: '2023-05', totalAmount: 1214900}, {_id: '2023-06', totalAmount: 1214900} ] 이런 식으로 옴

    // labels(인자로 받아옴)를 순환하면서 서버로 부터 온 data의 배열에서 _id('2023-03')와 label이 일치하면 해당 data의 totalAmout를 return 없으면 0 return
    const mappedData = labels.map(
      (label) => data.find((d) => d._id === label)?.totalAmount ?? 0,
    );

    return {
      data: mappedData,
      statusCode: response.status, //얘는 당연히 200임
      message: '서버로부터 원하는 응답이 왔음', // 따로 오는 메세지는 없으므로 맘대로 지정함
    };
  } catch (error) {
    if (isAxiosError(error)) {
      console.error('엑시오스에러, 서버로부터 응답이 안옴', error);
      return { data: null, statusCode: 444, message: error.message };
    } else {
      return {
        data: null,
        statusCode: 444,
        message: '엑시오스 에러 이외의 에러',
      };
    }
  }
}
