export default function formatDateAndTime(dateString: string) {
  const date = new Date(dateString);
  const year = date.getUTCFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  const formattedDate = {
    date: `${year}년 ${month}월 ${day}일`,
    time: `${hours}:${minutes}`,
  };

  return formattedDate;
}
