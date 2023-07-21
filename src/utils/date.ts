import moment from "moment";

// 특정 일자 기준 해당 주차 구하기
export const getWeekNumber = (dateFrom = new Date()) => {
  // 해당 날짜 (일)
  const currentDate = dateFrom.getDate();

  // 이번 달 1일로 지정
  const startOfMonth = new Date(dateFrom.setDate(1));

  // 이번 달 1일이 무슨 요일인지 확인
  const weekDay = startOfMonth.getDay(); // 0: Sun ~ 6: Sat

  // ((요일 - 1) + 해당 날짜) / 7일로 나누기 = N 주차
  return Math.ceil((weekDay + currentDate) / 7);
};

// 특정 일자 기준 해당 주차 시작일/종료일 구하기
export const getWeekRange = (dateFrom = new Date(), weekNumber: number) => {
  // 이번 달 1일로 지정
  const startOfMonth = new Date(dateFrom.setDate(1));

  // 이번 달 1일이 무슨 요일인지 확인
  const weekDay = startOfMonth.getDay(); // 0: Sun ~ 6: Sat

  // 주차의 시작 날짜 계산
  const startDate = new Date(startOfMonth.setDate(1 + (weekNumber - 1) * 7 - weekDay));

  // 주차의 끝 날짜 계산
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 6);

  return [startDate, endDate];
};

export const getWeeksOfMonth = (year: number, month: number) => {
  const weeks: string[] = [];
  const firstDay = moment(`${year}-${month.toString().padStart(2, "0")}-01`);
  const lastDay = firstDay.clone().endOf("month");

  let currentWeekStart = firstDay.clone().startOf("week");
  let currentWeekEnd = currentWeekStart.clone().endOf("week");

  while (currentWeekStart.isSameOrBefore(lastDay)) {
    weeks.push(`${currentWeekStart.format("MM-DD")} ~ ${currentWeekEnd.format("MM-DD")}`);
    currentWeekStart.add(1, "week");
    currentWeekEnd.add(1, "week");
  }

  return weeks;
};

export const getMonthRange = (year: number, month: number) => {
  const firstDay = moment(`${year}-${month.toString().padStart(2, "0")}-01`);
  const lastDay = firstDay.clone().endOf("month");
  return `${firstDay.format("MM-DD")} ~ ${lastDay.format("MM-DD")}`;
};
