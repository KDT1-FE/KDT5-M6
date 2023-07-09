import { styled } from 'styled-components';
import { theme } from '../../styles/theme';

function Left() {
  return <LeftContainer></LeftContainer>;
}

const LeftContainer = styled.div`
  positon: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  widht: 100%;
  background-color: ${theme.colors.black};
`;

export default Left;
