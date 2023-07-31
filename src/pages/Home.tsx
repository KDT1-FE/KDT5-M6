import { MenuIcon, CalendarIcon, ViewListIcon } from '@heroicons/react/outline'
import { ChartPieIcon } from '@heroicons/react/solid'
import styled from 'styled-components'
import dayjs from 'dayjs'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMonthlyExpenses, MonthlyExpenses } from 'src/api/MonthlyExpenses'
import { SlideMenu } from '@/components/home/SlideMenu'
import axios from 'axios'

export const Home = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  let id = localStorage.getItem('id')

  const [monthAmount, setMonthAmount] = useState<MonthlyExpenses[]>([])

  const now = dayjs()
  const [thisMonth] = useState(now.format('YYYY.MM.DD'))
  const [today] = useState(thisMonth.slice(-2))
  const [currentTab, clickTab] = useState(0)
  const [isMenuOpen, setisMenuOpen] = useState(false)

  const [todayExpense, settodayExpense] = useState(0)
  const [todayIncome, settodayIncome] = useState(0)
  const [thisMonthExpense, setthisMonthExpense] = useState(0)
  const [thisMonthIncome, setthisMonthIncome] = useState(0)

  //사용자 아이디 받아오기
  const headers = {
    'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
  const request = axios.create({
    baseURL: 'https://kapi.kakao.com/',
    headers
  })
  const getUserid = async () => {
    try {
      const { data } = await request.get('/v2/user/me')
      localStorage.setItem('id', data.id)
      id = localStorage.getItem('id')
      getExpenses(id)
      return data
    } catch (error) {
      console.warn(error)
      console.warn('fail')
      alert('로그인이 필요합니다')
      navigate('/signin')
      return false
    }
  }

  const getExpenses = async id => {
    try {
      const year: number = Number(thisMonth.slice(0, 4))
      const month: number = Number(thisMonth.slice(5, 7))
      const res = await getMonthlyExpenses(year, month, `team9-${id}`)
      setMonthAmount(res)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    if (token && !id) {
      getUserid()
    }
  }, [])

  //월 데이터 받아오기
  useEffect(() => {
    if (id) {
      getExpenses(id)
    }
  }, [])

  const tabList = [
    {
      name: '지출',
      month: thisMonthExpense.toLocaleString('ko-KR'),
      today: todayExpense.toLocaleString('ko-KR')
    },
    {
      name: '수입',
      month: thisMonthIncome.toLocaleString('ko-KR'),
      today: todayIncome.toLocaleString('ko-KR')
    }
  ]

  //오늘 지출, 수입
  const getTodayExpense = () => {
    let negativeTodayAmount = 0
    let positiveTodayAmount = 0
    const todayAmount = monthAmount[today]
    if (todayAmount) {
      const amounts = todayAmount.reduce(
        (result, item) => {
          if (item.amount < 0) {
            result.negativeTodayAmount += item.amount
          } else {
            result.positiveTodayAmount += item.amount
          }
          return result
        },
        { negativeTodayAmount, positiveTodayAmount }
      )
      negativeTodayAmount = amounts.negativeTodayAmount
      positiveTodayAmount = amounts.positiveTodayAmount

      settodayExpense(negativeTodayAmount)
      settodayIncome(positiveTodayAmount)
    }
  }

  //이번달 지출, 수입
  const getMonthExpense = () => {
    let positiveMonthAmount = 0
    let negativeMonthAmount = 0
    if (monthAmount) {
      Object.keys(monthAmount).map(date => {
        const expenses = monthAmount[date]
        expenses.map(expense => {
          const amount = expense.amount
          if (amount >= 0) {
            positiveMonthAmount += amount
          } else {
            negativeMonthAmount += amount
          }
        })
      })
    }

    setthisMonthExpense(negativeMonthAmount)
    setthisMonthIncome(positiveMonthAmount)
  }

  useEffect(() => {
    if (Object.keys(monthAmount).length > 0) {
      getTodayExpense()
      getMonthExpense()
    }
  }, [monthAmount])

  const handleSelectTab = (index: number) => {
    clickTab(index)
  }

  const handleOpenMenu = () => {
    setisMenuOpen(true)
  }

  const handleCloseMenu = () => {
    setisMenuOpen(false)
  }

  const handleClickNavButton = event => {
    if (id) {
      const target = event.currentTarget.innerText
      if (target == '지출 내역') {
        navigate('/list')
      } else if (target == '달력') {
        navigate('/calendar')
      } else if (target == '지출 분석') {
        navigate('/chart')
      } else if (target == '+ 내역 추가') {
        navigate('/logaccount')
      }
    } else {
      alert('로그인이 필요합니다.')
      navigate('/signin')
    }
  }

  return (
    <Wrapper>
      <MenuButton onClick={handleOpenMenu}>
        <MenuIcon />
      </MenuButton>
      <HeadLine>
        <span>지출</span>, <span>수입</span>을 기록하고 <br />
        손쉽게 <span>재정</span>을 <span>추적</span>하고
        <br />
        효과적으로 관리하세요.
      </HeadLine>
      <TabBackground>
        <TabMenu>
          {tabList.map((el, index) => (
            <li
              key={index}
              className={index === currentTab ? 'submenu focused' : 'submenu'}
              onClick={() => handleSelectTab(index)}>
              {el.name}
            </li>
          ))}
          <span className="date-month">{thisMonth}</span>
        </TabMenu>
        <TabContent>
          <TabContentItem>
            <span className="label">이번 달</span>
            <span className="amount">
              {tabList[currentTab].month}
              <span className="monetary-unit">원</span>
            </span>
          </TabContentItem>
          <TabContentItem>
            <span className="label">오늘</span>
            <span className="amount">
              {tabList[currentTab].today}
              <span className="monetary-unit">원</span>
            </span>
          </TabContentItem>
        </TabContent>
      </TabBackground>

      <Nav>
        <NavButton onClick={handleClickNavButton}>
          <ViewListIcon />
          지출 내역
        </NavButton>
        <NavButton onClick={handleClickNavButton}>
          <CalendarIcon />
          달력
        </NavButton>
        <NavButton onClick={handleClickNavButton}>
          <ChartPieIcon />
          지출 분석
        </NavButton>
      </Nav>
      <AddButton onClick={handleClickNavButton}>+ 내역 추가</AddButton>
      <SlideMenu
        isMenuOpen={isMenuOpen}
        handleCloseMenu={handleCloseMenu}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: calc(var(--vh, 1vh) * 100);
  padding: 1rem;
  background-color: ${props => props.theme.colors.background};
  font-family: 'TheJamsil3Regular';
`
const MenuButton = styled.div`
  position: absolute;
  left: 1rem;
  top: 1rem;
  width: 24px;
  height: 24px;
  cursor: pointer;
  color: ${props => props.theme.colors.text_secondary};
  @media ${props => props.theme.tablet} {
    width: 32px;
    height: 32px;
  }
  @media ${props => props.theme.laptop} {
    width: 32px;
    height: 32px;
  }
  @media ${props => props.theme.desktop} {
    width: 32px;
    height: 32px;
  }
`
const HeadLine = styled.div`
  position: relative;
  width: 100%;
  max-width: 768px;
  margin-bottom: 30px;
  margin-top: 40px;
  font-size: 24px;
  line-height: 1.4;
  color: ${props => props.theme.colors.text_secondary};
  span {
    color: ${props => props.theme.colors.third};
  }
  @media ${props => props.theme.tablet} {
    font-size: 28px;
  }
  @media ${props => props.theme.laptop} {
    font-size: 30px;
  }
  @media ${props => props.theme.desktop} {
    font-size: 30px;
  }
`
const TabBackground = styled.div`
  width: 100%;
  max-width: 768px;
  border-radius: ${props => props.theme.borderRadius};
  background: rgb(100, 113, 233);
  background: linear-gradient(
    329deg,
    rgba(100, 113, 233, 1) 18%,
    rgba(82, 98, 231, 1) 33%,
    rgba(112, 123, 214, 1) 82%,
    rgba(103, 112, 200, 1) 89%,
    rgba(100, 103, 156, 1) 100%
  );
`
const TabMenu = styled.ul`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  max-width: 768px;
  height: 48px;
  flex-shrink: 0;
  background-color: transparent;
  color: #fff;
  list-style: none;
  border-top-left-radius: ${props => props.theme.borderRadius};
  border-top-right-radius: ${props => props.theme.borderRadius};
  @media ${props => props.theme.tablet} {
    height: 80px;
  }
  @media ${props => props.theme.laptop} {
    height: 80px;
  }
  @media ${props => props.theme.desktop} {
    height: 80px;
  }
  .submenu {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100%;
    font-family: 'TheJamsil3Regular';
    font-size: 18px;
    transition: 0.5s;
    border-top-left-radius: ${props => props.theme.borderRadius};
    cursor: pointer;
    @media ${props => props.theme.tablet} {
      width: calc(100% / 4);
      font-size: 28px;
    }
    @media ${props => props.theme.laptop} {
      width: calc(100% / 4);
      font-size: 28px;
    }
    @media ${props => props.theme.desktop} {
      width: calc(100% / 4);
      font-size: 28px;
    }
  }
  .focused {
    border-bottom: 1px solid #fff;
    color: #fff;
  }
  .date-month {
    position: absolute;
    right: 20px;
    font-family: 'TheJamsil1Thin';
    font-size: 16px;
    color: #fff;
    @media ${props => props.theme.tablet} {
      font-size: 26px;
    }
    @media ${props => props.theme.laptop} {
      font-size: 26px;
    }
    @media ${props => props.theme.desktop} {
      font-size: 26px;
    }
  }
`
const TabContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  flex-shrink: 0;
  width: 100%;
  max-width: 768px;
  height: 180px;
  padding: 20px;
  background-color: transparent;
  border-bottom-left-radius: ${props => props.theme.borderRadius};
  border-bottom-right-radius: ${props => props.theme.borderRadius};
  @media ${props => props.theme.tablet} {
    height: 300px;
  }
  @media ${props => props.theme.laptop} {
    height: 300px;
  }
  @media ${props => props.theme.desktop} {
    height: 300px;
  }
`
const TabContentItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1rem;
  color: #fff;
  .label {
    font-family: 'TheJamsil3Regular';
    font-size: 18px;
    @media ${props => props.theme.tablet} {
      font-size: 28px;
    }
    @media ${props => props.theme.laptop} {
      font-size: 28px;
    }
    @media ${props => props.theme.desktop} {
      font-size: 28px;
    }
  }
  .amount {
    font-size: 32px;
    color: #fff;
    @media ${props => props.theme.tablet} {
      font-size: 45px;
    }
    @media ${props => props.theme.laptop} {
      font-size: 45px;
    }
    @media ${props => props.theme.desktop} {
      font-size: 45px;
    }
  }
  .monetary-unit {
    margin-left: 5px;
    font-size: 18px;
    @media ${props => props.theme.tablet} {
      font-size: 30px;
    }
    @media ${props => props.theme.laptop} {
      font-size: 30px;
    }
    @media ${props => props.theme.desktop} {
      font-size: 30px;
    }
  }
`
const Nav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  gap: 10px;
  width: 100%;
  max-width: 768px;
  height: 120px;
  margin-top: 10px;
  margin-bottom: 50px;
  border-radius: ${props => props.theme.borderRadius};
`
const NavButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  flex-basis: 0;
  height: 64px;
  box-sizing: content-box;
  padding: 20px;
  font-size: 14px;
  text-decoration: none;
  background-color: #fff;
  border-radius: ${props => props.theme.borderRadius};
  color: ${props => props.theme.colors.text_secondary};
  cursor: pointer;
  &:hover {
    color: ${props => props.theme.colors.third};
  }
  svg {
    font-size: 30px;
    color: ${props => props.theme.colors.text_secondary};
    margin-bottom: 10px;
  }
  @media ${props => props.theme.tablet} {
    font-size: 18px;
  }
  @media ${props => props.theme.laptop} {
    font-size: 18px;
  }
  @media ${props => props.theme.desktop} {
    font-size: 18px;
  }
`
const AddButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  width: 80%;
  max-width: calc(768px * 0.8);
  height: 64px;
  background-color: ${props => props.theme.colors.text_secondary};
  border: none;
  border-radius: ${props => props.theme.borderRadius};
  font-family: 'TheJamsil3Regular';
  font-size: 18px;
  text-decoration: none;
  color: #fff;
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
