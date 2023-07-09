import React, { useState } from 'react';
import { styled } from 'styled-components';
import { theme } from '../../styles/theme';

interface ToggleButtonProps {
  toggled: boolean;
}

function Left() {
  const [toggled, setToggled] = useState(false);

  const handleToggle = () => {
    setToggled((prevToggled) => !prevToggled);
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
  positon: fixed;
  left: 0;
  top: 0;
  padding-top: 30%;
  padding-bottom: 30%;
  height: 100vh;
  widht: 100%;
  background-color: ${theme.colors.black};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h4`
  color: ${theme.colors.white};
`;

const ToggleButton = styled.button<ToggleButtonProps>`
  color: ${({ toggled }) =>
    toggled ? theme.colors.white : theme.colors.black}; // 수정된 부분
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
