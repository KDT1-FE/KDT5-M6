import { useState, useEffect, useMemo } from 'react';
import { Typography, AutoComplete } from 'antd';
import { SearchResultType } from '@/types/search';
import SearchResultModal from './SearchResultModal';
import { API_BASE_URL } from '@/data/constants';

const { Text } = Typography;

interface SearchProps {
  togglefetch: boolean;
  dailyExpenses: SearchResultType[];
  setValue: React.Dispatch<React.SetStateAction<Date>>;
  setDailyExpenseModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function Search({
  dailyExpenses,
  togglefetch,
  setValue,
  setDailyExpenseModalOpen,
}: SearchProps) {
  // userId 환경변수
  const userId = useMemo(() => import.meta.env.VITE_USER_ID, []);
  // 검색어를 입력하는 상태 변수와 검색 결과를 저장하는 상태 변수, 검색 오류 메세지 표시 상태 변수
  const [searchKeyword, setSearchKeyword] = useState(''); // 입력되는 검색 키워드
  const [searchResults, setSearchResults] = useState<SearchResultType[]>([]); // 검색 결과를 저장하는 상태
  const [searchErrorMessage, setSearchErrorMessage] = useState(''); // 검색 오류 메세지
  // 검색 결과 모달 창 상태 변수
  const [searchResultModalOpen, setSearchResultModalOpen] = useState(false); // 검색 모달 열림 닫힘 상태
  // 검색 카테고리와 자동완성을 위한 옵션 상태 변수
  const [searchCategories, setSearchCategories] = useState<string[]>([]); // 중복이 제거된 검색 카테고리들 ['food', 'pet food', 'mac book', ...] // 중복이 제거된 카테고리 데이터를 가져옴 [ "aws", 'food' ....;]
  const [autoCompleteOptions, setAutoCompleteOptions] = useState<
    { value: string }[]
  >([]); // 자동완성에 들어갈 값들 [{value: 'food'}, {value: 'pet food'}, {value: 'mac book'}]

  // 검색 카테고리 데이터를 가져오는 API 호출
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/categories?userId=${userId}`,
        );
        if (!response.ok) {
          console.log('서버로 응답이 왔는데 이상한게 옴');
          return;
        }
        const data: string[] = await response.json();
        setSearchCategories(data);
      } catch (error) {
        console.error(error, '서버로 응답이 안옴');
      }
    };
    fetchData();
  }, [userId, togglefetch]);

  // 검색어를 이용하여 자동완성 옵션 업데이트
  // 검색 키워드의 변화가 발생하면 autoCompleteOptions을 다음과 같이 바꿈
  useEffect(() => {
    const filtered = !searchKeyword
      ? [] // 검색 키워드를 입력하지 않은 경우에는 빈 배열을 반환
      : searchCategories // 검색 키워드를 입력한 경우
          .filter((category) =>
            category.toLowerCase().includes(searchKeyword.toLowerCase()),
          )
          .map((item) => ({ value: item })); // 대소문자 구분 없이 원래의 값 그대로 저장
    setAutoCompleteOptions(filtered); // 자동완셩 옵션(autoCompleteOption)값으로 지정
  }, [searchCategories, searchKeyword]);

  // 검색어를 제출하는 핸들러 함수
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchKeyword.trim() === '') {
      setSearchErrorMessage('검색어를 입력해주세요.');
      setTimeout(() => {
        setSearchErrorMessage('');
      }, 2000);
      return;
    }
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/expenses/search?q=${searchKeyword}&userId=${userId}`,
      );
      if (!response.ok) {
        console.log('서버로 응답이 왔는데 이상한게 옴');
        return;
      }
      const data = await response.json();
      setSearchResults(data);
      setSearchKeyword(''); // 입력한 검색어 초기화
      setSearchResultModalOpen(true);
    } catch (error) {
      console.error(error, '서버로 부터 응답이 안옴');
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{ position: 'absolute', top: 20, right: 30 }}
      >
        <AutoComplete
          options={autoCompleteOptions}
          onChange={(value: string) => {
            setSearchKeyword(value);
          }}
          value={searchKeyword}
          placeholder="Search"
          style={{ display: 'block', width: 200 }}
        />
        <Text
          type="danger"
          style={{ fontSize: 10, padding: '3px 10px', display: 'block' }}
        >
          {searchErrorMessage}
        </Text>
      </form>
      <SearchResultModal
        setDailyExpenseModalOpen={setDailyExpenseModalOpen}
        setValue={setValue}
        dailyExpenses={dailyExpenses}
        searchResultModalOpen={searchResultModalOpen}
        searchResults={searchResults}
        setSearchResultModalOpen={setSearchResultModalOpen}
      />
    </>
  );
}
