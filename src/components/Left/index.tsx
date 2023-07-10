import React, { useState } from 'react';
import { styled } from 'styled-components';
import { theme } from '../../styles/theme';

interface ToggleButtonProps {
  toggled: boolean;
}
// LeftProps 타입 추가 및 setToggle 상태 업데이트
interface LeftProps {
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}
function Left({ setToggle }: LeftProps) {
  const [toggled, setToggled] = useState(false);

  // Middle 컴포넌트의 화면 전환 함수 (토글 버튼의 동작을 제어)
  const handleToggle = () => {
    // Left 컴포넌트 내의 toggled 상태를 업데이트하는 함수
    setToggled((prevToggled) => !prevToggled);
    // App 컴포넌트로부터 전달받은 setToggle 함수를 호출하여 상태를 업데이트하는 함수
    setToggle((prevToggle) => !prevToggle);
  };

  return (
    <LeftContainer>
      <Logo>WalletKeeper</Logo>
      <ToggleButton toggled={toggled} onClick={handleToggle}>
        <ToggleButtonText toggled={toggled}>
          {toggled ? 'calendar' : 'chart'}
        </ToggleButtonText>
      </ToggleButton>
    </LeftContainer>
  );
}

const LeftContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 138px;
  background-color: ${theme.colors.black};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h4`
  position: relative;
  top: 8%;
  font-family: 'poppins';
  font-weight: 800;
  color: ${theme.colors.white};
`;

const ToggleButton = styled.button<ToggleButtonProps>`
  position: relative;
  bottom: 8%;
  color: ${({ toggled }) =>
    toggled ? theme.colors.white : theme.colors.black};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 132px;
  background-color: ${({ toggled }) =>
    toggled ? theme.colors.blue.main : theme.colors.blue.main};
  border-radius: 40px;
  border: none;
  outline: none;
  cursor: pointer;
  position: relative;
  transition: background-color 0.3s ease;

  &:before {
    content: '';
    position: absolute;
    top: 5px;
    left: 5px;
    width: 50px;
    height: 50px;
    background-color: ${theme.colors.black};
    border-radius: 50%;
    transition: transform 0.3s ease;
    transform: translateY(${({ toggled }) => (toggled ? '70px' : '0')});
    box-shadow: 3px 3px 5px ${theme.colors.blue.pressed};
  }
`;
const ToggleButtonText = styled.span<ToggleButtonProps>`
  font-family: 'poppins';
  color: ${({ toggled }) =>
    toggled ? theme.colors.white : theme.colors.white};
  writing-mode: vertical-lr;
  transform: rotate(-180deg);
`;

export default Left;
