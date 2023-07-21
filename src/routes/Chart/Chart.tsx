import { useEffect, useState, useMemo } from "react";
import { useExpensesStore } from "@/store/useExpensesStore";
import { search } from "@/types/apiTypes";
import { Pie } from "react-chartjs-2";
import { DatePicker } from "antd";
import "chart.js/auto";
import "chartjs-plugin-datalabels";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween.js";
import styled, { createGlobalStyle } from "styled-components";

dayjs.extend(isBetween);

enum TimePeriod {
  WEEK = "주간",
  MONTH = "월간",
  YEAR = "연간",
  ALL = "전체"
}

enum ExpenseType {
  INCOME = "수입",
  EXPENSE = "지출"
}

interface IChartData {
  labels: string[];
  datasets: {
    data: number[];
    backgroundColor: string[];
  }[];
}

const colors = [
  "#F44336",
  "#FF9800",
  "#FFEB3B",
  "#4CAF50",
  "#2196F3",
  "#3F51B5",
  "#9C27B0",
  "#800080",
  "#FF00FF",
  "#00FFFF",
  "#FFFF00",
  "#00FF00",
  "#0000FF",
  "#FF0000",
  "#993300",
  "#808080",
  "#006600",
  "#6666FF",
  "#FF3399",
  "#660066",
  "#336600"
];

const GlobalStyle = createGlobalStyle`
  .chartjs-legend li span {
    max-width: 100px; /* 원하는 최대 너비 설정 */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const ChartContainer = styled.div`
  width: 340px;
`;

const PickerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%; // 전체 폭을 사용하도록 설정
  max-width: 600px; // 상위 컨테이너의 최대 폭을 설정
  margin: 0 auto; // 중앙에 정렬
`;

const StyledDatePicker = styled(DatePicker)`
  &&& {
    .ant-picker-input > input {
      font-size: 1.5rem;
      font-weight: bold;
      cursor: pointer;
      transition: color 0.3s ease;
      min-width: 120px; // 최소 너비 지정

      &:hover {
        color: #888;
      }
    }
    .ant-picker-suffix {
      display: none; // 달력 아이콘 숨기기
    }
  }

  &&&:hover {
    .ant-picker-input > input {
      color: #888;
    }
  }
`;

const StyledDateText = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  height: 50px;
  padding: 4px 11px 4px;
  min-width: 120px;
`;

const SelectBox = styled.select`
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 1.2rem;
  padding: 0;
  line-height: 1; // line-height 추가

  option:checked {
    padding: 0;
  }
`;

const ExpenseTypeButtons = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const Button = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  font-size: 1rem;
  border-bottom: 2px solid transparent;
  flex: 1; // flex 속성 추가

  &.active {
    font-weight: 900;
    border-bottom: 4px solid #ff7473;
  }
`;

const TableContainer = styled.div`
  width: 100%;
  max-height: 380px;
  overflow-y: auto;
  margin-top: 20px;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const StyledTable = styled.table`
  table-layout: fixed; // 추가: 각 셀의 너비를 고정
  width: 100%;
  text-align: left;
  border-collapse: collapse;
  font-family: "IBM Plex Mono", monospace;

  tbody {
    display: block;
  }

  tr {
    display: block;
    border-bottom: 1px solid #ddd;
  }

  td {
    padding: 8px;
  }
`;

const Row = styled.tr`
  display: block;
  border-bottom: 1px solid #ddd;
`;

const Cell = styled.td`
  &:first-child {
    text-align: right;
    width: 50px;
  }

  &:nth-child(2) {
    text-align: left;
    padding-left: 15px;
    width: 100px;
  }

  &:last-child {
    text-align: right;
    width: 220px;
  }
