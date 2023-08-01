import { useState, useEffect } from "react";
import { Container, Title, DivideContainer, Consumption, Income } from "./MonthStatistics.style";
import { getPeriodSummary } from "@/api";
import { search, period, periodRes } from "@/types/apiTypes";
import { useExpensesStore } from "@/store/useExpensesStore";
import { useTimeStore } from "@/store/useTimeStore";
import { useLocation } from "react-router-dom";
import { useUserStore } from "@/store/useUserStore";

const MonthStatistics = () => {
  const location = useLocation();
  const userId = useUserStore((state) => state.userId);
  const [title, setTitle] = useState("가계부를 작성해 주세요~");
  const [totalAmount, setTotalAmount] = useState(0);
  const totalLists = useExpensesStore((state) => state.totalLists);
  const [consumption, setConsumption] = useState(0);
  const [income, setIncome] = useState(0);
  const currentYear = useTimeStore((state) => state.currentYear);
  const currentMonth = useTimeStore((state) => state.currentMonth);

  useEffect(() => {
    getTotalAmount();
    consumption === 0 && income === 0
      ? setTitle("📌 가계부를 작성해주세요~")
      : totalAmount > 0
      ? setTitle(`💰 ${totalAmount.toLocaleString()}원 남았어요!`)
      : setTitle(`💰 ${Math.abs(totalAmount).toLocaleString()}원 사용했네요!`);

    const currentYearMonth = `${currentYear}-${currentMonth}`;

    if (
      location.pathname === "/main/weekly" ||
      location.pathname === "/main/daily" ||
      location.pathname === "/sub/calendar"
    ) {
      setConsumption(
        totalLists
          .filter((item) => item.date.includes(currentYearMonth))
          .filter((item) => item.amount < 0)
          .reduce((sum: number, item: search) => {
            return sum + item.amount;
          }, 0)
      );

      setIncome(
        totalLists
          .filter((item) => item.date.includes(currentYearMonth))
          .filter((item) => item.amount > 0)
          .reduce((sum: number, item: search) => {
            return sum + item.amount;
          }, 0)
      );
    }
    if (location.pathname === "/main/monthly") {
      setConsumption(
        totalLists
          .filter((item) => item.date.includes(currentYear))
          .filter((item) => item.amount < 0)
          .reduce((sum: number, item: search) => {
            return sum + item.amount;
          }, 0)
      );

      setIncome(
        totalLists
          .filter((item) => item.date.includes(currentYear))
          .filter((item) => item.amount > 0)
          .reduce((sum: number, item: search) => {
            return sum + item.amount;
          }, 0)
      );
    }
    if (location.pathname === "/main/all") {
      setConsumption(
        totalLists
          .filter((item) => item.amount < 0)
          .reduce((sum: number, item: search) => {
            return sum + item.amount;
          }, 0)
      );

      setIncome(
        totalLists
          .filter((item) => item.amount > 0)
          .reduce((sum: number, item: search) => {
            return sum + item.amount;
          }, 0)
      );
    }
  }, [currentYear, currentMonth, totalAmount, totalLists, consumption, income]);

  const getTotalAmount = () => {
    if (userId) {
      getPeriodSummary("monthly", userId).then((res) => {
        if (
          location.pathname === "/main/weekly" ||
          location.pathname === "/main/daily" ||
          location.pathname === "/sub/calendar"
        ) {
          const filteredItem: periodRes = res.filter((item: period) => item._id === `${currentYear}-${currentMonth}`);
          if (filteredItem.length !== 0) {
            setTotalAmount(filteredItem[0].totalAmount);
          }
        }
        if (location.pathname === "/main/monthly") {
          const filteredItem: periodRes = res.filter((item: period) => item._id.includes(`${currentYear}`));
          if (filteredItem.length !== 0) {
            setTotalAmount(
              filteredItem.reduce((sum: number, item: period) => {
                return sum + item.totalAmount;
              }, 0)
            );
          }
        }
        if (location.pathname === "/main/all") {
          setTotalAmount(
            res.reduce((sum: number, item: period) => {
              return sum + item.totalAmount;
            }, 0)
          );
        }
      });
    }
  };

  return (
    <Container>
      <Title>{title}</Title>
      <DivideContainer>
        <Consumption>
          <p>지출</p>
          <p>₩ {consumption ? consumption.toLocaleString().slice(1) : 0}</p>
        </Consumption>
        <Income>
          <p>수입</p>
          <p>₩ {income.toLocaleString()}</p>
        </Income>
      </DivideContainer>
    </Container>
  );
};

export default MonthStatistics;
