/* eslint-disable no-unused-vars */
import { ChangeEvent, useRef, useEffect } from 'react';
import styled from 'styled-components';

interface ExpensesAmountProps {
  amount: number;
  handleAmountChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function ExpensesAmount({ amount, handleAmountChange }: ExpensesAmountProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <AmountContainer>
      <Won>&#8361;</Won>
      <AmountInput
        ref={inputRef}
        dir="rtl"
        type="text"
        value={amount.toLocaleString()}
        onChange={handleAmountChange}
      />
    </AmountContainer>
  );
}

const AmountContainer = styled.div`
  width: 150px;
  border-bottom: 1px solid;
  display: flex;
  justify-content: space-between;
  line-height: 1.5;
`;

const Won = styled.span``;

const AmountInput = styled.input`
  border: none;
  width: 100px;

  &:focus {
    border: none;
    outline: none;
    font-weight: bold;
  }
`;

export default ExpensesAmount;
