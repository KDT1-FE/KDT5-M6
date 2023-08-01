import axios from "axios";
import { ExpenseReq, editExpenseReq } from "@/types/apiTypes";

const baseApi = axios.create({
  baseURL: "https://chickenlecture.xyz/api",
  headers: {
    "Content-Type": "application/json"
  }
});

// 1. 소비 기록 작성
export const postExpense = async (requestBody: ExpenseReq) => {
  try {
    const res = await baseApi.post("/expenses", requestBody);
    if (res.status === 201) {
      return res.data;
    }
  } catch (e) {
    console.error("소비 기록 작성 실패", e);
    throw new Error("가계 추가가 실패했습니다.");
  }
};

// 2. 모든 카테고리 목록 조회
export const getCategories = async (userId: string) => {
  try {
    const res = await baseApi.get(`/categories?userId=${userId}`);
    if (res.status === 200) {
      return res.data;
    }
  } catch (e) {
    console.error("모든 카테고리 조회 실패", e);
    throw new Error("모든 카테고리 조회에 실패했습니다.");
  }
};

// 3. 검색어에 해당하는 소비 항목 및 금액 조회 (전체 데이터 조회도 가능)
export const searchExpenses = async (keyword: string, userId: string) => {
  try {
    const res = await baseApi.get(`/expenses/search?q=${keyword}&userId=${userId}`);
    if (res.status === 200) {
      return res.data;
    }
  } catch (e) {
    console.error("특정 카테고리 소비 항목 조회 실패", e);
    throw new Error("특정 카테고리 소비 항목 조회에 실패했습니다.");
  }
};

// 4. 기간별 소비 조회
export const getPeriodSummary = async (period: string, userId: string) => {
  try {
    const res = await baseApi.get(`/expenses/summary?period=${period}&userId=${userId}`);
    if (res.status === 200) {
      return res.data;
    }
  } catch (e) {
    console.error("기간별 소비 조회 실패", e);
    throw new Error("기간별 소비 조회에 실패했습니다.");
  }
};

// 5. 소비 기록 수정
export const editExpense = async (requestBody: editExpenseReq, _id: string) => {
  try {
    const res = await baseApi.put(`/expenses/${_id}`, requestBody);
    if (res.status === 200) {
      return res.data;
    }
  } catch (e) {
    console.error("소비 기록 수정 실패", e);
    throw new Error("소비기록 수정에 실패했습니다.");
  }
};

// 6. 소비 기록 삭제
export const deleteExpense = async (_id: string) => {
  try {
    const res = await baseApi.delete(`/expenses/${_id}`);
    if (res.status === 200) {
      return res.data;
    }
  } catch (e) {
    console.error("소비 기록 삭제 실패", e);
    throw new Error("소비기록 삭제에 실패했습니다.");
  }
};

// 7. 소비 기록 달력 호출
export const getCalendar = async (year: number, month: number, userId: string) => {
  try {
    const res = await baseApi.get(`/expenses/calendar?year=${year}&month=${month}&userId=${userId}`);
    if (res.status === 200) {
      return res.data;
    }
  } catch (e) {
    console.error("소비 기록 달력 호출 실패", e);
    throw new Error("소비 기록 달력 호출에 실패했습니다.");
  }
};
