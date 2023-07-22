import React from 'react';
import styled from 'styled-components';
interface OnPeriodProps {
  onPeriodChange: (value: string) => void;
}

const SelectPeriod: React.FC<OnPeriodProps> = ({ onPeriodChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    onPeriodChange(value);
    e.target.blur();
  };

  return (
    <StyledSelectPeriod onChange={handleChange}>
      <option value="monthly">
        월간
      </option>
      <option>
        기간선택
      </option>
    </StyledSelectPeriod>
  );
};

export default SelectPeriod;

const StyledSelectPeriod = styled.select`
  width: 120px;
  height: 30px;
  font-size: 20px;
  text-align: center;
`