import { create } from "zustand";

type Store = {
  currentYear: string;
  setCurrentYear: (year: string) => void;
  currentMonth: string;
  setCurrentMonth: (month: string) => void;
  currentDay: string;
  setCurrentDay: (day: string) => void;
  currentHour: string;
  setCurrentHour: (hour: string) => void;
  currentMinute: string;
  setCurrentMinute: (minute: string) => void;
  currentFullDate: string;
  setFullDate: (fulldate: string) => void;
};

const dateFormat = (currentNumber: string) => {
  if (currentNumber.length === 1) {
    return `0${currentNumber}`;
  } else return currentNumber;
};

export const useTimeStore = create<Store>((set) => ({
  currentYear: String(new Date().getFullYear()),
  setCurrentYear: (year: string) => set({ currentYear: year }),
  currentMonth: dateFormat(String(new Date().getMonth() + 1)),
  setCurrentMonth: (month: string) => set({ currentMonth: dateFormat(month) }),
  currentDay: dateFormat(String(new Date().getDate())),
  setCurrentDay: (day: string) => set({ currentDay: dateFormat(day) }),
  currentHour: dateFormat(String(new Date().getHours())),
  setCurrentHour: (hour: string) => set({ currentHour: dateFormat(hour) }),
  currentMinute: dateFormat(String(new Date().getMinutes())),
  setCurrentMinute: (minute: string) => set({ currentMinute: dateFormat(minute) }),

  currentFullDate: String(new Date().toISOString),
  setFullDate: (fullDate: string) => set({ currentFullDate: fullDate })
}));
