import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { useState, useEffect } from "react";
import axios from "axios";

ChartJS.register( CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend );

interface WeeklyCalories {
  _id: string;
  totalAmount: number;
}

interface WeeklyChartProps {
  activeWeek: string;
}

const WeeklyCalories: React.FC<WeeklyChartProps> = ({ activeWeek }) => {
  const [chartData, setChartData] = useState<WeeklyCalories[]>([]);
  const [period, setPeriod] = useState("weekly"); 
  
  useEffect(() => {
    if (activeWeek === "선택없음") {
      setPeriod("weekly");
    } else {
      setPeriod(activeWeek);
    }
  }, [activeWeek]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/kdt5/expenses/summary", {
          params: {
            period: period,
            userId: "team6",
            category: "칼로리"
          },
          headers: {
            "Content-Type": "application/json",
          },
        });
        setChartData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="chart-contents">
      <p><span>주간</span> 칼로리</p>
      <div className="chart">
        {chartData && (
          <div>
            <Bar
              data={{
                labels: activeWeek === "선택없음" ? chartData.map((item) => item._id) : [activeWeek],
                datasets: [
                  {
                    label: "총 칼로리",
                    data: activeWeek === "선택없음" ? chartData.map((item) => item.totalAmount) : [chartData.find((item) => item._id === activeWeek)?.totalAmount || 0],
                    backgroundColor: "rgba(83, 188, 83, 0.3)",
                    borderColor: "rgba(83, 188, 83, 1)",
                    borderWidth: 1
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                layout: {
                  padding: {
                    left: 30,
                    right: 30
                  }
                }
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default WeeklyCalories;
