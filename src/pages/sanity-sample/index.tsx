import { useState } from 'react'
import Link from 'next/link'
import dayjs from 'dayjs'
import type {
  EditExpense,
  Expense,
  ExpenseCalendar,
  ExpensePeriod,
  ExpenseSummary,
  ExpenseRequestBody
} from '@/types/api'
import api from '@/clientAPI'
import useUserInfo from '@/hooks/useUserInfo'

// ! Warnning
// ! API를 사용하기 편하게 예시로 만들어 놓은 페이지 입니다.
// ! querySelector로 value를 가져오는 것은 빠르게 작성하려고 한 것이고,
// ! 실제로 구현하실 땐 반드시 정확한 타입을 입력하고(type assertion 하시면 안됩니다!) 상태 관리를 해주세요!

export default function Test() {
  const [allUserExpenses, setAllUserExpenses] = useState([])
  const [userExpensesByDate, setUserExpensesByDate] = useState([] as ExpenseSummary[])
  const [expenseCalendar, setExpenseCalendar] = useState({} as ExpenseCalendar)
  const [category, setCategory] = useState([])

  const [userInfo, isLoading] = useUserInfo()

  // * 1. 소비 기록 작성 API
  function addExpense(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = Array.from((e.target as HTMLFormElement).querySelectorAll('input'))
      .map((el, i) => {
        switch (i) {
          case 0:
            return el.value
          case 1:
            return Number(el.value)
          case 2:
            return el.value
        }
      })
      .filter((v) => v)
    const expenseForm: ExpenseRequestBody = {
      userId: userInfo.userId,
      category: data[0] as string,
      amount: data[1] as number,
      date: data[2] as string
    }
    api('/api/expense', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(expenseForm)
    })
      .then((res) => {
        alert(res.data.message)
      })
      .catch((error) => {
        alert(error.response.data.message)
      })
  }
  // * 2. 소비 품목 목록 API
  async function getCategoryByUserId(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault()
    const { data } = await api(`/api/categories?userId=${userInfo.userId}`)
    setCategory(data)
  }

  // * 3. 검색어에 해당하는 소비 항목 및 금액 조회 API
  async function getAllExpensesByCategory(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const searchQuery = (e.target as HTMLFormElement).querySelector('input')!.value
    const isChecked = ((e.target as HTMLFormElement).querySelector('input[type=checkbox]') as HTMLInputElement).checked
    let path = '/api/expenses/search?'
    if (searchQuery) path += `q=${searchQuery}&`
    if (isChecked) path += `userId=${userInfo.userId}&`

    const { data } = await api(path, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    console.log('검색어에 해당하는 소비 항목 및 금액 조회 API 응답 :', data)
    setAllUserExpenses(data)
  }

  // * 4. 일별, 주별, 월별 소비 조회 API
  async function searchExpensesByDate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const period = (e.target as HTMLFormElement).querySelector('select')!.value as ExpensePeriod
    const { data }: { data: ExpenseSummary[] } = await api(
      `/api/expenses/summary?period=${period}&userId=${userInfo.userId}`
    )
    console.log('일별, 주별, 월별 소비 조회 API 응답 : ', data)
    setUserExpensesByDate(data)
  }

  // * 5. 소비 기록 수정 API
  async function editExpense(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const editableExpense = Array.from((e.target as HTMLFormElement).querySelectorAll('input')).map((el, i) => {
      return el.value ? el.value : ''
    })

    const expenseForm: EditExpense = {
      userId: userInfo.userId
    }

    expenseForm['id'] = editableExpense[0] // id는 require feild임니다
    if (editableExpense[1]) expenseForm['category'] = editableExpense[1]
    if (editableExpense[2]) expenseForm['amount'] = Number(editableExpense[2])
    if (editableExpense[3]) expenseForm['date'] = editableExpense[3]

    const { id: expenseId, ...restForm } = expenseForm

    api(`/api/expense/${expenseId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(restForm)
    })
      .then((res) => {
        alert(res.data.message)
      })
      .catch((error) => {
        alert(error.response.data.message)
      })
  }

  // * 6. 소비 기록 삭제 API
  function deleteExpense(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const expenseId = (e.target as HTMLFormElement).querySelector('input')!.value
    api(`/api/expense/${expenseId}`, {
      method: 'DELETE'
    })
      .then((res) => {
        alert(res.data.message)
      })
      .catch((error) => {
        alert(error.response.data.message)
      })
  }

  // * 7. 소비 기록 달력 호출 API
  async function searchExpensesCalendar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const year = ((e.target as HTMLFormElement).querySelector('.year') as HTMLInputElement).value
    const month = ((e.target as HTMLFormElement).querySelector('.month') as HTMLInputElement).value
    const { data }: { data: ExpenseCalendar } = await api(
      `/api/expenses/calendar?year=${year}&month=${month}&userId=${userInfo.userId}`,
      {
        method: 'GET'
      }
    )
    console.log('소비 기록 달력 호출 API 응답 :', data)
    setExpenseCalendar(data)
  }
  if (isLoading) return <div>loading...</div>

  return (
    <main className="pr-12 pl-12 pb-32">
      <h1 className="text-4xl">
        <Link href="/">Sanity Test Page</Link>
      </h1>
      <section className="flex items-center justify-center flex-col">
        <h2 className="mb-5">{`logged in User name : ${userInfo.name}`}</h2>
        <h2 className="mb-5">{`logged in User email : ${userInfo.email}`}</h2>
        {/*  eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${userInfo.image}`} alt="user image" className="w-full max-w-[60px] rounded-[30px]" />
      </section>
      <section className="mt-12">
        <h3 className="text-2xl">지출 추가하기</h3>
        <form onSubmit={addExpense}>
          {/* selector로 카테고리 목록을 제공해주거나 추가할 수 있어야 합니다. */}
          <input type="text" placeholder="enter a category" />
          <input type="text" placeholder="enter a amount" />
          <input type="date" />
          <input className="pl-5 cursor-pointer" type="submit" value="Add Expense" />
        </form>
      </section>
      <section className="mt-12">
        <h3 className="text-2xl">소비 품목 목록</h3>
        <button type="button" onClick={getCategoryByUserId}>
          클릭시 사용자의 모든 카테고리를 출력합니다.
        </button>
        <ul>
          {category &&
            category.map((cate: string) => {
              return <li key={cate}>{cate}</li>
            })}
        </ul>
      </section>
      <section className="mt-12">
        <h3 className="text-2xl">수정 하기</h3>
        <form onSubmit={editExpense}>
          <input type="text" placeholder="id" />
          <input type="text" placeholder="category" />
          <input type="text" placeholder="amount" />
          <input type="date" />
          <input className="pl-5 cursor-pointer" type="submit" value="Edit Expense" />
        </form>
      </section>
      <section className="mt-12">
        <h3 className="text-2xl">삭제하기</h3>
        <form onSubmit={deleteExpense}>
          <input type="text" placeholder="id" />
          <input className="pl-5 cursor-pointer" type="submit" value="Edit Expense" />
        </form>
      </section>
      <section className="mt-12">
        <h3 className="text-2xl">검색 쿼리로 모든 지출 가져오기</h3>
        <form onSubmit={getAllExpensesByCategory}>
          <input type="text" placeholder="enter a search query" />
          <input type="checkbox" />
          <input className="pl-5 cursor-pointer" type="submit" value="search" />
        </form>
        <ul>
          {allUserExpenses &&
            allUserExpenses.map((expense: Expense) => {
              return (
                <li key={expense.id} className="mt-4">
                  <p>{`id : ${expense.id}`}</p>
                  <p>{`userId : ${expense.userId}`}</p>
                  <span>{`cateogry : ${expense.category} & `}</span>
                  <span>{`${expense.amount} 원 &`}</span>
                  <span>{` Date : ${expense.date} `}</span>
                </li>
              )
            })}
        </ul>
      </section>
      <section className="mt-12">
        <h3 className="text-2xl">일별 주별 월별 소비 조회</h3>
        <form onSubmit={searchExpensesByDate}>
          <select defaultValue="daily">
            <option value="daily">daily</option>
            <option value="weekly">weekly</option>
            <option value="monthly">monthly</option>
          </select>
          <input className="pl-5 cursor-pointer" type="submit" value="Submit" />
        </form>
        <ul>
          {userExpensesByDate &&
            userExpensesByDate.map((ex) => {
              return (
                <li key={ex._id}>
                  <span>{`${ex._id} & `}</span>
                  <span>{ex.totalAmount}</span>
                </li>
              )
            })}
        </ul>
      </section>
      <section className="mt-12">
        <h3 className="text-2xl">소비 기록 달력 호출</h3>
        <form onSubmit={searchExpensesCalendar}>
          <input className="year" type="text" placeholder="year (YYYY)" />
          <input className="month" type="text" placeholder="month (MM)" />
          <input className="pl-5 cursor-pointer" type="submit" value="Submit" />
        </form>
      </section>
      {expenseCalendar &&
        Object.entries(expenseCalendar).map(([key, value]) => {
          return (
            <ul key={key}>
              <h4 className="text-xl">{`${key} 일의 지출 내역`}</h4>
              {expenseCalendar[key].map((ex) => {
                return (
                  <li key={ex.id}>
                    <span>{ex.category}</span>
                    <span className="ml-4">{dayjs(ex.date).format('YYYY-MM-DDTHH:mm:ss')}</span>
                    <span className="ml-4">
                      {ex.amount.toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' })}
                    </span>
                  </li>
                )
              })}
            </ul>
          )
        })}
    </main>
  )
}
