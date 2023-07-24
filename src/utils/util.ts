export const formatDate = (dateString: string) => {
  const date = new window.Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  let hours = String(date.getHours());
  let minutes = String(date.getMinutes());
  let period = "오전";

  if (date.getHours() >= 12) {
    period = "오후";
    hours = String(date.getHours() - 12);
  }
  hours = hours.padStart(2, "0");
  minutes = minutes.padStart(2, "0");

  return `${year}-${month}-${day} ${period} ${hours}:${minutes}`;
};
