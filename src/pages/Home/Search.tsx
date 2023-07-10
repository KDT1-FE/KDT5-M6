import { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Typography, Divider, Input, Modal } from 'antd';
import { formatPaymentDate } from '@/utils/formatPaymentDate';

const { Text } = Typography;

interface ResultType {
  _id: number;
  date: string;
  category: string;
  amount: number;
}

export default function Home() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchError, setSearchError] = useState('');
  const [open, setOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<ResultType[]>([]);

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
      setSearchKeyword('');
      setSearchError('');
      setOpen(true);
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
          <Input
            style={{ padding: '10px' }}
            placeholder="Search"
            value={searchKeyword}
            onChange={(e) => {
              setSearchKeyword(e.target.value);
              setSearchError('');
            }}
            prefix={<SearchOutlined />}
          />
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
          searchResults.map((result, index) => (
            <div key={result._id}>
              <Text>{'물품: ' + result.category}</Text>
              <br />
              <Text>{'가격: ' + result.amount}</Text>
              <br />
              <Text>{'결제 날짜: ' + formatPaymentDate(result.date)}</Text>
              {index !== searchResults.length - 1 && <Divider />} {/* 구분선 */}
            </div>
          ))
        )}
      </Modal>
    </>
  );
}
