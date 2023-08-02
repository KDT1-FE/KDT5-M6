/* eslint-disable no-unused-vars */
import { useState } from 'react';
import styled from 'styled-components';

interface Option {
  label: string;
  icon: React.ReactNode;
}

interface DropdownProps {
  options: Option[];
  onSelect: (selectedOption: string) => void;
  tag?: string;
}

function Dropdown({
  options,
  onSelect,
  tag = '태그를 선택하세요.',
}: DropdownProps) {
  const [isClosed, setIsClosed] = useState(true); // 드롭다운 형식을 여닫는 상태관리
  const [selectedOption, setSelectedOption] = useState(tag); // tag를 선택하기 전 초기값

  // 드롭다운 메뉴를 토글식으로
  const toggleDropdown = () => {
    setIsClosed(!isClosed);
  };

  // 태그를 선택하면 selectedOption값으로 선택한 option의 label을 전달
  // 그리고 드롭다운 메뉴 닫힘
  // 상위 컴포넌트로 option.label을 전달
  const handleOptionSelect = (option: Option) => {
    setSelectedOption(option.label);
    setIsClosed(!isClosed);
    onSelect(option.label);
  };

  return (
    <DropdownWrapper onClick={toggleDropdown}>
      <Title>{selectedOption}</Title>
      <Menu $closed={isClosed ? 'true' : undefined}>
        <ItemBoard>
          {/*전달 받은 options 배열을 map메서드를 이용해서 각각의 label과 icon을 렌더링되게*/}
          {options.map((option: Option, index: number) => (
            <MenuItem key={index} onClick={() => handleOptionSelect(option)}>
              <IconWrapper>{option.icon}</IconWrapper>
              <Label>{option.label}</Label>
            </MenuItem>
          ))}
        </ItemBoard>
      </Menu>
    </DropdownWrapper>
  );
}

const DropdownWrapper = styled.div`
  transition: all 0.2s ease-in-out;
  overflow: hidden;
  margin: 30px;
  background: rgb(248, 248, 248);
  border: solid 1px rgb(222, 222, 222);
  width: 320px;
  cursor: pointer;
  text-align: center;
`;

const Title = styled.h2`
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Menu = styled.div<{ $closed?: string | undefined }>`
  margin: 0;
  padding: 0;
  list-style-type: none;
  height: ${(props) => (props.$closed === 'true' ? '0px' : 'auto')};
`;

const ItemBoard = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 16px;
  padding: 14px 10px;
  flex: 1 0 24%;
  margin: 0.5%;

  &:hover {
    color: red;
  }
`;

const IconWrapper = styled.div`
  margin-bottom: 8px;
`;

const Label = styled.span`
  font-size: 12px;
`;

export default Dropdown;
