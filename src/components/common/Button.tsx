import styled from "styled-components";

interface IButtonProps {
  [rest: string]: any;
}

function Button({ ...rest }: IButtonProps) {
  return <StyledButton {...rest} />;
}

const StyledButton = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 8px;
  background: ${(props) => props.theme.buttonColor};
  color: ${(props) => props.theme.buttonTextColor};
  width: 200px;
  height: 40px;
  font-size: 20px;
`;

export default Button;
