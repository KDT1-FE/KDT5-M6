export interface MontlyExpensesType {
  [key: string]: DailyExpensesType[];
}
export interface DailyExpensesType {
  _id: string;
  amount: number;
  userId: string;
  category: string;
  date: string;
  __v: number;
}
