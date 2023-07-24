import { atom } from "recoil";

const now = new Date();
const nowYear = now.getFullYear();
const nowMonth = now.getMonth();
const nowDate = now.getDate();

export const todayAtom = atom<Date>({
  key: "today",
  default: new Date(`${nowYear}-${nowMonth + 1}-${nowDate}`),
});
