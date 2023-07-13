export function formatPaymentDate(date: string): string {
  const parsedDate = new Date(date);
  const year = parsedDate.getFullYear().toString().slice(2);
  const month = (parsedDate.getMonth() + 1).toString().padStart(2, '0');
  const day = parsedDate.getDate().toString().padStart(2, '0');
  const hour = parsedDate.getHours().toString().padStart(2, '0');
  const minute = parsedDate.getMinutes().toString().padStart(2, '0');

  const formattedDate = `${year}년 ${month}월 ${day}일 ${hour}:${minute}`;

  return formattedDate;
}
