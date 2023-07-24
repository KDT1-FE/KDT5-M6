import { useEffect, useState } from "react";
import { getCalendarConsume } from "../../lib/api/consumeAPI";
import { totalAmount } from "./totalAmount";
import { styled } from "styled-components";
import { todayAtom } from "../../state/today";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  openModalAtom,
  openDeleteModalAtom,
  openEditModalAtom,
} from "../../state/modalClose";

export function WeeklyView() {
  const [thisMonthData, setThisMonthData] = useState([]);
  const [today, setToday] = useRecoilState(todayAtom);
  const addValue = useRecoilValue(openModalAtom);
  const editValue = useRecoilValue(openEditModalAtom);
  const deleteValue = useRecoilValue(openDeleteModalAtom);
  const [navMonth, setNavMonth] = useState<number>(today.getMonth() + 1);
  const [navYear, setNavYear] = useState<number>(today.getFullYear());

  //api호출
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchRes = await getCalendarConsume({
          year: navYear,
          month: navMonth,
          userId: "team1",
        });
        const result = fetchRes.data;
        setThisMonthData(result);
      } catch (error) {
        console.error(error);
      }
    };
    setTimeout(() => fetchData(), 5);
  }, [navYear, navMonth, addValue, editValue, deleteValue]);

  useEffect(() => {
    setToday(new Date(`${navYear}-${navMonth}-1`));
  }, [navYear, navMonth, setToday]);

  const thisMonthDataKey = Object.keys(thisMonthData); //thisMonthData의 key값을 배열로 받아옴
  const nowMonthFirst = new Date(navYear, navMonth - 1, 1).getDay(); //해당 달 1일의 요일을 받아옴
  const nowMonthLastDate = new Date(navYear, navMonth, 0).getDate(); //해당 달의 마지막 일을 받아옴
  const weekDevide = thisMonthDataKey.map((a) =>
    Math.ceil((Number(a) + nowMonthFirst) / 7),
  ); //thisMonthData가 들어있는 일이 몇번째 주에 속해있는지 배열로 받아옴
  const weeks = Math.ceil((nowMonthFirst + nowMonthLastDate) / 7); //해당 달이 몇째 주 까지 있는지 받아옴

  //weeknum번째 주의 수익과 지출을 계산해 반환
  const weekTotal = (weeknum: number) => {
    let weekIndex = [
      weekDevide.indexOf(weeknum),
      weekDevide.lastIndexOf(weeknum),
    ];
    let weekExpenses = 0;
    let weekIncome = 0;
    for (let i = weekIndex[0]; i <= weekIndex[1]; i++) {
      let thisMonthDataIndex = Number(thisMonthDataKey[i]);
      weekExpenses += totalAmount(thisMonthData[thisMonthDataIndex])[0];
      weekIncome += totalAmount(thisMonthData[thisMonthDataIndex])[1];
    }
    return [weekExpenses, weekIncome];
  };

  //weekTotal을 이용하여 각 주마다의 수익, 지출 현황을 반환
  const weekList = () => {
    const result = [];
    for (let i = 1; i <= weeks; i++) {
      result.push(
        <WeekList key={i}>
          <div>{i}째주</div>
          {weekTotal(i)[0] === 0 && weekTotal(i)[1] === 0 ? (
            <div className="nodata">내역없음</div>
          ) : (
            <div className="totalWrap">
              {weekTotal(i)[0] !== 0 ? (
                <div>{weekTotal(i)[0].toLocaleString()}원</div>
              ) : null}
              {weekTotal(i)[1] !== 0 ? (
                <div className="posi">
                  +{weekTotal(i)[1].toLocaleString()}원
                </div>
              ) : null}
            </div>
          )}
        </WeekList>,
      );
    }
    return result;
  };

  //nav의 버튼을 누르면 실행되는 함수, +하거나 -함
  const handleNavNext = () => {
    if (navMonth === 12) {
      setNavMonth(1);
      setNavYear(navYear + 1);
    } else {
      setNavMonth(navMonth + 1);
    }
  };
  const handleNavPrev = () => {
    if (navMonth === 1) {
      setNavMonth(12);
      setNavYear(navYear - 1);
    } else {
      setNavMonth(navMonth - 1);
    }
  };

  return (
    <>
      <Container>
        <Navigation>
          <button onClick={() => handleNavPrev()}>‹</button>
          <div className="navTitle">
            {navYear}년 {navMonth}월
          </div>
          <button onClick={() => handleNavNext()}>›</button>
        </Navigation>
        {weekList()}
      </Container>
    </>
  );
}

const Navigation = styled.nav`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 44px;
  margin-bottom: 16px;
  .navTitle {
    width: 264px;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 1px 6px;
    margin-top: 8px;
    color: #a55eea;
  }
  .navTitle:hover {
    background-color: #f8f8fa;
  }
  button {
    background: none;
    width: 44px;
    height: 36px;
    padding: 1px 6px;
    margin-top: 8px;
    font-size: 16px;
    color: #a55eea;
  }
  button:hover {
    background-color: #f8f8fa;
  }
`;

const Container = styled.div`
  padding: 20px 30px 30px 30px;
  width: 30rem;
  display: flex;
  flex-wrap: wrap;
  border-radius: 8px;
  font-size: 16px;
`;
const WeekList = styled.div`
  height: 3.8rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  .posi {
    color: #a55eea;
    padding-top: 8px;
  }
  .totalWrap {
    text-align: right;
  }
  .nodata {
    color: #ccc;
  }
`;
