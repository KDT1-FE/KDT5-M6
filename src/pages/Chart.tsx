import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header, Footer } from 'src/components'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData
} from 'chart.js'
import { Pie } from 'react-chartjs-2'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { pieOptions } from 'components/chart/PieChartOptions'
import { fetchExpenses } from 'api/FetchCategoryExpenses'
import { useRecoilState } from 'recoil'
import { selectedDateState } from 'recoil/SelectedDateState'
import { useChartHandlers } from 'src/hooks/ChartHooks'
import { PeriodRange } from 'components/chart/PeriodRange'
import { IncomeExpensesFilter } from '@/components/chart/IncomeExpensesFilter'
import { ChartList } from 'components/chart/ChartList'
import { theme } from 'style/theme'
import styled from 'styled-components'

// Chart.js, react-chartjs-2
// register() 메서드를 사용해 사용자 정의 요소들을 등록한 후,
// react-chartjs-2 컴포넌트를 통해 차트에 사용할 수 있음
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels)

// Styled-components 스타일링
const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
  background-color: ${props => props.theme.colors.background};
`

const ChartTitle = styled.h1`
  display: inline-block;
  margin: 30px 15px;
  font-family: 'TheJamsil5Bold';
  font-weight: 700;
  font-size: 30px;
  color: ${props => props.theme.colors.text_primary};
`

const ChartContainer = styled.figure`
  margin-bottom: 30px;
  width: 100%;
  height: 600px;
`

// Chart Page Component
export const Chart = () => {
  const navigate = useNavigate()
  const id = localStorage.getItem('id')
  const userId = `team9-${id}`
  const keyword = ''

  const [chartData, setChartData] = useState<ChartData<'pie'> | null>(null)

  // 월별 Filtering - RecoilState
  const [selectedDate] = useRecoilState(selectedDateState)

  // 수입, 지출 Filtering
  const [chartFilter, setChartFilter] = useState<'income' | 'expenses'>(
    'expenses'
  )

  // 차트 하단에 출력될 카테고리별 수입, 지출 내역
  const [categoryList, setCategoryList] = useState<{
    [category: string]: number
  }>({})

  // 수입, 지출 총액 계산
  const totalAmount = Object.values(categoryList)
    .filter(amount => amount > 0)
    .reduce((sum, amount) => sum + amount, 0)

  // ChartHandlers - 월별 Filtering, 총합 가격 순으로 정렬, SubChart 렌더링
  const { handlePrevMonth, handleNextMonth, sortByAmount, handleShowSubChart } =
    useChartHandlers()

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        // 모든 수입, 지출 데이터 가져오기
        const expensesData = await fetchExpenses(keyword, userId)

        // 수입, 지출 데이터 Filtering - input button
        const filteredData = expensesData.filter(
          item =>
            (chartFilter === 'income' ? item.amount >= 0 : item.amount < 0) &&
            new Date(item.date).getMonth() + 1 === selectedDate.month
        )

        if (filteredData === null || filteredData.length === 0) {
          const confirmMessage = `${selectedDate.year}년 ${selectedDate.month}월의 데이터가 없습니다.\n수입 및 지출 내역을 입력해주세요!
          \n확인 버튼 클릭 시 입력 페이지로 이동합니다!`

          if (window.confirm(confirmMessage)) {
            navigate('/logaccount')
          }
          return
        }

        // category별로 데이터 집계
        const aggregatedData = {}
        filteredData.forEach(item => {
          const categoryName = item.category.split('.')[0]
          const amount = Math.abs(Number(item.amount))

          if (aggregatedData[categoryName]) {
            aggregatedData[categoryName] += amount
          } else {
            aggregatedData[categoryName] = amount
          }
        })

        // category 속성 중 메인 카테고리만 추출하여 다시 데이터 집계
        const mainCategories = Object.keys(aggregatedData).map(
          category => category.split('.')[0]
        )

        const aggregatedMainCategories = mainCategories.reduce(
          (acc, category) => {
            const amount = aggregatedData[category] || 0
            acc[category] = (acc[category] || 0) + amount
            return acc
          },
          {}
        )

        // Chart Data 내용 - Pie Chart
        const data: ChartData<'pie'> = {
          // 메인 카테고리를 라벨로 출력
          labels: Object.keys(aggregatedMainCategories),
          datasets: [
            {
              data: Object.values(aggregatedMainCategories),
              // 메인 카테고리 데이터 중복 없이 차트 출력
              backgroundColor: [
                theme.colors.red,
                theme.colors.orange,
                theme.colors.salmon,
                theme.colors.green,
                theme.colors.lightblue,
                theme.colors.blue,
                theme.colors.secondary
              ],
              borderColor: [
                theme.colors.red,
                theme.colors.orange,
                theme.colors.salmon,
                theme.colors.green,
                theme.colors.lightblue,
                theme.colors.blue,
                theme.colors.secondary
              ],
              borderWidth: 1
            }
          ]
        }
        setChartData(data)
        setCategoryList(aggregatedMainCategories)
      } catch (error) {
        console.log(error)
      }
    }

    fetchChartData()
  }, [chartFilter, selectedDate])

  return (
    <>
      <Header />
      <Wrapper>
        <ChartTitle>카테고리별 수입·지출</ChartTitle>
        <PeriodRange
          selectedDate={selectedDate}
          handlePrevMonth={handlePrevMonth}
          handleNextMonth={handleNextMonth}
        />
        <IncomeExpensesFilter
          chartFilter={chartFilter}
          setChartFilter={setChartFilter}
        />
        <ChartContainer>
          {chartData && (
            <Pie
              data={chartData}
              options={pieOptions}
            />
          )}
        </ChartContainer>
        <ChartList
          chartFilter={chartFilter}
          totalAmount={totalAmount}
          categoryList={categoryList}
          sortByAmount={sortByAmount}
          handleShowSubChart={handleShowSubChart}
        />
      </Wrapper>
      <Footer />
    </>
  )
}
