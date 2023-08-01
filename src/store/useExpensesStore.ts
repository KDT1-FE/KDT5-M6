import { create } from "zustand";
import { searchRes, search } from "@/types/apiTypes";

type Store = {
  yearList: searchRes;
  setYearList: (lists: searchRes) => void;
  totalLists: searchRes;
  setTotalLists: (lists: searchRes) => void;
  monthList: searchRes;
  setMonthList: (lists: searchRes) => void;
  dayList: { [key: string]: search[] };
  setDayList: (lists: { [key: string]: search[] }) => void;
};

export const useExpensesStore = create<Store>((set) => ({
  totalLists: [],
  setTotalLists: (lists: searchRes) => set({ totalLists: lists }),
  yearList: [],
  setYearList: (lists: searchRes) => set({ yearList: lists }),
  monthList: [],
  setMonthList: (lists: searchRes) => set({ monthList: lists }),
  dayList: {},
  setDayList: (lists: { [key: string]: search[] }) => set({ dayList: lists })
}));
