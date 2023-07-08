const currMonth = new Date().getMonth() + 1;
const currYear = new Date().getFullYear();

export const getMonthLabels = (monthRange: number) => {
  // 2023년에서 마지막 숫자 3만 떼어서 12를 곱함
  const yearToMonth = Number(currYear.toString().at(3)) * 12;

  // 2020년 기준으로 얼마나 많은 달이 지났는 지를 개월수로 나타냄
  // 2021년 3월인 경우 1 * 12 + 3 = 15달이 나옴 === 2020년 + 15개월 === 2021년 + 3개월
  const startMonthAbs = yearToMonth + currMonth - monthRange + 1;

  const label = [];

  for (let i = 0; i < monthRange; i++) {
    const year =
      (startMonthAbs + i) % 12 === 0
        ? `202${Math.floor((startMonthAbs + i) / 12) - 1}`
        : `202${Math.floor((startMonthAbs + i) / 12)}`;
    const month =
      (startMonthAbs + i) % 12 === 0
        ? 12
        : (startMonthAbs + i) % 12 > 9
        ? `${(startMonthAbs + i) % 12}`
        : `0${(startMonthAbs + i) % 12}`;
    label.push(`${year}-${month}`);
  }

  return label;
};
