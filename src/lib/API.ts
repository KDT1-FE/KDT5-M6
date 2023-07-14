import axios from 'axios';

// API 공통 영역 변수
const api = axios.create({
  baseURL: 'http://52.78.195.183:3003/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// 기록 작성 및 수정용 interface
export interface IContent {
  amount: number;
  userId: string;
  category: string;
  date: string;
}
export interface IContentExtend extends IContent {
  _id: string;
  __v: number;
}

// 소비 기록 작성
const postData = async (content: IContent) => {
  const res = await api({ method: 'POST', url: '/expenses', data: content });
  return res.data;
};

// 소비 품목 목록 조회
const getCategory = async (userId: string) => {
  const res = await api.get(`/categories?userId=${userId}`);
  return res.data;
};

// 검색어에 해당하는 소비 항목 및 금액 조회
const getSearch = async (keyword: string, userId: string) => {
  const res = await api.get(`/expenses/search?q=${keyword}&userId=${userId}`);
  return res.data;
};

// 일별, 주별, 월별 소비 조회
const getPeriod = async (period: string, userId: string) => {
  const res = await api.get(
    `/expenses/summary?period=${period}&userId=${userId}`
  );
  return res.data;
};

// 소비 기록 수정
const editData = async (contentId: string, content: IContent) => {
  const res = await api({
    method: 'PUT',
    url: `/expenses/${contentId}`,
    data: content
  });
  return res.data;
};

// 소비 기록 삭제
const delData = async (contentId: string) => {
  const res = await api.delete(`/expenses/${contentId}`);
  return res.data;
};

// 소비 기록 달력 호출
const getCalendar = async (year: number, month: number, userId: string) => {
  const res = await api.get(
    `/expenses/calendar?year=${year}&month=${month}&userId=${userId}`
  );
  return res.data;
};

export {
  postData,
  getCategory,
  getSearch,
  getPeriod,
  editData,
  delData,
  getCalendar
};
