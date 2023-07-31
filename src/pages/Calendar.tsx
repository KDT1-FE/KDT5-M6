import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import _ from 'lodash'
import styled from 'styled-components'
import { Header, Footer, ViewLogs } from 'components/index'
import { useEffect, useState, useRef } from 'react'
import { getMonthlyExpenses } from 'api/index'
import { useNavigate } from 'react-router-dom'
import { Expense, CalendarEvent } from 'api/index'

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  background-color: ${props => props.theme.colors.background};
  font-family: 'TheJamsil1Thin', 'TheJamsil5Bold';
  .fc {
    width: 100%;
    background-color: #fff;
  }
  .expense {
    background-color: ${props => props.theme.colors.red};
    border-color: ${props => props.theme.colors.red};
  }
  .income {
    border-color: ${props => props.theme.colors.third};
    background-color: ${props => props.theme.colors.third};
  }
  .time-logged {
    border-color: black;
  }
  .fc-daygrid-event-dot {
    border-color: ${props => props.theme.colors.third};
  }
  .fc .fc-daygrid-day-frame {
    overflow: scroll;
  }
  .fc .fc-toolbar.fc-header-toolbar {
    margin: 0;
    background-color: ${props => props.theme.colors.primary};
    border-radius: 12px 12px 0 0;
    justify-content: space-between;
    color: white;
    font-family: 'TheJamsil5Bold';
  }
  .fc-theme-standard th {
    background-color: ${props => props.theme.colors.third};
  }
  .fc .fc-daygrid-day.fc-day-today .fc-daygrid-day-top {
    font-family: 'TheJamsil5Bold';
  }
  @media ${props => props.theme.mobile} {
    .fc {
      margin: 0 30px;
      height: 500px;
    }
    // toolbar container
    .fc .fc-toolbar.fc-header-toolbar {
      padding: 25px 40px;
      height: 33px;
      font-size: 10px;
      line-height: 29px;
    }

    // toolbar 버튼
    .fc .fc-button-primary {
      background-color: transparent;
      border: none;

      span {
        font-weight: 300;
        font-size: 20px;
      }
    }
    // 요일 부분
    .fc-theme-standard th {
      height: 16px;
      padding-top: 1px;
      border-top: 1px solid #fefefe;
      font-weight: 500;
      font-size: 12px;
      line-height: 17px;
      color: #f8f8f8;
    }
    // 오늘 날짜 배경색
    .fc .fc-daygrid-day.fc-day-today {
      background-color: ${props => props.theme.colors.background};
    }

    // 날짜별 그리드
    .fc .fc-daygrid-day-frame {
      padding: 4px;
      height: 50px;
    }

    // 날짜  ex) 2일
    .fc .fc-daygrid-day-top {
      flex-direction: row;
      margin-bottom: 1px;
      font-size: 5px;
    }
    // 각 이벤트 요소
    .fc-event {
      cursor: pointer;
      padding: 3px 5px;
      margin-bottom: 5px;
      border-radius: 4px;
      font-weight: 500;
      font-size: 8px;
      overflow: scroll;
    }
  }
  @media ${props => props.theme.tablet} {
    .fc {
      margin: 0 50px;
      height: 800px;
    }
    // toolbar container
    .fc .fc-toolbar.fc-header-toolbar {
      padding: 0 40px;
      height: 63px;
      font-size: 12px;
      line-height: 29px;
    }

    // toolbar 버튼
    .fc .fc-button-primary {
      background-color: transparent;
      border: none;

      span {
        font-weight: 500;
        font-size: 28px;
      }
    }
    // 요일 부분
    .fc-theme-standard th {
      height: 32px;
      padding-top: 3px;
      border-top: 1px solid #fefefe;
      font-weight: 500;
      font-size: 17px;
      line-height: 20px;
      color: #f8f8f8;
    }
    // 오늘 날짜 배경색
    .fc .fc-daygrid-day.fc-day-today {
      background-color: ${props => props.theme.colors.background};
    }

    // 날짜별 그리드
    .fc .fc-daygrid-day-frame {
      padding: 8px;
      height: 50px;
    }

    // 날짜  ex) 2일
    .fc .fc-daygrid-day-top {
      flex-direction: row;
      margin-bottom: 1px;
      font-size: 16px;
    }
    // 각 이벤트 요소
    .fc-event {
      cursor: pointer;
      padding: 3px 5px;
      margin-bottom: 5px;
      border-radius: 4px;
      font-weight: 500;
      font-size: 13px;
      overflow: scroll;
    }
  }
  @media ${props => props.theme.laptop} {
    .fc {
      height: 900px;
      margin: 0 100px;
    }
    // toolbar container
    .fc .fc-toolbar.fc-header-toolbar {
      padding: 0 40px;
      height: 63px;
      font-size: 12px;
      line-height: 29px;
    }

    // toolbar 버튼
    .fc .fc-button-primary {
      background-color: transparent;
      border: none;

      span {
        font-weight: 500;
        font-size: 28px;
      }
    }
    // 요일 부분
    .fc-theme-standard th {
      height: 32px;
      padding-top: 3px;
      border-top: 1px solid #fefefe;
      font-weight: 500;
      font-size: 17px;
      line-height: 20px;
      color: #f8f8f8;
    }
    // 오늘 날짜 배경색
    .fc .fc-daygrid-day.fc-day-today {
      background-color: ${props => props.theme.colors.background};
    }

    // 날짜별 그리드
    .fc .fc-daygrid-day-frame {
      padding: 8px;
      height: 50px;
    }

    // 날짜  ex) 2일
    .fc .fc-daygrid-day-top {
      flex-direction: row;
      margin-bottom: 2px;
      font-size: 16px;
    }
    // 각 이벤트 요소
    .fc-event {
      cursor: pointer;
      padding: 3px 5px;
      margin-bottom: 5px;
      border-radius: 4px;
      font-weight: 500;
      font-size: 13px;
      overflow: scroll;
    }
  }
  @media ${props => props.theme.desktop} {
    .fc {
      margin: 0 150px;
      height: 1200px;
    }

    // toolbar container
    .fc .fc-toolbar.fc-header-toolbar {
      padding: 0 40px;
      height: 77px;
      font-size: 12px;
      line-height: 29px;
    }

    // toolbar 버튼
    .fc .fc-button-primary {
      background-color: transparent;
      border: none;

      span {
        font-weight: 500;
        font-size: 28px;
      }
    }
    // 요일 부분
    .fc-theme-standard th {
      height: 32px;
      padding-top: 3px;
      border-top: 1px solid #fefefe;
      font-weight: 500;
      font-size: 17px;
      line-height: 20px;
      color: #f8f8f8;
    }
    // 오늘 날짜 배경색
    .fc .fc-daygrid-day.fc-day-today {
      background-color: ${props => props.theme.colors.background};
    }

    // 날짜별 그리드
    .fc .fc-daygrid-day-frame {
      padding: 16px;
      height: 60px;
    }

    // 날짜  ex) 2일
    .fc .fc-daygrid-day-top {
      flex-direction: row;
      margin-bottom: 2px;
      font-size: 16px;
    }
    // 각 이벤트 요소
    .fc-event {
      cursor: pointer;
      padding: 3px 5px;
      margin-bottom: 5px;
      border-radius: 4px;
      font-weight: 500;
      font-size: 13px;
      overflow: scroll;
    }
  }
