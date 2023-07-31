import React, { useState, useEffect, Suspense } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import useUserInfo from '@/hooks/useUserInfo'
import api from '@/clientAPI'
import { Expense, ExpenseRequestBody } from '@/types/api'

import { DatePicker } from '@/components/Landing/DatePicker'
import { Input } from '@/components/Landing/Input'
import { Button } from '@/components/Landing/Button'
import { Card } from '@/components/Landing/Card'
import { Modal } from '@/components/Landing/Modal'
import { Form } from '@/components/Landing/Form'

export default function LandingPage() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [date, setDate] = useState<string | null>(null)
  const [category, setCategory] = useState('')
  const [amount, setAmount] = useState('')
  const [searchKeyword, setSearchKeyword] = useState('')
  const [userinfo, isLoading, isLoggedIn] = useUserInfo()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null)
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)

  useEffect(() => {
    if (isLoading || !userinfo.name) return
    fetchExpenses()
  }, [userinfo.userId, isLoading])

  const fetchExpenses = async () => {
    let url = `/api/expenses/search?userId=${userinfo.userId}`
    if (searchKeyword) url += `&q=${encodeURIComponent(searchKeyword)}`
    const { data } = await api<Expense[]>(url)
    const sortedExpenses = data.sort((a, b) => {
      return dayjs(b.date).valueOf() - dayjs(a.date).valueOf()
    })
    setExpenses(sortedExpenses)
  }

  const searchExpenses = async () => {
    fetchExpenses()
  }

  const handleDateChange = (selectedDate: Dayjs | null) => {
    setDate(selectedDate?.format('YYYY-MM-DD') ?? null)
  }

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(event.target.value)
  }

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value)
  }

  const handleSearchKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value)
  }

  const addExpense = async () => {
    if (!date || amount.trim() === '') {
      alert('날짜, 분류, 금액을 모두 입력해주세요.')
      return
    }
    const newCategoryValue = category.trim() === '' ? '미지정' : category
    const newExpense: ExpenseRequestBody = {
      userId: userinfo.userId,
      amount: parseInt(amount),
      category: newCategoryValue,
      date
    }
    try {
      const response = await fetch('/api/expense', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newExpense)
      })

      if (response.ok) {
        setDate(null)
        setCategory('')
        setAmount('')
        fetchExpenses()
      }
    } catch (error) {
      alert('소비 기록 추가에 실패했습니다.')
    }
  }

  const updateExpense = async (expenseId: string, updatedExpense: Expense) => {
    try {
      const response = await fetch(`/api/expense/${expenseId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedExpense)
      })
      if (response.ok) {
        fetchExpenses()
        closeModal()
      }
    } catch (error) {
      alert('소비 기록 수정에 실패했습니다.')
    }
  }

  const deleteExpense = async (expenseId: string) => {
    try {
      const response = await fetch(`/api/expense/${expenseId}`, {
        method: 'DELETE'
      })
      if (response.ok) {
        fetchExpenses()
        closeDeleteModal()
      }
    } catch (error) {
      alert('소비 기록 삭제에 실패했습니다.')
    }
  }

  const openModal = (expense: Expense) => {
    setSelectedExpense(expense)
    setIsModalVisible(true)
  }

  const closeModal = () => {
    setSelectedExpense(null)
    setIsModalVisible(false)
  }

  const openDeleteModal = (expense: Expense) => {
    setSelectedExpense(expense)
    setIsDeleteModalVisible(true)
  }

  const closeDeleteModal = () => {
    setSelectedExpense(null)
    setIsDeleteModalVisible(false)
  }

  const handleUpdateExpense = () => {
    if (!selectedExpense) return

    const updatedExpense: Expense = {
      id: selectedExpense.id,
      userId: selectedExpense.userId,
      amount: parseInt(amount),
      category,
      date
    }
    updateExpense(selectedExpense.id, updatedExpense)
  }

  const handleDeleteExpense = () => {
    if (!selectedExpense) return
    deleteExpense(selectedExpense.id)
  }

  return (
    <div className="max-w-[1200px] w-full m-auto p-8">
      <div className="flex items-center justify-between p-5 border bg-forsythia rounded-full flex-col gap-5 md:flex-row">
        <Form onFinish={addExpense}>
          <DatePicker className="mr-2" onChange={handleDateChange} value={date ? dayjs(date) : null} />
          <Input
            className="w-48 mr-2"
            type="string"
            value={category}
            onChange={handleCategoryChange}
            placeholder="분류"
          />

          <Input
            //
            className="w-48 mr-2"
            type="number"
            value={amount}
            onChange={handleAmountChange}
            placeholder="금액"
          />
          <Button
            //
            htmlType="submit"
            className="bg-white boder border-gray "
            onSubmit={addExpense}
            onClick={addExpense}
          >
            추가
          </Button>
        </Form>
        <Form onFinish={searchExpenses}>
          <Input
            className="w-48 mr-2"
            value={searchKeyword}
            onChange={handleSearchKeywordChange}
            placeholder="검색어"
          />
          <Button htmlType="submit" className="bg-white boder border-gray" onClick={searchExpenses}>
            검색
          </Button>
        </Form>
      </div>

      <h2 className="my-8 text-2xl">지출 내역 리스트</h2>
      {!isLoading && !isLoggedIn && <div>구글 로그인 후 해당 서비스를 이용해주세요 :)</div>}
      <ul>
        {expenses.map((expense) => (
          <Card key={expense.id}>
            <div className="flex gap-2 items-center">
              <div className="w-1/7 border rounded p-2">날짜: {expense.date}</div>
              <div className="w-1/6 ">분류: {expense.category}</div>
              <div className="w-1/6">
                금액: {expense.amount.toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' })}
              </div>
              <div className="flex grow" />
              <Button onClick={() => openModal(expense)}>수정</Button>
              <Button onClick={() => openDeleteModal(expense)}>삭제</Button>
            </div>
          </Card>
        ))}
      </ul>

      <Modal
        title="소비 기록 수정"
        open={isModalVisible}
        onCancel={closeModal}
        onOk={handleUpdateExpense}
        destroyOnClose
        okButtonProps={{ style: { background: '#1890ff', borderColor: '#1890ff' } }}
      >
        {selectedExpense && (
          <div className="flex">
            <DatePicker onChange={handleDateChange} value={date ? dayjs(date) : null} />
            <Input
              //
              className="w-48"
              value={category}
              onChange={handleCategoryChange}
              placeholder="분류"
            />
            <Input
              //
              className="w-48"
              type="number"
              value={amount}
              onChange={handleAmountChange}
              placeholder="금액"
            />
          </div>
        )}
      </Modal>

      <Modal
        title="소비 기록 삭제"
        open={isDeleteModalVisible}
        onCancel={closeDeleteModal}
        onOk={handleDeleteExpense}
        destroyOnClose
        okButtonProps={{ style: { background: '#1890ff', borderColor: '#1890ff' } }}
      >
        <p>정말 삭제하시겠습니까?</p>
      </Modal>
    </div>
  )
}
