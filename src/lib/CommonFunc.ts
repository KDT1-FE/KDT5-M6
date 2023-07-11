// 공용 함수 모음

// 날짜 포맷 변경 함수
// ex) "2023-07-01T10:30:00.000Z" -> 2023. 7. 1
const formatDate = (date: string) => {
  const newDate = new Date(date)
    .toISOString()
    .split('T')[0]
    .split('-')
    .join('. ');
  return newDate;
};

const formatDateKrISO = (date: Date) => {
  const newDate = new Date(date);
  const offset = newDate.getTimezoneOffset() * 60000;
  const formattedDate = new Date(newDate.getTime() - offset).toISOString();
  return formattedDate;
};

export { formatDate, formatDateKrISO };
