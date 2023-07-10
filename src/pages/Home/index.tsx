import { useState } from 'react';
import './search.scss';
import { Input, Modal } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

interface ResultType {
  id: number;
  date: string;
  category: string;
  amount: number;
}

export default function Home() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchError, setSearchError] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [searchResults, setSearchResults] = useState<ResultType[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchKeyword.trim() === "") {
      setSearchError("검색어를 입력해주세요.");
      return;
    }

    try {
      const response = await fetch(
        `http://52.78.195.183:3003/api/expenses/search?q=${searchKeyword}&userId=team3`
      );
      const data = await response.json();
      console.log(data);

      setSearchResults(data);
      setSearchKeyword("");
      setSearchError("");
      setModalVisible(true);
    } catch (error) {
      console.error(error);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setSearchResults([]);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="searchBox">
        <div className="inputWrapper">
          <Input
            className="customInput"
            placeholder="Search"
            value={searchKeyword}
            onChange={(e) => {
              setSearchKeyword(e.target.value);
              setSearchError("");
            }}
            prefix={<SearchOutlined />}
          />
        </div>
        {searchError && <p>{searchError}</p>}
      </form>
      
      <Modal
        title="검색 결과"
        visible={modalVisible}
        onCancel={closeModal}
        footer={null}
      >
        {searchResults.length === 0 ? (
          <p>No results found.</p>
        ) : (
          searchResults.map((result, index) => (
            <div key={result.id}>
              <p>물품: {result.category}</p>
              <p>가격: {result.amount}</p>
              <p>결제 날짜: {new Date(result.date).toLocaleDateString('en-GB', { year: '2-digit', month: '2-digit', day: '2-digit' }).split('/').reverse().join('/')} {new Date(result.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</p>
              {index !== searchResults.length - 1 && <hr />} {/* 구분선 */}
            </div>
          ))
        )}
      </Modal>
    </>
  );
}

