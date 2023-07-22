export interface ExpenseData {
  amount: number;
  userId: string;
  category: string;
  date: string;
}

export interface Calendar extends ExpenseData {
  _id: string;
}

export interface TotalAmount {
  _id: string;
  totalAmount: number;
}
