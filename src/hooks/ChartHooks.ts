import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { selectedDateState } from 'recoil/SelectedDateState'
import { selectedCategoryState } from 'recoil/SelectedCategoryState'

export const useChartHandlers = () => {
  const navigate = useNavigate()
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState)
  const [, setSelectedCategory] = useRecoilState(selectedCategoryState)

  // 월별 Filtering Handler
  const handlePrevMonth = () => {
    const currentYear = selectedDate.year
    const currentMonth = selectedDate.month

    if (currentMonth === 1) {
      setSelectedDate({ year: currentYear - 1, month: 12 })
    } else {
      setSelectedDate({ year: currentYear, month: currentMonth - 1 })
    }
  }

  const handleNextMonth = () => {
    const currentYear = selectedDate.year
    const currentMonth = selectedDate.month

    if (currentMonth === 12) {
      setSelectedDate({ year: currentYear + 1, month: 1 })
    } else {
      setSelectedDate({ year: currentYear, month: currentMonth + 1 })
    }
  }

  // 총합 가격 순으로 정렬 - 카테고리별 수입, 지출 내역
  const sortByAmount = (a, b) => b[1] - a[1]

  // 카테고리 Click Event Handler
  const handleCategoryClick = category => {
    setSelectedCategory(category)
  }

  // SubChart 컴포넌트 이동
  const handleShowSubChart = category => {
    setSelectedCategory(category)
    navigate('/subchart', { state: { category } })
  }

  return {
    handlePrevMonth,
    handleNextMonth,
    sortByAmount,
    handleCategoryClick,
    handleShowSubChart
  }
}
