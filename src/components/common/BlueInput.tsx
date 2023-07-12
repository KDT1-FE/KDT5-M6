import styled, { css } from 'styled-components';
function BlueInput({ ...props }) {
  return <StyledInput {...props} />;
}

const StyledInput = styled.input<{
  $small?: boolean;
  $middle?: boolean;
  $large?: boolean;
}>`
  border: none;
  height: 40px;
  outline: none;
  color: #4464ff;
  padding: 6px 12px;
  border-radius: 40px;
  background: #f8f9fd;

  &::placeholder {
    color: #a8b1ce;
  }

  &:focus {
    box-shadow: 0 0 3px #4464ff;
  }

  ${(props) =>
    props.$small &&
    css`
      width: 300px;
    `}

  ${(props) =>
    props.$middle &&
    css`
      width: 330px;

      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }
    `}

  ${(props) =>
    props.$large &&
    css`
      width: 408px;
    `}
`;

export default BlueInput;
