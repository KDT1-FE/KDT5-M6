export interface MonthlyExpenseType {
  [key: string]: DailyExpenseType[];
}

export interface DailyExpenseType {
  key: string;
  time: string;
  _id: string;
  amount: number;
  userId: string;
  category: string;
  date: string;
  __v: number;
}
