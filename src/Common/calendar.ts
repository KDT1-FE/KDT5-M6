// const YMD = new Date();
//const year = YMD.getFullYear();

export default function generateCalendar(year: number, month: number) {
  const prevDates = new Date(year, month - 1, 0);
  const lastDates = new Date(year, month, 0);

  let beforeDates = [];
  for (let i = 0; i < prevDates.getDay() + 1; i++) {
    beforeDates.unshift(prevDates.getDate() - i);
  }

  let nextDates = [];
  for (let i = 1; i < 7 - lastDates.getDay(); i++) {
    if (i === 0) {
      return nextDates;
    }
    nextDates.push(i);
  }

  let thisDates = [];
  thisDates = [...Array(lastDates.getDate() + 1).keys()].slice(1);

  return beforeDates.concat(thisDates, nextDates);
}
