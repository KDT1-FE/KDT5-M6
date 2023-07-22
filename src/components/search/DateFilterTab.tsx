import moment from 'moment'
import React, { useMemo, useState } from 'react'
import { getWeekStartEndDate, getMonthStartEndDate } from 'utils/index'
import { styled } from 'styled-components'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

// const types = ['전체', '이번 주', '이번 달', '사용자지정']
type DateFilterTabProps = {
  onSelectDateFilter: (startDate: string, endDate: string) => void
}

export const DateFilterTab = React.memo(({ onSelectDateFilter }: DateFilterTabProps) => {
  const today = moment().format('YYYY-MM-DD')
  const types = new Map()
  types.set('전체', `~ ${today}`)
  types.set('이번 주', getWeekStartEndDate())
  types.set('이번 달', getMonthStartEndDate())
  types.set('사용자지정', '')

  const [active, setActive] = useState<string>('전체')
  const [isOpen, setIsOpen] = useState(false)
  const [startDate, setStartDate] = useState<Date | null>(new Date())
  const [endDate, setEndDate] = useState<Date | null>(null)

  const clearDate = () => {
    setStartDate(null)
    setEndDate(null)
  }

  const onChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
    if (start && end) setIsOpen(false)
  }

  const handleTabChange = (tab: string) => {
    setActive(tab)
    clearDate()
    setIsOpen(tab === '사용자지정')
  }

  const selectedDate = useMemo(() => {
    if (active === '사용자지정') {
      if (startDate && endDate) {
        const startStr = moment(startDate).format('YYYY-MM-DD')
        const endStr = moment(endDate).format('YYYY-MM-DD')
        onSelectDateFilter(startStr, endStr)
        return `${startStr} ~ ${endStr}`
      }
      return ''
    }
    const startStr = types.get(active).split('~ ')[0].trim()
    const endStr = types.get(active).split('~ ')[1].trim()

    onSelectDateFilter(startStr, endStr)
    return types.get(active)
  }, [active, startDate, endDate])

  return (
    <div>
      <TabWrapper>
        <p>기간</p>
        <TabGroup>
          {Array.from(types.entries()).map(type => (
            <Tab
              key={type[0]}
              active={active === type[0]}
              onClick={() => handleTabChange(type[0])}>
              {type[0]}
            </Tab>
          ))}
          {isOpen && (
            <Calendar>
              <DatePicker
                selected={startDate}
                onChange={onChange}
                maxDate={new Date()}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                inline
                showDisabledMonthNavigation
                open={false}
              />
            </Calendar>
          )}
        </TabGroup>
      </TabWrapper>

      <SelectedDate>{selectedDate}</SelectedDate>
    </div>
  )
})

const TabWrapper = styled.div`
  display: flex;
  gap: 40px;
  align-items: center;
  font-size: 18px;
  margin-top: 20px;

  p {
    padding: 10px 5px 13px;
    color: #555;
  }
`

const TabGroup = styled.div`
  display: flex;
  gap: 20px;
  position: relative;
`

const Tab = styled.button<{ active: boolean }>`
  padding: 5px 10px;
  cursor: pointer;
  opacity: 0.8;
  background: white;
  border: 0;
  outline: 0;
  border-bottom: 3px solid transparent;
  transition: ease border-bottom 250ms;
  font-size: 18px;
  color: #333;

  ${({ active }) =>
    active &&
    `
    font-weight: 600;
    border-bottom: 3px solid var(--color-primary);
    opacity: 1;
    color: var(--color-primary);
    `}
`

const SelectedDate = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 20px 80px;
  font-size: 18px;
`

const Calendar = styled.div`
  z-index: 9;
  position: absolute;
  right: 0;
  top: 40px;
`
