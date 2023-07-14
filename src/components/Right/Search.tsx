import { styled } from 'styled-components';
import List from '../common/List';
import { IContentExtend, getSearch } from '../../lib/API';
import { theme } from '../../styles/theme';
import { ChangeEvent, useState } from 'react';

interface IReadProps {
  selectedDate: string;
}

function Search({ selectedDate }: IReadProps) {
  const [content, setContent] = useState<IContentExtend[]>([]);
  const [keyword, setKeyword] = useState('');
  const [filter, setFilter] = useState(0);

  // 입력된 값을 state에 저장
  const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  // 버튼 클릭시 클릭 이벤트 실행
  const ButtonClick = () => {
    onSubmit(keyword, 'user123');
  };

  // 검색시 해당 검색내용 state에 저장
  const onSubmit = async (keyword: string, userId: string) => {
    const res = await getSearch(keyword, userId);
    setContent(res);
  };

  // Enter 입력이 되면 클릭 이벤트 실행
  const OnKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSubmit(keyword, 'user123');
    }
  };

  return (
    <Container>
      <TopContain>
        <Inputs>
          <Input
            placeholder="검색할 내역을 입력해주세요!"
            type="text"
            onChange={inputChange}
            onKeyDown={OnKeyPress}
          />
          <SearchImg
            src="../public/imgs/search-grey.png"
            alt="검색로고"
            onClick={ButtonClick}
          />
        </Inputs>
        <Btns>
          {[
            [0, '전체'],
            [1, '수입'],
            [-1, '지출']
          ].map((i, index) => {
            if (filter == i[0]) {
              return (
                <ActiveBtn
                  key={index}
                  onClick={() => {
                    setFilter(parseInt(i[0].toString()));
                  }}
                >
                  {i[1]}
                </ActiveBtn>
              );
            } else {
              return (
                <UnactiveBtn
                  key={index}
                  onClick={() => {
                    setFilter(parseInt(i[0].toString()));
                  }}
                >
                  {i[1]}
                </UnactiveBtn>
              );
            }
          })}
        </Btns>
        <Count>총 {content.length}건</Count>
      </TopContain>
      <ListContain>
        <List
          data={
            filter == 0
              ? content
              : filter == 1
              ? content.filter((i) => i.amount >= 0)
              : content.filter((i) => i.amount < 0)
          }
          selectedDate={selectedDate}
          getContent={ButtonClick}
        />
      </ListContain>
    </Container>
  );
}

const Count = styled.div`
  color: ${theme.colors.black.black50};
  width: 100%;
  font-size: 1rem;
  font-weight: 500;
  padding: 0 30px;
  margin-top: 20px;
`;
const Container = styled.div`
  background-color: ${theme.colors.white};
  height: 100%;
  width: 100%;
`;
const TopContain = styled.div`
  width: 100%;
  height: 25%;
  gap: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Inputs = styled.div`
  position: relative;
  width: 90%;
  height: 60px;
  margin-top: 20px;
  padding: 15px;
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Input = styled.input`
  width: 100%;
  height: 60px;
  background-color: ${theme.colors.gray[2]};
  border: none;
  border-radius: 40px;
  outline: none;
  font-size: 1rem;
  padding: 0 48px 0 20px;
  &::placeholder {
    color: ${theme.colors.gray[1]};
  }
  &:focus {
    border: 1px solid ${theme.colors.blue.pressed};
    box-shadow: 2px 2px 10px ${theme.colors.blue.pressed};
    transition: all 0.1s;
  }
`;

const SearchImg = styled.img`
  position: absolute;
  right: 30px;
  width: 30px;
  height: 30px;
  cursor: pointer;
`;
const Btns = styled.div`
  width: 100%;
  padding: 0 8%;
  display: flex;
  gap: 10px;
`;
const ActiveBtn = styled.button`
  width: 100%;
  min-width: 70px;
  height: 55px;
  border-radius: 40px;
  background-color: ${theme.colors.blue.pressed};
  border: none;
  color: ${theme.colors.white};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
`;
const UnactiveBtn = styled.button`
  width: 100%;
  min-width: 70px;
  height: 55px;
  border-radius: 40px;
  background-color: ${theme.colors.blue.bg};
  border: none;
  color: ${theme.colors.blue.pressed};
  font-size: 1rem;
  font-weight: 800;
  box-shadow: 2px 2px 5px ${theme.colors.gray[2]};
  cursor: pointer;
  &:hover {
    transition: all 0.3s;
    color: ${theme.colors.white};
    font-weight: 600;
    background-color: ${theme.colors.blue.pressed};
  }
`;

const ListContain = styled.div`
  height: 75%;
  width: 95%;
  margin: auto;
  margin-top: 10px;
  overflow-y: scroll;
`;

export default Search;
