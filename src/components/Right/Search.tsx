import { styled } from 'styled-components';
import List from '../common/List';
import { getSearch } from '../../lib/API';
import { theme } from '../../../styles/theme';
import { useState } from 'react';

function Search() {
  // 테스트용 임시 데이터
  const content = [
    {
      amount: 100000,
      userId: 'user123',
      category: 'food',
      date: '2023-07-01T10:30:00.000Z'
    },
    {
      amount: 100000,
      userId: 'user123',
      category: 'food',
      date: '2023-07-01T10:30:00.000Z'
    },
    {
      amount: 100000,
      userId: 'user123',
      category: 'food',
      date: '2023-07-01T10:30:00.000Z'
    },
    {
      amount: 100000,
      userId: 'user123',
      category: 'food',
      date: '2023-07-01T10:30:00.000Z'
    },
    {
      amount: 100000,
      userId: 'user123',
      category: 'food',
      date: '2023-07-01T10:30:00.000Z'
    },
    {
      amount: 100000,
      userId: 'user123',
      category: 'food',
      date: '2023-07-01T10:30:00.000Z'
    },
    {
      amount: 100000,
      userId: 'user123',
      category: 'food',
      date: '2023-07-01T10:30:00.000Z'
    }
  ];
  const [result, setResult] = useState([]);
  const [keyword, setKeyword] = useState('');

  console.log('searchdata:', result);

  const inputChange = (e: any) => {
    setKeyword(e.target.value);
  };
  console.log('keyword:', keyword);

  const ButtonClick = () => {
    onSubmit();
  };
  const onSubmit = async (keyword: string, userId: string) => {
    const res = await getSearch(keyword, userId);
    setResult(res);
  };

  return (
    <Container>
      <TopContain>
        <Inputs>
          <Input
            placeholder="검색할 내역을 입력해주세요!"
            type="text"
            onChange={inputChange}
          />
          <SearchImg
            src="../public/imgs/search-grey.png"
            alt="검색로고"
            onClick={ButtonClick}
          />
        </Inputs>
        <Btns>
          <AllBtn>전체</AllBtn>
          <ImportBtn>수입</ImportBtn>
          <ExportBtn>지출</ExportBtn>
        </Btns>
      </TopContain>
      <ListContain>
        <List data={content} />
      </ListContain>
    </Container>
  );
}

const Container = styled.div`
  background-color: #ffffff;
  height: 100%;
  width: 100%;
  //background-color: ${theme.colors.orange}
`;
const TopContain = styled.div`
  width: 100%;
  height: 23%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;
const Inputs = styled.div`
  width: 400px;
  height: 60px;
  background-color: #f8f9fd;
  border-radius: 40px;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Input = styled.input`
  background-color: #f8f9fd;
  border: none;
  outline: none;
  font-size: 16px;
  width: 85%;
  &::placeholder {
    color: #a8b1ce;
  }
`;

const SearchImg = styled.img`
  width: 30px;
  height: 30px;
`;
const Btns = styled.div`
  display: flex;
  gap: 10px;
`;
const AllBtn = styled.button`
  width: 120px;
  height: 55px;
  border-radius: 40px;
  background-color: #2c3d8f;
  border: none;
  color: #ffffff;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
`;
const ImportBtn = styled.button`
  width: 120px;
  height: 55px;
  border-radius: 40px;
  background-color: #cddeff;
  border: none;
  color: #2c3d8f;
  font-size: 18px;
  font-weight: bold;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;
const ExportBtn = styled.button`
  width: 120px;
  height: 55px;
  border-radius: 40px;
  background-color: #cddeff;
  border: none;
  color: #2c3d8f;
  font-size: 18px;
  font-weight: bold;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;
const ListContain = styled.div`
  height: 77%;
  overflow-y: scroll;
`;

export default Search;
