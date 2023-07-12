import { useEffect, useMemo, useState } from 'react';
import { ChartData } from 'chart.js/auto';
import MySelect from '@/pages/Statistics/MySelect';
import { getMonthLabels } from '@/utils/getMonthLabels';
import { MONTH_RANGE_OPTIONS } from '@/data/constants';
import { theme } from 'antd';
import Chart from '@/pages/Statistics/Chart';
import MySkeleton from '@/components/MySkeleton';

export default function Statistics() {
  // theme 색 가져오기
  const {
    token: { colorPrimary, colorPrimaryBg },
  } = theme.useToken();

  // .env에 있는 환경변수 가져오기
  const userId = useMemo(() => import.meta.env.VITE_USER_ID, []);

  // 로딩 UI
  const [isLoading, setIsLoading] = useState(false);

  // 월 범위 설정 / 예) '12', 최근 12개월
  const [monthRange, setMonthRange] = useState('12');
  const handleMonthlyRange = (value: string) => {
    setMonthRange(value);
  };

  // x축 년월 값 / 예) [2023-05, 2023-06, 2023-07])
  const labels = useMemo(
    () => getMonthLabels(Number(monthRange)),
    [monthRange],
  );

  // 월 소비 액 배열 / 예) [10000, 20000, 0, 300000, 500000, 0, 200000, 200000, 200000, 36500]
  const [monthlyConsumptions, setMonthlyConsumptions] = useState<number[]>([]);

  // 월별 소비금액을 서버로 부터 가져오고 monthlyConsumptions에 저장하는 로직
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      // 너무 빨리 로딩돼서 0.7초 timeout
      await new Promise((resolve) => setTimeout(resolve, 700));

      try {
        const response = await fetch(
          `http://52.78.195.183:3003/api/expenses/summary?period=monthly&userId=${userId}`,
        );
        if (!response.ok) {
          console.log('서버에서 응답이 왔는데 에러가 옴');
          return;
        }
        const data: { _id: string; totalAmount: number }[] =
          await response.json();

        // labels를 순환하면서 서버로 부터 온 data의 배열에서 _id와 label이 일치하면 해당 data의 totalAmout를 return 없으면 0 return
        const mappedData = labels.map(
          (label) => data.find((d) => d._id === label)?.totalAmount ?? 0,
        );
        setMonthlyConsumptions(mappedData);
      } catch (error) {
        console.error('Error: 서버에서 응답이 안옴 ', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [labels, monthRange, userId]);

  // Chart에서 요구하는 값
  const data: ChartData<'bar', number[], string> = useMemo(() => {
    return {
      labels: labels,
      datasets: [
        {
          label: '월별 지출금액(원)',
          data: monthlyConsumptions,
          borderWidth: 2,
          backgroundColor: colorPrimaryBg,
          borderColor: colorPrimary,
        },
      ],
    };
  }, [colorPrimary, colorPrimaryBg, labels, monthlyConsumptions]);

  return (
    <div style={{ width: '90vw' }}>
      <MySelect
        handleChange={handleMonthlyRange}
        options={MONTH_RANGE_OPTIONS}
      />
      {isLoading ? <MySkeleton /> : <Chart data={data} />}
    </div>
  );
}
