export default function formatDateAndTime(dateString: string) {
  const date = new Date(dateString);
  const year = date.getUTCFullYear();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const day = date.getUTCDate().toString().padStart(2, '0');
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');

  const formattedDate = {
    date: `${year}년 ${month}월 ${day}일`,
    time: `${hours}:${minutes}`,
  };

  return formattedDate;
}
