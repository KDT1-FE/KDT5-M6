import useUserInfo from '@/hooks/useUserInfo'
import { chartStore } from '@/store/chartStore'
import { ExpenseSummary } from '@/types/api'
import React, { useCallback, useEffect, useState } from 'react'
import dayjs from 'dayjs'

import BarChart from '@/components/chart/BarChart'
import LineChart from '@/components/chart/LineChart'
import DoughnutChart from '@/components/chart/DoughnutChart'
import Loading from '@/components/chart/Loading'

export default function Chart() {
  const {
    getCategories,
    getExpenses,
    getCalendar,
    getCategorieData,
    daily,
    categorieData,
    categoriesData,
    undefinedCategorieData,
    isCategoriesLoding,
    isCategorieDataLoding,
    isExpensesLoding
  } = chartStore()

  const [userInfo] = useUserInfo()
  const userId = userInfo.userId

  const [date, setDate] = useState(dayjs(new Date()).format('YYYY-MM'))

  const year = dayjs(date).year() // 2023
  const month = dayjs(date).month() + 1 // 7

  const fetchChartData = useCallback(async () => {
    if (userId) {
      getCategories(userId)
      getExpenses('daily', userId)
      getCalendar(year, month, userId)
    }
  }, [getCalendar, getCategories, getExpenses, month, userId, year])

  const fetchcategories = useCallback(async () => {
    if (categoriesData.length > 0) {
      getCategorieData(categoriesData[0].categorie, userId)
      getCategorieData('미지정', userId)
    }
  }, [categoriesData, getCategorieData, userId])

  useEffect(() => {
    fetchChartData()
  }, [userInfo, date, fetchChartData])

  useEffect(() => {
    fetchcategories()
  }, [categoriesData, date, fetchcategories])

  ///////////////////////////////

  const chartData = {
    labels: categoriesData.map((data) => data.categorie),
    datasets: [
      {
        label: `${month}월 일별 지출금액`,
        data: categoriesData.map((data) => data.totalAmount),
        backgroundColor: ['rgba(238, 102, 121, 1)', 'rgba(98, 181, 229, 1)', 'rgba(255, 198, 0, 1)'],

        borderWidth: 5,
        cutout: '70%',
        borderRadius: 2,
        hoverBorderWidth: 0
      }
    ]
  }

  ////////////////////////////

  const oneMonthDaily = daily.filter((day) => {
    return day._id.slice(0, 7) === date
  })

  oneMonthDaily.sort((a: ExpenseSummary, b: ExpenseSummary): number => {
    if (a._id < b._id) {
      return -1
    } else if (a._id > b._id) {
      return 1
    } else {
      return 0
    }
  })

  const chartData2 = {
    labels: oneMonthDaily.map((data) => data._id),
    datasets: [
      {
        label: `${month}월 일별 지출금액 추이`,
        data: oneMonthDaily.map((data) => data.totalAmount),
        backgroundColor: ['rgba(238, 102, 121, 1)', 'rgba(98, 181, 229, 1)', 'rgba(255, 198, 0, 1)']
      }
    ]
  }

  /////////////////////////////////

  const topCategorie = categorieData.filter((data) => {
    return data.date!.slice(0, 7) === date
  })

  let categorie = ''
  if (topCategorie.length > 0) {
    categorie = topCategorie[0].category
  }
  const chartData3 = {
    labels: topCategorie.map((data) => data.date),
    datasets: [
      {
        label: `${month}월 최대 지출 카테고리(${categorie}) 지출금액`,
        data: topCategorie.map((data) => data.amount),
        backgroundColor: ['rgba(238, 102, 121, 1)', 'rgba(98, 181, 229, 1)', 'rgba(255, 198, 0, 1)'],

        borderWidth: 2
      }
    ]
  }

  ////////////////////////////////
  const undefinedData = categoriesData.filter((data) => data.categorie === '미지정')

  const noUndefinedData = categoriesData.filter((data) => data.categorie !== '미지정')
  let sum = 0
  for (let i = 0; i < noUndefinedData.length; i++) {
    sum = sum + noUndefinedData[i].totalAmount
  }

  const noCategorieData = [...undefinedData, { categorie: 'total', totalAmount: sum }]

  const chartData4 = {
    labels: noCategorieData.map((data) => data.categorie),
    datasets: [
      {
        label: `${month}월 미분류 소비 비율`,
        data: noCategorieData.map((data) => data.totalAmount),
        backgroundColor: ['rgba(238, 102, 121, 1)', 'rgba(98, 181, 229, 1)', 'rgba(255, 198, 0, 1)'],

        borderWidth: 5,
        cutout: '70%',
        borderRadius: 2,
        hoverBorderWidth: 0
      }
    ]
  }

  //////////////////////////////////////

  const undefinedCategorie = undefinedCategorieData.filter((data) => {
    return data.date!.slice(0, 7) === date
  })

  const chartData5 = {
    labels: undefinedCategorie.map((data) => data.date),
    datasets: [
      {
        label: `${month}월 미분류 카테고리 지출금액`,
        data: undefinedCategorie.map((data) => data.amount),
        backgroundColor: ['rgba(238, 102, 121, 1)', 'rgba(98, 181, 229, 1)', 'rgba(255, 198, 0, 1)'],

        maxBarThickness: 10
      }
    ]
  }

  ///////////////////////////////////
  const Doughnutoptions = {
    plugins: {
      legend: {
        display: false
      }
    }
  }

  const options = {
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true
        }
      },
      y: {
        display: true,

        suggestedMin: 0
      }
    }
  }

  //////////////////////////////////
  const chartBoxStyle = 'bg-white drop-shadow-lg w-full p-8 mb-8'

  return (
    <div className="container mx-auto  ">
      <div className=" max-w-[764px] mx-auto mb-20 py-8">
        <div className="border-b-4 mb-4">
          <input
            className="text-[32px] font-bold bg-transparent"
            type="month"
            defaultValue={date}
            onChange={(e) => {
              setDate(dayjs(e.target.value).format('YYYY-MM'))
            }}
          />
        </div>

        <div className={chartBoxStyle}>
          <p className="mb-5 text-lg font-bold">이번 달 지출 카테고리</p>
          {isCategoriesLoding ? (
            <Loading />
          ) : categoriesData.length ? (
            <div className="flex items-center justify-around flex-wrap">
              <div>
                <DoughnutChart chartData={chartData} options={Doughnutoptions} />
              </div>
              <div>
                <ul>
                  {categoriesData.map((data) => {
                    return (
                      <li
                        key={data.categorie}
                        className="border-b border-gray-300 p-2 flex justify-between
                           min-w-[300px]"
                      >
                        <p>{data.categorie}</p>
                        <p>{data.totalAmount.toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' })}</p>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          ) : (
            '데이터 없음'
          )}
        </div>

        <div className={chartBoxStyle}>
          <p className="mb-5 text-lg font-bold">이번 달 일일 지출</p>
          {isExpensesLoding ? (
            <Loading />
          ) : oneMonthDaily.length ? (
            <div>
              <BarChart chartData={chartData2} options={options} />
              <br />
              <LineChart chartData={chartData2} options={options} />
            </div>
          ) : (
            '데이터 없음'
          )}
        </div>

        <div className={chartBoxStyle}>
          <p className="mb-5 text-lg font-bold">이번 달 TOP1 소비 카테고리 : {categorie}</p>
          {isCategoriesLoding ? (
            <Loading />
          ) : topCategorie.length ? (
            <BarChart chartData={chartData3} options={options} />
          ) : (
            '데이터 없음'
          )}
        </div>
        <div className={chartBoxStyle}>
          <p className="mb-5 text-lg font-bold">이번 달 미분류 소비 비율</p>
          {isCategorieDataLoding ? (
            <Loading />
          ) : categoriesData.length ? (
            <div className="flex items-center justify-around w-full flex-wrap">
              <div>
                <DoughnutChart chartData={chartData4} options={Doughnutoptions} />
              </div>
              <div>
                <BarChart chartData={chartData5} options={options} />
              </div>
            </div>
          ) : (
            '데이터 없음'
          )}
        </div>
      </div>
    </div>
  )
}
