export type SanityUserInfoResponse = {
  _rev: string
  _type: string
  name: string
  _id: string
  _updatedAt: string
  email: string
  image: string
  _createdAt: string
}

export type SanityExpenseResponse = {
  _createdAt: string
  _id: string
  _rev: string
  _type: string
  _updatedAt: string
  amount: number
  category: string
  date: string
  user: {
    _ref: string
    _type: string
  }
}

type RequestBody = {
  userId : string
  amount : number
  category : string
  date : string
}

export type User = {
  userId: string
  name: string
  email: string
  image: string
}

export type Expense = {
  id: string
  userId: string
  category: string
  amount: number
  date: string | null
}

export type ExpenseImage = {
  image: string
}
export type ExpenseSummary = {
  _id: string
  totalAmount: number
}

export type ExpenseRequestBody = Omit<Expense, 'id'>

export type ExpensePeriod = 'daily' | 'weekly' | 'monthly'

export type EditExpense = Partial<Expense> & {
  userId: string
}

export type ExpenseCalendar = {
  [key: string]: Expense[]
}
