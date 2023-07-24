import styled from 'styled-components'
import { useNavigate, useLocation } from 'react-router-dom'
import { theme } from 'style/index'

export const Footer = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const pathFinder = (p: string) => {
    const isCurrent = p === location.pathname
    if (isCurrent) {
      return 'active'
    }
    return
  }
  const map = new Map()
  map.set('/chart', '차트')
  map.set('/calendar', '달력')
  map.set('/list', '내역')
  map.set('/logaccount', '입력')

  return (
    <Wrapper>
      <Title
        onClick={() => navigate('/list')}
        className={pathFinder('/list')}>
        {map.get('/list')}
      </Title>
      <Title
        onClick={() => navigate('/calendar')}
        className={pathFinder('/calendar')}>
        {map.get('/calendar')}
      </Title>
      <Title
        onClick={() => navigate('/chart')}
        className={
          location.pathname === '/chart'
            ? pathFinder('/chart')
            : pathFinder('/subchart')
        }>
        {map.get('/chart')}
      </Title>
      <Title
        onClick={() => navigate('/logaccount')}
        className={pathFinder('/logaccount')}>
        {map.get('/logaccount')}
      </Title>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 0;
  left: 0;
  width: 100%;
  margin-bottom: 5px;
  background-color: ${props => props.theme.colors.background};
`

const Title = styled.div`
  height: 8vh;
  width: 10vw;
  font-size: 22px;
  margin: 22px;
  text-align: center;
  line-height: 8vh;
  border-radius: 10px;
  background-color: #fff;
  font-family: 'TheJamsil1Thin';

  &:hover {
    cursor: pointer;
  }
  &.active {
    background-color: ${props => props.theme.colors.primary};
    color: #fff;
    font-family: 'TheJamsil5Bold';
  }
  @media ${theme.laptop} {
    font-size: 20px;
    margin: 15px;
  }
  @media ${theme.tablet} {
    font-size: 14px;
    margin: 10px;
    padding: 0 10px;
  }
  @media ${theme.mobile} {
    font-size: 12px;
    margin: 10px;
    padding: 0 10px;
  }
`
