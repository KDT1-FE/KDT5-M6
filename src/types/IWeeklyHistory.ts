import { ICalendarResponse } from 'types/index'

export interface IWeeklyHistory {
  year: number
  month: number
  day: number
  histories: ICalendarResponse[]
}
