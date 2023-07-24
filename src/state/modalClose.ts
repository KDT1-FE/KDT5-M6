import { atom } from "recoil";

export const openModalAtom = atom<boolean>({
  key: "add",
  default: false,
});
export const openEditModalAtom = atom<boolean>({
  key: "edit",
  default: false,
});
export const openDeleteModalAtom = atom<boolean>({
  key: "delete",
  default: false,
});
