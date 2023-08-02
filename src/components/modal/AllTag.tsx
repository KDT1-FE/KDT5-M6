/* eslint-disable no-unused-vars */
import { useState } from 'react';
import styled from 'styled-components';
import { tags } from '@/lib/utils/Tags';

interface Option {
  label: string;
  icon: React.ReactNode;
}

interface AllTagProps {
  handleTagChange: (tags: string) => void;
}

function AllTag({ handleTagChange }: AllTagProps) {
  const [isClosed, setIsClosed] = useState(true); // 드롭다운 형식을 여닫는 상태관리

  // 태그를 선택하면 selectedOption값으로 선택한 option의 label을 전달
  // 그리고 드롭다운 메뉴 닫힘
  // 상위 컴포넌트로 option.label을 전달
  const handleOptionSelect = (option: Option) => {
    setIsClosed(!isClosed);
    handleTagChange(option.label);
  };
  return (
    <>
      <Title>검색할 태그를 선택하세요.</Title>
      <ItemBoard>
        {/*전달 받은 options 배열을 map메서드를 이용해서 각각의 label과 icon을 렌더링되게*/}
        {tags.map((option: Option, index: number) => (
          <MenuItem key={index} onClick={() => handleOptionSelect(option)}>
            <IconWrapper>{option.icon}</IconWrapper>
            <Label>{option.label}</Label>
          </MenuItem>
        ))}
      </ItemBoard>
    </>
  );
}

const Title = styled.h2`
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ItemBoard = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const MenuItem = styled.div`
  margin: 0.5%;
  flex: 1 0 24%;
  display: flex;
  font-size: 16px;
  padding: 14px 10px;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  &:hover {
    color: red;
    cursor: pointer;
    transform: scale(1.1);
  }
`;

const IconWrapper = styled.div`
  margin-bottom: 0.5rem;
`;

const Label = styled.span`
  font-size: 12px;
`;

export default AllTag;
