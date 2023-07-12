export interface MontlyExpensesType {
  [key: number]: DailyExpensesType[];
}
export interface DailyExpensesType {
  _id: string;
  amount: number;
  userId: string;
  category: string;
  date: string;
  __v: number;
}
