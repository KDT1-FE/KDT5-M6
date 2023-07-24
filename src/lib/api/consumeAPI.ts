import client from "./client";

// 소비 내역 작성(POST)
interface IPostExpenses {
  amount: number;
  userId: string;
  category: string;
  date: string;
}
export const postConsume = async ({
  amount,
  userId,
  category,
  date,
}: IPostExpenses) => {
  const result = await client.post("/api/expenses", {
    amount,
    userId,
    category,
    date,
  });
  return result.data;
};

// 소비 품목 API(GET)
export const getConsume = (userId: string) => {
  const result = client.get(`api/categories?userId=${userId}`);
  return result;
};

// 검색어에 해당하는 소비 항목 및 금액 조회 API(GET)
interface IGetSearchConsume {
  keyword: string;
  userId: string;
}
export const getSearchConsume = ({ keyword, userId }: IGetSearchConsume) => {
  const result = client.get(
    `api/expenses/search?q=${keyword}&userId=${userId}`,
  );
  return result;
};

// 일별, 주별, 월별 소비 조회 API(GET)
export const getPeriodConsume = (period: string, userId: string) => {
  const result = client.get(
    `api/expenses/summary?period=${period}&userId=${userId}`,
  );
  return result;
};

// 소비 기록 수정 API(PUT)
interface IPutEditConsume {
  id: string;
  amount: number;
  userId: string;
  category: string;
  date: string;
}

export const putEditConsume = ({
  id,
  amount,
  userId,
  category,
  date,
}: IPutEditConsume) => {
  client.put(`/api/expenses/${id}`, { amount, userId, category, date });
};

// 소비 기록 삭제 API(DELETE)
interface IDeleteConsume {
  id: string;
}
export const deleteConsume = async ({ id }: IDeleteConsume) => {
  const result = await client.delete(`api/expenses/${id}`);
  return result.data;
};

// 소비 달력 호출 API(GET)
interface IGetCalendarConsume {
  year: number;
  month: number;
  userId: string;
}
export const getCalendarConsume = ({
  year,
  month,
  userId,
}: IGetCalendarConsume) => {
  const response = client.get(
    `/api/expenses/calendar?year=${year}&month=${month}&userId=${userId}`,
  );
  return response;
};
