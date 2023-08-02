import { Outlet } from 'react-router-dom';
import { styled } from 'styled-components';

function Layout() {
  return (
    <Container>
      <Outlet />
    </Container>
  );
}
const Container = styled.div`
  height: 100vh;
  margin: 0 auto;
  max-width: 480px;
  overflow-y: auto;
  overflow-x: hidden;
`;

export default Layout;
