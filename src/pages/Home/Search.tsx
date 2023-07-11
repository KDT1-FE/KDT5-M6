import { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Typography, Divider, Input, Modal, AutoComplete } from 'antd';
import { formatPaymentDate } from '@/utils/formatPaymentDate';

const { Text } = Typography;

interface ResultType {
  _id: number;
  date: string;
  category: string;
  amount: number;
}

export default function Home() {
  // 검색어와 관련된 상태 변수들
  const [searchKeyword, setSearchKeyword] = useState(''); // 현재 검색어 상태를 저장
  const [searchError, setSearchError] = useState(''); // 검색 오류 메시지 상태
  const [open, setOpen] = useState(false); // 모달의 표시 여부를 제어하는 상태
  const [searchResults, setSearchResults] = useState<ResultType[]>([]); // 검색 결과를 저장하는 상태
  const [autoCompleteOptions, setAutoCompleteOptions] = useState<
    { value: string }[]
  >([]); // 자동완성 옵션을 저장하는 상태

  // 검색어를 제출하는 핸들러 함수
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchKeyword.trim() === '') {
      setSearchError('검색어를 입력해주세요.');
      return;
    }
    try {
      const response = await fetch(
        `http://52.78.195.183:3003/api/expenses/search?q=${searchKeyword}&userId=team3`,
      );
      const data = await response.json();
      console.log(data);
      setSearchResults(data);
      setSearchKeyword(''); // 입력한 검색어 초기화
      setSearchError('');
      setOpen(true);
    } catch (error) {
      console.error(error);
    }
  };
  // 자동완성 검색을 처리하는 핸들러 함수
  const handleAutoCompleteSearch = async (text: string) => {
    setSearchKeyword(text);

    if (text.trim() === '') {
      setAutoCompleteOptions([]);
      return;
    }
    try {
      const response = await fetch(
        `http://52.78.195.183:3003/api/expenses/search?q=${text}&userId=team3`,
      );
      const data = await response.json();
      // 자동완성 데이터를 받아온 후, 추가적인 필터링 작업 수행
      const filteredOptions = data.filter((item: ResultType) => {
        const category = item.category.toLowerCase();
        const keyword = text.toLowerCase();
        return category.includes(keyword) && category !== keyword;
      });
      // 자동완성 옵션 설정
      const formattedOptions = filteredOptions.map((item: ResultType) => ({
        value: item.category,
      }));
      setAutoCompleteOptions(formattedOptions);
    } catch (error) {
      console.error(error);
    }
  };

  // 자동완성 옵션을 선택했을 때 처리하는 핸들러 함수
  const handleAutoCompleteSelect = async (value: string) => {
    setSearchKeyword(value);
    setOpen(true);
    try {
      const response = await fetch(
        `http://52.78.195.183:3003/api/expenses/search?q=${value}&userId=team3`,
      );
      const data = await response.json();
      // 선택된 키워드와 일치하는 결과만 필터링
      const filteredResults = data.filter(
        (result: ResultType) =>
          result.category.toLowerCase() === value.toLowerCase(),
      );
      setSearchResults(filteredResults);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{ position: 'absolute', top: '30px', right: '40px' }}
      >
        <div className="inputWrapper">
          <AutoComplete
            options={autoCompleteOptions}
            onSearch={handleAutoCompleteSearch}
            onSelect={handleAutoCompleteSelect}
            value={searchKeyword}
            popupClassName="searchDropdown"
            popupMatchSelectWidth={false}
          >
            <Input
              prefix={<SearchOutlined />}
              style={{ flex: '1', padding: '10px' }}
              placeholder="Search"
            />
          </AutoComplete>
        </div>
        <Text type="danger">{searchError}</Text>
      </form>
      <Modal
        title="검색 결과"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        {searchResults.length === 0 ? (
          <Text>No results found.</Text>
        ) : (
          searchResults.map((result: ResultType, index: number) => (
            <div key={result._id}>
              <Text>{'물품: ' + result.category}</Text>
              <br />
              <Text>{'가격: ' + result.amount}</Text>
              <br />
              <Text>{'결제 날짜: ' + formatPaymentDate(result.date)}</Text>
              {index !== searchResults.length - 1 && <Divider />}
            </div>
          ))
        )}
      </Modal>
    </>
  );
}