`
const date = new Date()
const initialYear = date.getFullYear()
const initialMonth = date.getMonth() + 1

export const Calendar = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([])
  //캘린더 이전/다음달 변경시 년/월 정보
  const [year, setYear] = useState(initialYear)
  const [month, setMonth] = useState(initialMonth)

  const [modalOpen, setModalOpen] = useState(false)
  const [selectedExpense, setSelectedExpense] = useState({})

  const navigate = useNavigate()
  const calendarRef = useRef<FullCalendar>(null)
  const id = localStorage.getItem('id')
  const USERID = `team9-${id}`

  const regex = /[^0-9]/g
  const closeModal = () => setModalOpen(false)

  useEffect(() => {
    /**날짜별 소비 달력 표시 함수*/
    const renderDailyExpenses = async () => {
      if (!id) {
        alert('로그인이 필요합니다.')
        navigate('/signin')
        return
      }

      if (id) {
        const expenses = await getMonthlyExpenses(year, month, USERID)

        const newEvents: CalendarEvent[] = []

        Object.keys(expenses).forEach((date: string) => {
          const monthlyExpenses: Expense[] = expenses[date]

          monthlyExpenses.forEach((expense: Expense) => {
            newEvents.push({
              title: expense.category,
              date: expense.date.replace('Z', '')
            })

            newEvents.push({
              title: `${expense.amount.toLocaleString()}원`,
              allDay: true,
              start: expense.date.replace('Z', '')
            })
          })
        })

        setEvents(newEvents)
      }
    }

    renderDailyExpenses()
  }, [year, month, id])
  return (
    <>
      <Header />
      <Wrapper>
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, interactionPlugin]}
          headerToolbar={{
            start: 'title',
            end: 'prevBtn nextBtn'
          }}
          weekends={true}
          locale="ko"
          events={events}
          eventClassNames={function (arg) {
            if (arg.event.allDay && arg.event.title.includes('-')) {
              return ['expense']
            }
            if (arg.event.allDay && arg.event.start) {
              return ['income']
            } else {
              return ['time-logged']
            }
          }}
          customButtons={{
            prevBtn: {
              icon: 'chevron-left',
              click: () => {
                if (calendarRef.current?.getApi()) {
                  calendarRef.current.getApi().prev()
                  const calendarMonth = _.get(
                    calendarRef.current.getApi(), //DOM의 정보 가져옴
                    'currentDataManager.data.viewTitle' //보여지는 달에 대한 정보
                  )
                  setYear(
                    parseInt(
                      calendarMonth.split(' ').map(i => i.replace(regex, ''))[0]
                    )
                  )
                  setMonth(
                    parseInt(
                      calendarMonth.split(' ').map(i => i.replace(regex, ''))[1]
                    )
                  )
                  setEvents([])
                }
              }
            },
            nextBtn: {
              icon: 'chevron-right',
              click: () => {
                if (calendarRef.current?.getApi()) {
                  calendarRef.current.getApi().next()
                  const calendarMonth = _.get(
                    calendarRef.current.getApi(), //DOM의 정보 가져옴
                    'currentDataManager.data.viewTitle' //보여지는 달에 대한 정보
                  )
                  setYear(
                    parseInt(
                      calendarMonth.split(' ').map(i => i.replace(regex, ''))[0]
                    )
                  )
                  setMonth(
                    parseInt(
                      calendarMonth.split(' ').map(i => i.replace(regex, ''))[1]
                    )
                  )
                  setEvents([])
                }
              }
            }
          }}
          eventClick={event => {
            setModalOpen(true)
            console.log(event.event)
            setSelectedExpense(event.event)
          }}
          // 모달 [컨텐츠 - 수정,삭제,취소 버튼]
        />
        {modalOpen && (
          <ViewLogs
            closeModal={closeModal}
            expense={selectedExpense}
          />
        )}
      </Wrapper>
      <Footer />
    </>
  )
}
