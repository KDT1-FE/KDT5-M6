import { useTimeStore } from "@/store/useTimeStore";
import { useExpensesStore } from "@/store/useExpensesStore";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { search, ObjectData } from "@/types/apiTypes";
import { getWeeksOfMonth, getMonthRange } from "@/utils/date";

const MonthlyList = () => {
  const yearList = useExpensesStore((state) => state.yearList);
  const currentYear = useTimeStore((state) => state.currentYear);
  const [monthList, setMonthList] = useState<ObjectData>({});
  const [weekRange, setWeekRange] = useState<{ [key: number]: string[] }>({});
  const [isClicked, setIsClicked] = useState<boolean[]>([]);

  useEffect(() => {
    createMonthList();
  }, [yearList]);

  useEffect(() => {
    const isClickedArray = monthList ? Object.keys(monthList) : [];
    setIsClicked(new Array(isClickedArray.length).fill(false));
  }, [monthList]);

  const createMonthList = () => {
    const newMonthList: { [key: string]: search[] } = {};
    yearList.forEach((list) => {
      const date = list.date;
      const [, month] = date.split("-");
      const formattedDay = `${month}월`;
      if (newMonthList[formattedDay]) {
        newMonthList[formattedDay].push(list);
      } else {
        newMonthList[formattedDay] = [list];
      }
    });
    const keysArray: string[] = Object.keys(newMonthList);
    // 키 값을 내림차순으로 정렬합니다.
    keysArray.sort((a, b) => Number(b.replace("월", "")) - Number(a.replace("월", "")));

    // 정렬된 키를 기반으로 새로운 객체를 생성합니다.
    interface SortedData {
      [date: string]: search[];
    }
    const sortedData: SortedData = {};
    keysArray.forEach((key) => {
      sortedData[key] = newMonthList[key];
    });

    setMonthList(sortedData);
  };

  // 클릭 이벤트에, getWeeksofMonth를 생성. useState로 set해주기 : Weeks, setWeeks ✅
  const monthListClickHandler = (month: string, index: number) => {
    setIsClicked(isClicked.map((clicked, clickedIndex) => (clickedIndex === index ? !clicked : clicked)));
    const weekRanges = getWeeksOfMonth(Number(currentYear), Number(month.replace("월", "")));
    setWeekRange((prevWeekRange) => ({ ...prevWeekRange, [index]: [...weekRanges] }));
  };

  const filterListsByRange = (lists: search[], range: string) => {
    const [start, end] = range.split(" ~ ");
    const startDate = new Date(`${currentYear}-${start}`);
    const endDate = new Date(`${currentYear}-${end}`);
    return lists.filter((list) => {
      const listDate = new Date(list.date);
      return listDate >= startDate && listDate <= endDate;
    });
  };
  return (
    <Container>
      {Object.entries(monthList).map(([month, lists], index) => (
        <div key={month}>
          <MonthlyListContainer
            className={isClicked[index] ? "active" : ""}
            onClick={() => monthListClickHandler(month, index)}
          >
            <MonthlyPeriod>
              <div>{month}</div>
              <span>{getMonthRange(Number(currentYear), Number(month.replace("월", "")))}</span>
            </MonthlyPeriod>
            <MonthlyConsume>
              {lists
                .filter((list: search) => list.amount < 0)
                .reduce((acc: number, cur: search) => acc + cur.amount, 0)
                .toLocaleString()}
            </MonthlyConsume>
            <MonthlyIncome>
              {lists
                .filter((list) => list.amount > 0)
                .reduce((acc, cur) => acc + cur.amount, 0)
                .toLocaleString()}
            </MonthlyIncome>
          </MonthlyListContainer>
          <WeeklyListContainer className={isClicked[index] ? "active" : ""}>
            {isClicked[index] &&
              weekRange[index] &&
              weekRange[index].map((range) => {
                const filteredLists = filterListsByRange(lists, range);
                return (
                  <WeeklyLists key={range}>
                    <span>{range.replaceAll("-", ".")}</span>
                    <WeeklyAmounts>
                      <Consume>
                        {filteredLists
                          .filter((list) => list.amount < 0)
                          .reduce((acc, cur) => acc + cur.amount, 0)
                          .toLocaleString()}
                      </Consume>
                      <Income>
                        {filteredLists
                          .filter((list) => list.amount > 0)
                          .reduce((acc, cur) => acc + cur.amount, 0)
                          .toLocaleString()}
                      </Income>
                    </WeeklyAmounts>
                  </WeeklyLists>
                );
              })}
          </WeeklyListContainer>
        </div>
      ))}
    </Container>
  );
};

export default MonthlyList;

const Container = styled.div`
  position: relative;
  top: 100px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 350px;
  height: 500px;
  max-width: 350px;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const MonthlyListContainer = styled.div`
  display: grid;
  grid-template-columns: 1.5fr repeat(2, 1fr);
  justify-content: center;
  align-items: center;
  gap: 28px;
  min-width: 340px;
  min-height: 60px;
  max-width: 340px;
  max-height: 60px;
  border-radius: 10px;
  padding: 0 18px 0;
  margin-bottom: 10px;
  background-color: #ffffff;
  text-align: center;
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

const MonthlyPeriod = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  div {
    font-weight: 600;
  }
  span {
    font-size: 0.8em;
  }
`;

const MonthlyConsume = styled.div`
  font-size: 0.9em;
  color: var(--point-color-red);
`;

const MonthlyIncome = styled.div`
  font-size: 0.9em;
  color: var(--point-color-green);
`;

const WeeklyListContainer = styled.div`
  display: none;
  &.active {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 4px;
    position: relative;
    top: 10px;
    min-width: 340px;
    max-width: 340px;
    max-height: 260px;
    border-radius: 10px;
    padding: 10px 0 10px;
    margin-bottom: 30px;
    background-color: #eaeaea;
    overflow: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const WeeklyLists = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: center;
  align-items: center;
  width: 300px;
  span {
    font-size: 14px;
    padding-left: 8px;
  }
`;
const WeeklyAmounts = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  justify-content: center;
  text-align: center;
  font-size: 12px;
`;

const Consume = styled.div`
  color: var(--point-color-red);
  margin-right: 10px;
`;

const Income = styled.div`
  color: var(--point-color-green);
`;
