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

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels, //그래프상 날짜 데이터
  datasets: [
    {
      label: '소비 금액',
      data: labels.map((data) => data.y),
      backgroundColor: 'rgba(255, 99, 132, 0.5)'
    }
  ]
};

function Chart() {
  return (
    <ChartWrapper>
      <H1>07.01</H1>
      <ChartGraph>
        차트자리
        <Bar options={options} data={data} />
      </ChartGraph>
    </ChartWrapper>
  );
}

const ChartWrapper = styled.div`
  width: 728px;
  height: 658px;
  background-color: ${theme.colors.gray[2]};
  border-radius: 40px;
  box-shadow: 0px 4px 4px ${theme.colors.gray[1]};
  overflow: hidden;
`;

const H1 = styled.h1`
  font-size: 2.5rem;
  font-family: 'Noto Sans KR';
  font-weight: 500;
`;
const ChartGraph = styled.div`
  margin: auto;
  width: 95%;
  height: 60%;
  background-color: grey;
`;
const ChartBar = styled.div`
  display: flex;
  flexdirection: column;
`;

export default Chart;
