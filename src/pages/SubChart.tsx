import { useState, useEffect } from 'react'
import { Header, Footer } from 'src/components'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { barOptions, barLabels } from 'components/subchart/BarChartOptions'
import { fetchExpenses } from 'src/api/FetchCategoryExpenses'
import { useRecoilValue } from 'recoil'
import { selectedCategoryState } from 'recoil/SelectedCategoryState'
import { ChartList } from 'components/subchart/ChartList'
import { theme } from 'style/theme'
import styled from 'styled-components'

// Chart.js, react-chartjs-2
// register() 메서드를 사용해 사용자 정의 요소들을 등록한 후,
// react-chartjs-2 컴포넌트를 통해 차트에 사용할 수 있음
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

// styled-components 스타일링
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
  margin: 30px 15px 30px;
  width: 100%;
  height: 600px;
`

// SubChart Page Component
export const SubChart = () => {
  const id = localStorage.getItem('id')
  const userId = `team9-${id}`
  const keyword = ''

  const [subChartData, setSubChartData] = useState<ChartData<
    'bar',
    (number | [number, number] | null)[]
  > | null>(null)

  // recoil State를 사용하여 선택된 카테고리 가져오기
  const selectedCategory = useRecoilValue(selectedCategoryState)
  const [categoryExpenses, setCategoryExpenses] = useState<any[]>([])

  // 카테고리 분할 함수
  const splitCategory = category => {
    const [primary, secondary] = category.split('.')
    return { primary, secondary: secondary || '' }
  }

  useEffect(() => {
    const fetchSubChartData = async () => {
      try {
        // 수입, 지출 데이터 가져오기
        const expensesData = await fetchExpenses(keyword, userId)

        // 차트 하단에 출력할 ChartList에 필요한 데이터 형식 변환
        const transformedExpensesData = expensesData.map(item => {
          const { amount, category, date } = item
          const { primary, secondary } = splitCategory(category)

          return {
            amount,
            category: primary,
            subCategory: secondary,
            date
          }
        })

        // 월별 수입, 지출 그룹화
        const groupedData: {
          [key: string]: { income: number; expense: number }
        } = {}

        transformedExpensesData.forEach(item => {
          const month = new Date(item.date).getMonth()
          const amount = Math.abs(item.amount)

          if (!groupedData[month]) {
            groupedData[month] = {
              income: item.amount >= 0 ? amount : 0,
              expense: item.amount < 0 ? amount : 0
            }
          } else {
            if (item.amount >= 0) {
              groupedData[month].income += amount
            } else {
              groupedData[month].expense += amount
            }
          }
        })

        // 선택된 카테고리에 해당하는 데이터 Filtering
        const filteredCategory = transformedExpensesData.filter(item => {
          const { primary } = splitCategory(item.category)
          if (
            selectedCategory === item.category ||
            selectedCategory === primary
          ) {
            return true
          }
          return false
        })

        // Chart Data - Vertical Bar Chart
        const data: ChartData<'bar'> = {
          labels: barLabels,
          datasets: [
            {
              label: '수입',
              data: barLabels.map(
                (_, index) => groupedData[index + 2]?.income || 0
              ),
              backgroundColor: theme.colors.primary,
              borderWidth: 1
            },
            {
              label: '지출',
              data: barLabels.map(
                (_, index) => groupedData[index + 2]?.expense || 0
              ),
              backgroundColor: theme.colors.red,
              borderWidth: 1
            }
          ]
        }

        setCategoryExpenses(filteredCategory)
        setSubChartData(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchSubChartData()
  }, [selectedCategory])

  return (
    <>
      <Header />
      <Wrapper>
        <ChartTitle>월별 수입 및 지출</ChartTitle>
        <ChartContainer>
          {subChartData && (
            <Bar
              options={{
                ...barOptions,
                plugins: {
                  ...barOptions.plugins,
                  datalabels: {
                    // width 값이 770px 이상일 때만 데이터 라벨 출력
                    display: window.innerWidth >= 770,
                    align: 'end',
                    anchor: 'end',
                    color: '#2d2c2c',
                    font: {
                      family: 'TheJamsil3Regular',
                      size: 20
                    },
                    formatter: value => {
                      if (value === 0 || value === null) {
                        return ''
                      }
                      return `${value.toLocaleString()}원`
                    }
                  }
                }
              }}
              data={subChartData}
              plugins={[ChartDataLabels]}
            />
          )}
        </ChartContainer>
        <ChartList categoryExpenses={categoryExpenses} />
      </Wrapper>
      <Footer />
    </>
  )
}
