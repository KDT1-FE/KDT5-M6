import { Outlet } from 'react-router-dom'
import { Header, BottomNav } from 'components/index'
import styled from 'styled-components'
import GlobalStyle from '@/GlobalStyle'

export const Layout = () => {
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Container>
          <OutletWrapper hasHeader={false}>
            <Outlet />
          </OutletWrapper>
          <BottomNav />
        </Container>
      </Wrapper>
    </>
  )
}

export const HeaderLayout = () => {
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Container>
          <Header />
          <OutletWrapper hasHeader={true}>
            <Outlet />
          </OutletWrapper>
          <BottomNav />
        </Container>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  background-color: var(--color-bg);
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  max-width: 768px;
  margin-left: auto;
  margin-right: auto;
  background-color: var(--color-white);
  min-height: 100vh;
`

const OutletWrapper = styled.div<{ hasHeader: boolean }>`
  flex-grow: 1;
  margin-top: ${props => (props.hasHeader ? `56px` : `0`)};
  background-color: ${props => (props.hasHeader ? `var(--color-white);` : `var(--color-primary);`)};
  margin-bottom: 64px;
`
