import { useState } from 'react';
import { styled } from 'styled-components';
import { theme } from '../../styles/theme';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js/auto'; //미사용하지만 안적어주면 오류남
import { Bar } from 'react-chartjs-2';
// import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
//Tree-shaking

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart'
    }
  }
};
//임시 데이터
const labels = ['1월', '2월', '3월', '4월', '5월', '6월', '7월'];

export const data = {
  labels, //그래프상 날짜 데이터
  datasets: [
    {
      label: '소비 금액',
      data: labels.map((data) => data.amount),
      backgroundColor: '#4464FF'
    }
  ]
};

function Chart() {
  const [date, setDate] = useState<Date>(new Date());

  return (
    <ChartWrapper>
      <ChartTitle>
        <ArrowLeft>👈</ArrowLeft>
        <Monthly>07.2023</Monthly>
        <ArrowRight>👉</ArrowRight>
      </ChartTitle>
      <ChartGraph>
        <Bar options={options} data={data} />
      </ChartGraph>
    </ChartWrapper>
  );
}

const ChartWrapper = styled.div`
  width: 728px;
  height: 658px;
  marign: auto;
  background-color: ${theme.colors.gray[2]};
  border-radius: 40px;
  box-shadow: 0px 4px 4px ${theme.colors.gray[1]};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ChartTitle = styled.span`
  display: flex;
  align-items: center;
`;

const ArrowLeft = styled.button`
  border: 0;
  background-color: transparent;
  &:hover {
    cursor: pointer;
  }
`;

const Monthly = styled.span`
  font-size: 2.5rem;
  font-family: 'Noto Sans KR';
  font-weight: 500;
`;

const ArrowRight = styled.button`
  border: 0;
  background-color: transparent;
  &:hover {
    cursor: pointer;
  }
`;

const ChartGraph = styled.div`
  margin: auto;
  width: 95%;
  height: 60%;
`;
const ChartBar = styled.div`
  display: flex;
  flexdirection: column;
`;

export default Chart;
