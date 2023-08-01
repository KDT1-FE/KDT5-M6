import styled from "styled-components";
import { search } from "@/types/apiTypes";
import { useExpensesStore } from "@/store/useExpensesStore";
import { getWeekNumber, getWeekRange } from "@/utils/date";
import { useTimeStore } from "@/store/useTimeStore";
import { useEffect, useState } from "react";
import DailyList from "@/components/main/DailyList";

const WeeklyList = () => {
  const dayList = useExpensesStore((state) => state.dayList);
  const currentYear = useTimeStore((state) => state.currentYear);
  const [weekList, setWeekList] = useState<{ [key: string]: search[] }>();
  const [isClicked, setIsClicked] = useState<boolean[]>([]);
  const [weekRange, setWeekRange] = useState<{ [key: number]: [number, number] }>({});

  useEffect(() => {
    createWeekList();
  }, [dayList]);

  useEffect(() => {
    const isClickedArray = weekList ? Object.keys(weekList) : [];
    setIsClicked(new Array(isClickedArray.length).fill(false));
  }, [weekList]);

  const createWeekList = () => {
    const newWeekList: { [key: string]: search[] } = {};
    Object.entries(dayList).forEach(([day, expenseList]) => {
      const newDay = `${currentYear}.${day}`;
      const formattedNewDay = new Date(newDay);
      const newWeekNumber = getWeekNumber(formattedNewDay);
      const [start, end] = getWeekRange(formattedNewDay, newWeekNumber);
      if (start.getDate() <= Number(day.split(".")[1]) && end.getDate() >= Number(day.split(".")[1])) {
        if (!newWeekList[`${start.toLocaleDateString()} ~ ${end.toLocaleDateString()}`]) {
          newWeekList[`${start.toLocaleDateString()} ~ ${end.toLocaleDateString()}`] = [];
        }
        newWeekList[`${start.toLocaleDateString()} ~ ${end.toLocaleDateString()}`].push(...expenseList);
        setWeekList(newWeekList);
      }
    });
  };

  const ContainerClickHandler = (day: string, index: number) => {
    setIsClicked(isClicked.map((clicked, clickedIndex) => (clickedIndex === index ? !clicked : clicked)));
    const dates: number[] = day.match(/\d+/g)?.map(Number) || [];
    const start = dates[2];
    const end = dates[5];
    setWeekRange((prevWeekRange) => ({ ...prevWeekRange, [index]: [start, end] }));
  };

  return (
    <Container>
      {weekList &&
        Object.entries(weekList).map(([day, lists], index) => (
          <div key={day}>
            <WeeklyListContainer
              className={isClicked[index] ? "active" : ""}
              onClick={() => ContainerClickHandler(day, index)}
            >
              <WeeklyTitle>
                <WeeklyPeriod>{day}</WeeklyPeriod>
                <WeeklyConsume>
                  {lists
                    .filter((list) => list.amount < 0)
                    .reduce((acc, cur) => acc + cur.amount, 0)
                    .toLocaleString()}
                </WeeklyConsume>
                <WeeklyIncome>
                  {lists
                    .filter((list) => list.amount > 0)
                    .reduce((acc, cur) => acc + cur.amount, 0)
                    .toLocaleString()}
                </WeeklyIncome>
              </WeeklyTitle>
            </WeeklyListContainer>
            <WeeklyDailyListContainer className={isClicked[index] ? "active" : ""}>
              {isClicked[index] &&
                weekRange[index] &&
                Object.entries(dayList)
                  .filter(([day]) => {
                    const [weekStart, weekEnd] = weekRange[index];
                    return Number(day.split(".")[1]) >= weekStart && Number(day.split(".")[1]) <= weekEnd;
                  })
                  .map(([day, lists]) => <DailyList key={day} day={day} expenseList={lists} />)}
            </WeeklyDailyListContainer>
          </div>
        ))}
    </Container>
  );
};

export default WeeklyList;

const Container = styled.div`
  position: relative;
  top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 350px;
  height: 500px;
  max-width: 350px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const WeeklyListContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 18px;
  min-width: 340px;
  min-height: 60px;
  max-width: 340px;
  max-height: 60px;
  border-radius: 10px;
  margin-bottom: 10px;
  background-color: #ffffff;
  cursor: pointer;
  &:hover {
    border: 1px solid var(--point-color-yellow);
  }
  &.active {
    box-shadow: 1px 2px 1px var(--point-color-yellow);
    position: relative;
    top: 4px;
  }
`;

const WeeklyTitle = styled.div`
  display: grid;
  grid-template-columns: 2fr repeat(2, 0.6fr);
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-size: 0.9em;
  text-align: center;
`;

const WeeklyPeriod = styled.div`
  font-size: 14px;
  font-weight: 600;
`;

const WeeklyConsume = styled.div`
  font-size: 14px;
  color: var(--point-color-red);
`;

const WeeklyIncome = styled.div`
  font-size: 14px;
  color: var(--point-color-green);
`;

const WeeklyDailyListContainer = styled.div`
  &.active {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    top: 10px;
    min-width: 340px;
    max-width: 340px;
    max-height: 260px;
    border-radius: 10px;
    margin-bottom: 30px;
    padding-top: 10px;
    background-color: #eaeaea;
    overflow: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;
