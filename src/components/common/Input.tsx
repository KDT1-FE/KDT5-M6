import React from 'react';
import styled from 'styled-components';

interface InputProps {
  maxLength?: number;
  placeholder?: string;
  type?: string;
  name?: string;
  value?: string | number;
  id?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
}

export const Input = ({
  placeholder,
  type,
  name,
  value,
  maxLength,
  onChange,
  className,
}: InputProps) => {
  return (
    <StyledInput
      maxLength={maxLength}
      placeholder={placeholder}
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className={className}
    />
  );
}

const StyledInput = styled.input`
  width: 100%;
  padding: 1rem 0.75rem;
  margin-bottom: 5px;
  border: 1px solid #A1A1A1;
  &:focus {
    outline: none;
  }
`;
