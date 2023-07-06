// 공용 함수 모음

// 날짜 포맷 변경 함수
// ex) "2023-07-01T10:30:00.000Z" -> 2023. 7. 1
const formatDate = (date: string) => {
  const newDate = new Date(date).toLocaleDateString();
  return newDate;
};

export { formatDate };
