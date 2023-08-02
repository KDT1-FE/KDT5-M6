/* eslint-disable no-console */
import { API_URL, HEADERS, userId } from '@/lib/api/Base';

// 소비 기록 작성
export const createdExpense = async (data: ExpenseData) => {
  try {
    const res = await fetch(`${API_URL}/expenses`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({ ...data, userId }),
    });
    // 소비 기록 작성 성공
    if (res.ok) {
      const data: ExpenseResponse = await res.json();
      return data;
    }
    // 실패한 경우
    throw new Error('기록 작성에 실패했습니다.');
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 소비 품목 목록
export const expenseCategory = async () => {
  try {
    const res = await fetch(`${API_URL}/categories?userId=${userId}`, {
      method: 'GET',
      headers: HEADERS,
    });
    // 목록 호출 성공
    if (res.ok) {
      const data: CategoriesResponse = await res.json();
      return data;
    }
    // 실패한 경우
    throw new Error('카테고리를 불러오는데 실패했습니다.');
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 검색어에 해당하는 소비 항목 및 금액 조회
export const expenseSearch = async (keyword: string) => {
  try {
    const encodedKeyword = encodeURIComponent(keyword);
    const res = await fetch(
      `${API_URL}/expenses/search?q=${encodedKeyword}&userId=${userId}`,
      {
        method: 'GET',
        headers: HEADERS,
      },
    );

    // 성공
    if (res.ok) {
      const data: SearchResponse = await res.json();
      return data;
    }
    // 실패
    throw new Error('검색에 실패했습니다.');
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 일별, 주별, 월별 소비 조회
export const expenseSummary = async (period: string) => {
  try {
    const res = await fetch(
      `${API_URL}/expenses/summary?period=${period}&userId=${userId}`,
      {
        method: 'GET',
        headers: HEADERS,
      },
    );
    if (res.ok) {
      const data: SummaryResponseItem[] = await res.json();
      return data;
    }

    throw new Error('조회에 실패했습니다.');
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 소비 기록 수정
export const updatedRecord = async (id: string, data: ExpenseData) => {
  try {
    const res = await fetch(`${API_URL}/expenses/${id}`, {
      method: 'PUT',
      headers: HEADERS,
      body: JSON.stringify(data),
    });

    if (res.ok) {
      const data: UpdateResponse = await res.json();
      return data;
    }

    throw new Error('수정에 실패했습니다.');
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 소비 기록 삭제
export const deletedRecord = async (id: string) => {
  try {
    const res = await fetch(`${API_URL}/expenses/${id}`, {
      method: 'DELETE',
      headers: HEADERS,
    });

    if (res.ok) {
      const data: DeleteResponse = await res.json();
      return data;
    }

    throw new Error('삭제에 실패했습니다.');
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 소비 기록 달력 호출
export const calendarData = async (year: number, month: number) => {
  try {
    const res = await fetch(
      `${API_URL}/expenses/calendar?year=${year}&month=${month}&userId=${userId}`,
      {
        method: 'GET',
        headers: HEADERS,
      },
    );

    if (res.ok) {
      const data = await res.json();
      return data;
    }

    throw new Error('호출에 실패했습니다.');
  } catch (error) {
    console.error(error);
    throw error;
  }
};