`;

const Chart: React.FC = () => {
  const totalLists = useExpensesStore((state) => state.totalLists);
  const [timePeriod, setTimePeriod] = useState<TimePeriod>(TimePeriod.MONTH);
  const [expenseType, setExpenseType] = useState<ExpenseType>(ExpenseType.EXPENSE);
  const [chartData, setChartData] = useState<IChartData>({ labels: [], datasets: [] });
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const filterListByTimePeriod = (list: search) => {
    const listDate = dayjs(list.date);
    switch (timePeriod) {
      case TimePeriod.WEEK:
        return listDate.isBetween(selectedDate.startOf("week"), selectedDate.endOf("week"));
      case TimePeriod.MONTH:
        return listDate.isBetween(selectedDate.startOf("month"), selectedDate.endOf("month"));
      case TimePeriod.YEAR:
        return listDate.isBetween(selectedDate.startOf("year"), selectedDate.endOf("year"));
      default:
        return true;
    }
  };

  const filteredListByType: search[] = useMemo(() => {
    return totalLists.filter(filterListByTimePeriod).filter((list) => {
      return expenseType === ExpenseType.INCOME ? list.amount >= 0 : list.amount < 0;
    });
  }, [totalLists, timePeriod, expenseType, selectedDate]);

  const filteredList = useMemo(() => {
    return totalLists.filter(filterListByTimePeriod);
  }, [totalLists, timePeriod, selectedDate]);

  useEffect(() => {
    const tags = filteredListByType.reduce((acc: any, list: search) => {
      const tag = list.category.split("+")[0];
      if (!acc[tag]) acc[tag] = 0;
      acc[tag] += Math.abs(list.amount);
      return acc;
    }, {});

    let dataObjects = Object.entries(tags).map(([label, data]) => ({
      label,
      data: data as number,
      backgroundColor: colors[Object.keys(tags).indexOf(label) % colors.length]
    }));

    dataObjects.sort((a, b) => b.data - a.data); // 내림차순으로 정렬합니다.

    setChartData({
      labels: dataObjects.map((obj) => obj.label),
      datasets: [
        {
          data: dataObjects.map((obj) => obj.data),
          backgroundColor: dataObjects.map((obj) => obj.backgroundColor)
        }
      ]
    });
  }, [filteredListByType]);

  const totalIncome = useMemo(() => {
    return filteredList.filter((list) => list.amount >= 0).reduce((acc, list) => acc + list.amount, 0);
  }, [filteredList]);

  const totalExpense = useMemo(() => {
    return filteredList.filter((list) => list.amount < 0).reduce((acc, list) => acc + Math.abs(list.amount), 0);
  }, [filteredList]);

  const handleDatePickerClick = () => {
    setShowDatePicker(true);
  };

  const weekFormat = "YY/MM/DD";
  const customWeekStartEndFormat = (value: dayjs.Dayjs) =>
    `${dayjs(value).startOf("week").format(weekFormat)} ~ ${dayjs(value).endOf("week").format(weekFormat)}`;

  return (
    <>
      <GlobalStyle />
      <ChartContainer>
        <PickerContainer>
          {timePeriod === TimePeriod.ALL ? (
            <StyledDateText>전체</StyledDateText>
          ) : (
            <StyledDatePicker
              open={showDatePicker}
              onClick={handleDatePickerClick}
              onBlur={() => setShowDatePicker(false)}
              bordered={false}
              allowClear={false}
              picker={
                timePeriod === TimePeriod.MONTH
                  ? "month"
                  : timePeriod === TimePeriod.YEAR
                  ? "year"
                  : timePeriod === TimePeriod.WEEK
                  ? "week"
                  : undefined
              }
              value={selectedDate}
              onChange={(value: dayjs.Dayjs | null) => {
                setSelectedDate(value ? value : dayjs());
                setShowDatePicker(false);
              }}
              format={
                timePeriod === TimePeriod.MONTH
                  ? "YYYY년 MM월"
                  : timePeriod === TimePeriod.YEAR
                  ? "YYYY년"
                  : timePeriod === TimePeriod.WEEK
                  ? customWeekStartEndFormat
                  : undefined
              }
            />
          )}
          <SelectBox
            value={timePeriod}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTimePeriod(e.target.value as TimePeriod)}
          >
            {Object.values(TimePeriod).map((period) => (
              <option key={period} value={period}>
                {period}
              </option>
            ))}
          </SelectBox>
        </PickerContainer>

        <ExpenseTypeButtons>
          <Button
            className={expenseType === ExpenseType.INCOME ? "active" : ""}
            onClick={() => setExpenseType(ExpenseType.INCOME)}
          >
            {ExpenseType.INCOME} : ₩ {totalIncome.toLocaleString()}
          </Button>
          <Button
            className={expenseType === ExpenseType.EXPENSE ? "active" : ""}
            onClick={() => setExpenseType(ExpenseType.EXPENSE)}
          >
            {ExpenseType.EXPENSE} : ₩ {totalExpense.toLocaleString()}
          </Button>
        </ExpenseTypeButtons>

        {chartData.labels.length > 0 ? (
          <>
            <div
              style={{
                marginTop: "40px",
                marginBottom: "40px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Pie
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: true,
                  aspectRatio: 2,
                  plugins: {
                    legend: {
                      position: "right",
                      labels: {
                        boxWidth: 20,
                        usePointStyle: false
                      }
                    }
                  }
                }}
              />
            </div>
          </>
        ) : (
          <div style={{ textAlign: "center", marginTop: "50px" }}>데이터가 존재하지 않습니다.</div>
        )}
        <TableContainer>
          <StyledTable>
            <tbody>
              {chartData.labels.map((label, index) => {
                const total = expenseType === ExpenseType.INCOME ? totalIncome : totalExpense;
                const percentage = Math.round((chartData.datasets[0].data[index] / total) * 100);
                const formattedAmount = chartData.datasets[0].data[index].toLocaleString();

                return (
                  <Row key={label}>
                    <Cell
                      style={{
                        width: "50px",
                        color: "white",
                        backgroundColor: chartData.datasets[0].backgroundColor[index],
                        fontFamily: "IBM Plex Mono, monospace"
                      }}
                    >{`${percentage}%`}</Cell>
                    <Cell style={{ paddingLeft: "15px" }}>{label}</Cell>
                    <Cell style={{ fontFamily: "IBM Plex Mono, monospace" }}>{`${formattedAmount}원`}</Cell>
                  </Row>
                );
              })}
            </tbody>
          </StyledTable>
        </TableContainer>
      </ChartContainer>
    </>
  );
};

export default Chart;
