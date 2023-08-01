import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

type Store = {
  userId: string | null;
  userNickname: string | null;
  initializeUserId: () => void;
};

const adjectives = [
  "행복한",
  "빛나는",
  "즐거운",
  "매력적인",
  "열정적인",
  "유쾌한",
  "사랑스러운",
  "창조적인",
  "신비로운",
  "화려한",
  "우아한",
  "용감한",
  "자유로운",
  "낙천적인",
  "활기찬",
  "평화로운",
  "귀여운",
  "기묘한",
  "사려깊은",
  "잔잔한",
  "근면한",
  "성실한",
  "대담한",
  "자랑스러운",
  "강력한",
  "기분좋은",
  "친절한",
  "기쁜",
  "밝은",
  "멋진"
];

const animals = [
  "사자",
  "토끼",
  "호랑이",
  "코끼리",
  "원숭이",
  "펭귄",
  "고양이",
  "강아지",
  "펠리칸",
  "기린",
  "사슴",
  "곰",
  "판다",
  "늑대",
  "갈매기",
  "독수리",
  "비둘기",
  "햄스터",
  "사막여우",
  "코알라",
  "펠리칸",
  "물소",
  "나무늘보",
  "풍뎅이",
  "다람쥐",
  "아나콘다",
  "플라밍고",
  "코뿔소",
  "기린",
  "티라노사우르스"
];

export const useUserStore = create<Store>((set) => ({
  userId: localStorage.getItem("userId"),
  userNickname: localStorage.getItem("userNickname"),

  initializeUserId: () => {
    let id = localStorage.getItem("userId");
    let nickname = localStorage.getItem("userNickname");
    if (!id || !nickname) {
      id = uuidv4();
      localStorage.setItem("userId", id);

      const randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)];
      const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
      nickname = `${randomAdj} ${randomAnimal}`;
      localStorage.setItem("userNickname", nickname);
    }
    set({ userId: id, userNickname: nickname });
  }
}));
