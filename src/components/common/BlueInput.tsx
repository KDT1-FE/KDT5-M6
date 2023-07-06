import styled from 'styled-components';
function BlueInput({ ...props }) {
  return <StyledInput {...props} />;
}

const StyledInput = styled.input`
  outline: none;
  padding: 6px;
  height: 40px;
  border-radius: 10px;
  background: #f8f9fd;
  border: none;

  &::placeholder {
    color: #a8b1ce;
  }
`;

export default BlueInput;
