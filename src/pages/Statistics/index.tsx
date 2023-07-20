import { useEffect, useMemo, useState } from 'react';
import { ChartData } from 'chart.js/auto';
import MySelect from '@/pages/Statistics/MySelect';
import { getMonthLabels } from '@/utils/getMonthLabels';
import { MONTH_RANGE_OPTIONS } from '@/data/constants';
import { theme } from 'antd';
import Chart from '@/pages/Statistics/Chart';
import MySkeleton from '@/components/MySkeleton';
import { fetchMonthlyConsumptions } from '@/api/expenseAPIs';
import Banner from '@/pages/Statistics/Banner';

export default function Statistics() {
  // theme 색 가져오기
  const {
    token: { colorPrimary, colorPrimaryBg },
  } = theme.useToken();

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

  const [message, setMessage] = useState('');
  const [type, setType] = useState<'success' | 'error'>('success');
  const [bannerVisible, setBannerVisible] = useState(false);

  // 월별 소비금액을 서버로 부터 가져오고 monthlyConsumptions에 저장하는 로직
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      // 너무 빨리 로딩돼서 0.7초 timeout
      await new Promise((resolve) => setTimeout(resolve, 700));

      const { data, statusCode, message } = await fetchMonthlyConsumptions(
        labels,
      );
      if (data) {
        setMonthlyConsumptions(data);
        setType('success');
        setMessage(`최근 ${monthRange}개월 소비내역입니다`);
      } else {
        console.error(
          `Error: Failed to fetch data. Status Code: ${statusCode}. Message: ${message}`,
        );
        setType('error');
        setMessage('서버가 종료되었나봐요😭😭😭');
      }
      setIsLoading(false);
      setBannerVisible(true);
    };
    fetchData();
  }, [labels, monthRange]);

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
      {bannerVisible ? <Banner message={message} type={type} /> : null}
      <MySelect
        handleChange={handleMonthlyRange}
        options={MONTH_RANGE_OPTIONS}
      />
      {isLoading ? <MySkeleton /> : <Chart data={data} />}
    </div>
  );
}
