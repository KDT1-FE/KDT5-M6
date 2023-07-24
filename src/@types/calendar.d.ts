declare interface CalendarProps {
  month: number;
  year: number;
  setMonth: (param: number) => void;
  setYear: (param: number) => void;
}

declare interface ResponseCalendar {
  /** 날짜 */
  _id: string;
  /** 날짜별 총 금액 */
  totalAmount: number;
}

declare type CalendarMap = [string, number];

declare type Props = CalendarProps & {
  today: number;
  setToday: (param: number) => void;
  category: string;
  backgroundColor: string;
};