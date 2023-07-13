export function formatPaymentDate(date: string): string {
  const formattedDate = new Date(date).toLocaleDateString('ko-KR', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return formattedDate;
}
