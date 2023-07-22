// 소비 기록을 추가하거나 수정할 때 서버 요청 데이터
interface ExpenseData {
  amount: number;
  userId?: string;
  category: string;
  date: string;
}

// 소비 기록을 작성하는 요청이 성공하면 서버에서 반환하는 데이터
interface ExpenseResponse {
  message: string;
}

// 소비 가능한 품목 목록을 요청하는 서버 데이터
type CategoriesResponse = string[];

// 검색어에 해당하는 소비 품목과 금액을 조회하는 서버 요청 데이터
interface SearchResponseItem {
  _id: string;
  amount: number;
  userId: string;
  category: string;
  date: string;
}

type SearchResponse = SearchResponseItem[];

// 일별, 주별, 월별 소비 조회를 위한 서버 요청 데이터
interface SummaryResponseItem {
  _id: string;
  totalAmount: number;
}

type SummaryResponse = SummaryResponseItem[];

// 소비 기록을 수정하면 서버로부터 반환되는 응답 데이터
type UpdateResponse = {
  message: string;
};

// 소비 기록을 삭제하면 서버로부터 반환되는 응답 데이터
type DeleteResponse = {
  message: string;
};

// 소비 기록에 대한 서버로부터의 응답 데이터 타입 정의
interface CalendarResponse {
  [day: string]: ExpenseData;
}
