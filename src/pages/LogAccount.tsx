import styled from 'styled-components'
import { useState, KeyboardEvent } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import dayjs, { Dayjs } from 'dayjs'
import { ArrowLeftIcon } from '@heroicons/react/outline'
import { logExpense } from '@/api/LogAccount'
import { getMonthlyExpenses } from 'src/api/MonthlyExpenses'

export const LogAccount = () => {
  const id = localStorage.getItem('id')
  const USERID = `team9-${id}`

  const now = dayjs()
  const [today] = useState(now)
  const [expense, setExpense] = useState('')
  const [account, setAccount] = useState('')
  const [selectAmount, setselectAmount] = useState(true)
  const [selectCategory, setselectCategory] = useState('카테고리')
  const [date, setDate] = useState<Dayjs | null>(dayjs(today))
  const [time, setTime] = useState<Dayjs | null>(dayjs(today))

  const navigate = useNavigate()
  const [thisMonth] = useState(now.format('YYYY.MM.DD'))

  const inputNumberFormat = (event: KeyboardEvent<HTMLInputElement>) => {
    setExpense(comma(uncomma(event.currentTarget.value)))
  }

  const comma = (str: string) => {
    str = String(str)
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')
  }

  const uncomma = (str: string) => {
    str = String(str)
    return str.replace(/[^\d]+/g, '')
  }

  const handleChangeExpenseInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setExpense(event.target.value)
  }

  const handleChangeAccountInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAccount(event.target.value)
  }

  const handleClickAmount = () => {
    setselectAmount(!selectAmount)
  }

  const handleSelectCategory = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setselectCategory(event.target.value)
  }

  const getExpenses = async () => {
    try {
      const year: number = Number(thisMonth.slice(0, 4))
      const month: number = Number(thisMonth.slice(5, 7))
      await getMonthlyExpenses(year, month, USERID)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const handleClickSaveButton = () => {
    let calculatedAmount = 0
    if (selectAmount) {
      calculatedAmount = -1 * Number(uncomma(expense))
    } else {
      calculatedAmount = Number(uncomma(expense))
    }

    const totalCategory = selectCategory + '.' + account
    const dateFormat = dayjs(date).format('YYYY-MM-DD')
    const timeFormat = dayjs(time).format('HH:mm:ss')
    const fullDate = String(dayjs(dateFormat + timeFormat).add(9, 'hour'))

    if (
      calculatedAmount !== 0 &&
      selectCategory !== '카테고리' &&
      account.length > 0
    ) {
      requestAddExpense(calculatedAmount, USERID, totalCategory, fullDate)
      navigate('/')
      getExpenses()
    } else {
      alert('빠진 항목 없이 입력해주세요.')
    }
  }

  const requestAddExpense = async (
    expense: number,
    userid: string,
    category: string,
    date: string
  ) => {
    await logExpense(expense, userid, category, date)
  }

  return (
    <Container>
      <Header>
        <NavLink to="/">
          <ArrowLeftIcon />
        </NavLink>
        지출/수입 입력
      </Header>
      <Wrapper>
        <ExpenseBoard>
          <input
            type="text"
            value={expense}
            onChange={handleChangeExpenseInput}
            onKeyUp={inputNumberFormat}
          />
          <span className="monetary-unit">원</span>
        </ExpenseBoard>
        <ExpenseInputs>
          <ExpenseInputRow>
            <span className="label">분류</span>
            <AmountButton
              onClick={handleClickAmount}
              className={selectAmount ? 'active' : ''}>
              지출
            </AmountButton>
            <AmountButton
              onClick={handleClickAmount}
              className={selectAmount ? '' : 'active'}>
              수입
            </AmountButton>
          </ExpenseInputRow>
          <ExpenseInputRow>
            <span className="label">카테고리</span>
            <select
              name=""
              id=""
              onChange={handleSelectCategory}>
              <option value="카테고리">카테고리</option>
              <option value="식비">식비</option>
              <option value="생활/건강">생활/건강</option>
              <option value="쇼핑">쇼핑</option>
              <option value="교통">교통</option>
              <option value="주거/통신">주거/통신</option>
              <option value="금융">금융</option>
              <option value="문화/여가">문화/여가</option>
              <option value="교육/학습">교육/학습</option>
              <option value="자녀/육아">자녀/육아</option>
              <option value="경조/선물">경조/선물</option>
            </select>
          </ExpenseInputRow>
          <ExpenseInputRow>
            <span className="label">사용처</span>
            <input
              className="account-input"
              type="text"
              onChange={handleChangeAccountInput}
            />
          </ExpenseInputRow>
          <ExpenseInputRow>
            <span className="label">날짜</span>
            <ThemeProvider theme={theme}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDatePicker
                  className="date-picker"
                  format="YYYY-MM-DD"
                  defaultValue={date}
                  onChange={newValue => setDate(newValue)}
                />
              </LocalizationProvider>
            </ThemeProvider>
          </ExpenseInputRow>
          <ExpenseInputRow>
            <span className="label">시간</span>
            <ThemeProvider theme={theme}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileTimePicker
                  className="time-picker"
                  defaultValue={time}
                  onChange={newValue => setTime(newValue)}
                />
              </LocalizationProvider>
            </ThemeProvider>
          </ExpenseInputRow>
        </ExpenseInputs>
        <SaveButton onClick={handleClickSaveButton}>저장</SaveButton>
      </Wrapper>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Header = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 768px;
  height: 64px;
  background-color: ${props => props.theme.colors.primary};
  font-size: 18px;
  color: #fff;
  svg {
    position: absolute;
    left: 10px;
    width: 32px;
    height: 32px;
    margin-top: -16px;
    color: #fff;
  }
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 1rem;
  background-color: #fff;
  font-family: 'TheJamsil3Regular';
`

const ExpenseBoard = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 768px;
  height: 120px;
  padding: 30px;
  margin-bottom: 5px;
  background-color: #fff;
  input {
    width: 100%;
    border: none;
    background-color: transparent;
    font-size: 40px;
    text-align: right;
    color: ${props => props.theme.colors.text_secondary};
    border-bottom: 2px solid #777777;
    &:focus {
      outline: none;
    }
  }
  .monetary-unit {
    font-size: 35px;
    color: #777777;
  }
`
const ExpenseInputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 768px;
  height: 100%;
  padding: 20px;
  background-color: #fff;
`
const ExpenseInputRow = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  max-width: 768px;
  .label {
    width: 120px;
    flex-shrink: 0;
    color: ${props => props.theme.colors.text_secondary};
    @media ${props => props.theme.tablet} {
      font-size: 16px;
    }
    @media ${props => props.theme.laptop} {
      font-size: 18px;
    }
    @media ${props => props.theme.desktop} {
      font-size: 18px;
    }
  }
  .account-input {
    height: 45px;
    width: 100%;
    padding: 5px;
    padding-left: 15px;
    border: 1px solid #c4c4c4;
    border-radius: 4px;
    font-family: 'TheJamsil1Thin';
    font-weight: 600;
    color: ${props => props.theme.colors.text_secondary};
    &:hover {
      border: 1px solid #212121;
    }
    &:focus {
      border: 1px solid ${props => props.theme.colors.orange};
      outline: 1px solid ${props => props.theme.colors.orange};
    }
  }
  select {
    height: 55px;
    width: 100%;
    padding-left: 10px;
    border: 1px solid #c4c4c4;
    border-radius: 4px;
    font-family: 'TheJamsil1Thin';
    font-weight: 600;
    &:focus {
      border: 1px solid ${props => props.theme.colors.orange};
      outline: 1px solid ${props => props.theme.colors.orange};
    }
  }
  .date-picker {
    width: 100%;
  }
  .time-picker {
    width: 100%;
  }
`
const AmountButton = styled.button`
  width: 100px;
  height: 55px;
  margin-right: 5px;
  border-radius: 36px;
  border: none;
  background-color: ${props => props.theme.colors.background};
  font-family: 'TheJamsil3Regular';
  font-size: 16px;
  color: ${props => props.theme.colors.text_secondary};
  cursor: pointer;
  @media ${props => props.theme.tablet} {
    font-size: 16px;
  }
  @media ${props => props.theme.laptop} {
    font-size: 18px;
  }
  @media ${props => props.theme.desktop} {
    font-size: 18px;
  }
  &.active {
    border: 2px solid ${props => props.theme.colors.primary};
    background-color: ${props => props.theme.colors.primary};
    color: #fff;
  }
`
const SaveButton = styled.button`
  width: 80%;
  max-width: calc(768px * 0.8);
  height: 64px;
  margin-top: 2rem;
  background-color: ${props => props.theme.colors.text_secondary};
  font-family: 'TheJamsil3Regular';
  font-size: 18px;
  color: #fff;
  border: none;
  border-radius: ${props => props.theme.borderRadius};
  cursor: pointer;
  &:hover {
    color: ${props => props.theme.colors.third};
  }
  @media ${props => props.theme.tablet} {
    font-size: 20px;
  }
  @media ${props => props.theme.laptop} {
    font-size: 20px;
  }
  @media ${props => props.theme.desktop} {
    font-size: 20px;
  }
`
const theme = createTheme({
  palette: {
    primary: {
      main: '#fda363',
      dark: '#fda363',
      contrastText: '#fff'
    },
    secondary: {
      main: '#fda363',
      contrastText: '#fff'
    }
  }
})
