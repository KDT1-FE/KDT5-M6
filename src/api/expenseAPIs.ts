import { API_BASE_URL } from '@/data/constants';
import axios from 'axios';

export async function fetchMonthlyConsumptions(labels: string[]) {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/expenses/summary?period=monthly&userId=${
        import.meta.env.VITE_USER_ID
      }`,
    );

    if (response.status !== 200) {
      return {
        data: null,
        statusCode: response.status,
        message: '서버로부터 응답이 왔는데 에러가 왔음',
      };
    }

    const data: { _id: string; totalAmount: number }[] = response.data;

    // labels를 순환하면서 서버로 부터 온 data의 배열에서 _id와 label이 일치하면 해당 data의 totalAmout를 return 없으면 0 return
    const mappedData = labels.map(
      (label) => data.find((d) => d._id === label)?.totalAmount ?? 0,
    );

    return {
      data: mappedData,
      statusCode: response.status,
      message: '서버로부터 원하는 응답이 왔음',
    };
  } catch (error) {
    console.error('서버로부터 응답이 안옴', error);
    return { data: null, statusCode: 444, message: error as string };
  }
}
