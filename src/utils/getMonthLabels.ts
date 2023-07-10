const currMonth = new Date().getMonth() + 1;
const currYear = new Date().getFullYear();

export const getMonthLabels = (monthRange: number) => {
  // 2023년에서 마지막 숫자 3만 떼어서 12를 곱함
  const yearToMonth = (currYear % 10) * 12;

  let year = Math.floor((yearToMonth + currMonth - monthRange + 1) / 12);
  let month = (yearToMonth + currMonth - monthRange + 1) % 12;

  const labels = [];

  for (let i = 0; i < monthRange; i++) {
    if (month > 12) {
      month = month % 12;
      year++;
    }
    const label = `202${year}-${month.toString().padStart(2, '0')}`;
    labels.push(label);
    month++;
  }
  return labels;
};
