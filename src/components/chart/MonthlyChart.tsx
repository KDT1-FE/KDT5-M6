import { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
import { getPeriodConsume } from "../../lib/api/consumeAPI";
import { IExpense } from "./Chart";

// Component
function MonthlyChart() {
  const [totalAmount, setTotalAmount] = useState<number[]>([]);
  const [id, setId] = useState<string[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getPeriodConsume("monthly", "team1");
        setTotalAmount(result.data.map((item: IExpense) => item.totalAmount));
        setId(result.data.map((item: IExpense) => item._id));
        console.log(result.data);
        console.log(result.data.map((item: IExpense) => item.totalAmount));
      } catch (e) {
        console.error(e, "오류 발생!");
      }
    };
    fetchData();
  }, []);
  // Render
  return (
    <ApexCharts
      series={totalAmount}
      type="donut"
      options={{
        labels: id,
        dataLabels: {
          enabled: false,
        },
        title: {
          text: '월별 차트',
        },
      }}
    />
  );
}

export default MonthlyChart;
