import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import { useCalendarStore } from '@/store/calenderStore'
import useUserInfo from '@/hooks/useUserInfo'
const Alert = dynamic(() => import('antd').then((mod) => mod.Alert), { ssr: false })
const Calendar = dynamic(() => import('antd').then((mod) => mod.Calendar), { ssr: false })
const Card = dynamic(() => import('antd').then((mod) => mod.Card), { ssr: false })

export default function CalendarPage() {
  const { monthlyExpenses, getCalendar, getFullExpenses } = useCalendarStore()
  const [date, setDate] = useState<string>(dayjs().format('YYYY-MM-DD'))

  const [userInfo] = useUserInfo()
  const userId = userInfo.userId

  useEffect(() => {
    if (!userId) return
    getFullExpenses(userId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId])

  useEffect(() => {
    getCalendar(dayjs(date).year(), dayjs(date).month() + 1, userId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, dayjs(date).month()])

  // * Set the Current Date from Calendar
  const setDateValue = (selectedDate: Dayjs) => {
    setDate(selectedDate.format('YYYY-MM-DD'))
  }

  return (
    <div className="flex max-w-[1200px] my-8 mx-auto">
      {/* 달력 */}
      <div style={{ flex: 2 }}>
        <Calendar
          value={dayjs(date)}
          // cellRender를 수정합니다.
          cellRender={(current, info) => {
            const selectedDateExpenses =
              monthlyExpenses && monthlyExpenses[dayjs(current).date()] ? monthlyExpenses[dayjs(current).date()] : []

            const selectedDateTotalAmount = selectedDateExpenses.reduce((acc, expense) => acc + expense.amount, 0)

            // 날짜가 0원이거나 데이터가 없을 경우 null을 반환하여 표시하지 않습니다.
            if (selectedDateTotalAmount === 0 || selectedDateExpenses.length === 0) {
              return null
            }

            return (
              <div className="ant-fullcalendar-date" key={current.date()}>
                <div className="ant-fullcalendar-value" style={{ textAlign: 'right' }}>
                  {selectedDateTotalAmount.toLocaleString('ko-KR', {
                    currency: 'KRW',
                    style: 'currency'
                  })}
                </div>
              </div>
            )
          }}
          onPanelChange={setDateValue}
          onSelect={setDateValue}
        />
      </div>

      {/* 카드 */}
      <div style={{ flex: 0.6, marginLeft: '20px', marginTop: '10px' }}>
        <div style={{ textAlign: 'center', fontSize: '20px', marginBottom: '20px' }}>
          <Alert message={`You selected date: ${dayjs(date).format('YYYY-MM-DD')}`} />
        </div>

        {monthlyExpenses && monthlyExpenses[dayjs(date).date()] && (
          <div style={{ fontSize: '16px', paddingLeft: '20px' }}>
            <Card style={{ width: '100%' }}>
              {monthlyExpenses[dayjs(date).date()].map((expense) => (
                <div key={expense.id}>
                  <p>
                    <strong>{expense.category}</strong>:{' '}
                    {expense.amount.toLocaleString('ko-KR', { currency: 'KRW', style: 'currency' })}
                  </p>
                </div>
              ))}
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
