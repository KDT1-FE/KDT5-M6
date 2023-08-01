import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import { useExpensesStore } from "@/store/useExpensesStore";
import MonthStatistics from "@/components/main/MonthStatistics";
import { useTimeStore } from "@/store/useTimeStore";
import { PostBtn } from "@/components/PostBtn";
import AllDailyList from "@/components/main/AllDailyList";
import styled from "styled-components";
import { search } from "@/types/apiTypes";

const Daily = () => {
  const userId = useUserStore((state) => state.userId);
  const userNickname = useUserStore((state) => state.userNickname);
  const initializeUserId = useUserStore((state) => state.initializeUserId);
  const totalLists = useExpensesStore((state) => state.totalLists);
  const setDayList = useExpensesStore((state) => state.setDayList);
  const monthList = useExpensesStore((state) => state.monthList);
  const currentYear = useTimeStore((state) => state.currentYear);
  const currentMonth = useTimeStore((state) => state.currentMonth);
  const currentDay = useTimeStore((state) => state.currentDay);

  // currentDay와 dayList의 day가 일치하는 것 찾기
  // useRef로 해당 dayList 요소로 스크롤 이동
  useEffect(() => {}, [currentDay]);
  useEffect(() => {
    initializeUserId();
  }, [initializeUserId]);

  useEffect(() => {
    createDayList();
  }, [monthList, currentYear, currentMonth]);

  const createDayList = () => {
    const newDayList: { [key: string]: search[] } = {};
    monthList.forEach((list) => {
      const date = list.date;
      const [, month, dayTime] = date.split("-");
      const day = dayTime.split("T")[0];
      const formattedDay = `${month}.${day}`;
      if (newDayList[formattedDay]) {
        newDayList[formattedDay].push(list);
      } else {
        newDayList[formattedDay] = [list];
      }
    });
    // console.log("newDayList", newDayList);
    const keysArray: string[] = Object.keys(newDayList);

    // 키 값을 내림차순으로 정렬합니다.
    keysArray.sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

    // 정렬된 키를 기반으로 새로운 객체를 생성합니다.
    interface SortedData {
      [date: string]: search[];
    }
    const sortedData: SortedData = {};
    keysArray.forEach((key) => {
      sortedData[key] = newDayList[key];
    });

    // console.log(Object.entries(sortedData));
    setDayList(sortedData);
  };

  return (
    <>
      <MainDailyContainer>
        <MonthStatistics />
        {!totalLists.length ? (
          <>
            <span>환영합니다</span>
            <span>{userNickname}님!</span>
            <p>#{userId?.substring(0, 4)}</p>
          </>
        ) : (
          <></>
        )}
        <DailyListContainer>
          <AllDailyList />
        </DailyListContainer>
        <PostBtn />
      </MainDailyContainer>
    </>
  );
};

export default Daily;

const MainDailyContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 390px;
  height: 680px;
  max-height: 800px;
`;

const DailyListContainer = styled.div`
  position: absolute;
  top: 190px;
  display: flex;
  flex-direction: column;
  height: 490px;
  overflow-y: scroll;
  div {
    p {
      font-weight: 600;
    }
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;
