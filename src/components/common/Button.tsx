import { theme } from '@/styles/theme';
import styled, { css } from 'styled-components';

interface IButtonProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [props: string]: any;
}

function Button({ ...props }: IButtonProps) {
  return <StyledButton type="button" {...props} />;
}

const StyledButton = styled.button<{
  green?: boolean;
  lightgreen?: boolean;
  red?: boolean;
  $gray?: boolean;
}>`
  cursor: pointer;
  border-radius: 5px;

  ${(props) =>
    props.green &&
    css`
      background-color: ${theme.colors.green};
    `}
  ${(props) =>
    props.lightgreen &&
    css`
      background-color: ${theme.colors.lightGreen};
    `}
    ${(props) =>
    props.red &&
    css`
      background-color: ${theme.colors.red};
    `}
    ${(props) =>
    props.$gray &&
    css`
      color: ${theme.colors.gray[2]};
      background-color: ${theme.colors.gray[0]};
    `};
`;

export default Button;
