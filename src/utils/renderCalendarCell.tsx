import { Expense, ExpenseCalendar } from '@/types/api'
import type { CellRenderInfo } from 'rc-picker/lib/interface'
import dayjs, { Dayjs } from 'dayjs'

const dateCellRender = (current: Dayjs, monthlyCalendar: ExpenseCalendar) => {
  const expenses = monthlyCalendar[current.date()]
  type Events = {
    id: string
    category: string
    amount: number
  }
  const events: Events[] = []
  expenses?.forEach(({ id, category, amount }) => {
    const isExist = events.find((event, i) => {
      if (event.category === category) {
        events[i].amount += amount
        return true
      }
      return false
    })
    if (!isExist) events.push({ id, category, amount })
  })

  return (
    <ul className="events">
      {events.map((expense) => (
        <li key={expense.id} className="overscroll-none">
          {expense.category}: {expense.amount.toLocaleString('ko-KR', { currency: 'KRW', style: 'currency' })}
        </li>
      ))}
    </ul>
  )
}

const monthCellRender = (current: Dayjs, fullExpenses: Expense[]) => {
  const curDate = current.format('YYYY-MM')
  type Events = {
    category: string
    totalAmount: number
  }
  const events: {
    [key: string]: Events
  } = {}
  fullExpenses?.forEach(({ id, category, amount, date }) => {
    const formattedDate = dayjs(date).format('YYYY-MM')
    if (!events[formattedDate]) {
      events[formattedDate] = {
        category,
        totalAmount: amount
      }
    } else {
      events[formattedDate].totalAmount += amount
    }
  })
  const totalAmount = events[curDate]?.totalAmount
  return (
    <div className="notes-month">
      <section>{totalAmount ? totalAmount.toLocaleString('ko-KR', { currency: 'KRW', style: 'currency' }) : 0}</section>
      <span>Total Amount</span>
    </div>
  )
}
// 반복문을 외부로 빼줘야함, 미리만든 객체를 먼스 객체로 전달  로딩 관련 훅스 만들어서 처리해야함
// 훅도 따로빼면 좋음 ... 기능우선
export const cellRender = (
  current: Dayjs,
  info: CellRenderInfo<Dayjs>,
  monthlyExpenses: ExpenseCalendar,
  fullExpenses: Expense[]
) => {
  if (info.type === 'date') return dateCellRender(current, monthlyExpenses)
  if (info.type === 'month') return monthCellRender(current, fullExpenses)
  return info.originNode
}
