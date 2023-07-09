import { useState } from 'react';
import { styled } from 'styled-components';
import { theme } from '../../styles/theme';
import back from '../../assets/arrow_back_ios.png';
import forward from '../../assets/arrow_forward_ios.png';
// import { DummyrData } from './dummyData';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData
} from 'chart.js/auto'; //미사용하지만 안적어주면 오류남

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Chart() {
  const [date, setDate] = useState<Date>(new Date());
  const getFormattedDate = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return `${month < 10 ? '0' + month : month}.${year}`;
  };

  const options = {
    responsive: true,
    // 정보 hover
    interaction: {
      mode: 'index' as const,
      intersect: false
    },
    plugins: {
      legend: {
        // 범례 스타일링
        labels: {
          font: {
            // 범례의 폰트 스타일도 지정할 수 있습니다.
            family: 'Noto Sans KR'
          }
        },
        position: 'top' as const
      },
      title: {
        display: true,
        text: '어휴...어려워..'
      },
      scales: {
        x: {
          grid: {
            color: '#F8F9FD'
          }
        },
        y: {
          grid: {
            color: '#F8F9FD'
          }
        }
      }
    }
  };

  // 이러지마 제발..
  const data: ChartData<
    'bar',
    ChartDataset<'bar', { x: string; y: number }>
  > = {
    // x : 주별 지출 금액 표기
    labels: ['첫째주', '둘째주', '셋째주', '넷째주', '다섯째주'],
    datasets: [
      {
        type: 'bar',
        label: '단위 : 만 원',
        // y : 지출 data 들어가는 자리
        data: [
          { x: '첫째주', y: 20 },
          { x: '둘째주', y: 50 },
          { x: '셋째주', y: 3 },
          { x: '넷째주', y: 40 },
          { x: '다섯째주', y: 70 },
          { x: null, y: 100 }
        ],
        // data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        backgroundColor: '#4464FF'
      }
    ]
  };

  return (
    <ChartWrapper>
      <ChartTitle>
        <LeftArrow
          type="button"
          onClick={() =>
            setDate(new Date(date.getFullYear(), date.getMonth() - 1))
          }
        >
          <Lefticon src={back} alt="" />
        </LeftArrow>
        <Monthly>{getFormattedDate(date)}</Monthly>
        <RightArrow
          type="button"
          onClick={() =>
            setDate(new Date(date.getFullYear(), date.getMonth() + 1))
          }
        >
          <Righticon src={forward} alt="" />
        </RightArrow>
      </ChartTitle>
      <ChartGraph>
        <Bar data={data} options={options} height="160px" />
        {/* plugins={[segmentHighlighter]} */}
      </ChartGraph>
    </ChartWrapper>
  );
}

const ChartWrapper = styled.div`
  width: 728px;
  height: 658px;
  marign: auto;
  padding-top: 60px;
  background-color: ${theme.colors.white};
  border-radius: 40px;
  box-shadow: 5px 5px 20px ${theme.colors.gray[1]};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ChartTitle = styled.span`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LeftArrow = styled.button`
  border: 0;
  background-color: transparent;
  font-size: 2rem;
  &:hover {
    cursor: pointer;
  }
`;

const Lefticon = styled.img`
  width: 1rem;
`;

const Monthly = styled.span`
  font-size: 2.5rem;
  font-family: 'poppins';
  font-weight: 500;
`;

const RightArrow = styled.button`
  border: 0;
  background-color: transparent;
  font-size: 2rem;
  &:hover {
    cursor: pointer;
  }
`;
const Righticon = styled.img`
  width: 1rem;
`;

const ChartGraph = styled.div`
  margin: auto;
  margin-top: 10%;
  width: 95%;
  height: 80%;
  // background-color: ${theme.colors.blue.main};
`;

export default Chart;
