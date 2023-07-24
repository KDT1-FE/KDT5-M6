import styled from 'styled-components'
import { ChevronLeftIcon } from '@heroicons/react/outline'
import { useNavigate } from 'react-router-dom'
const Wrapper = styled.div`
  display: flex;
  background-color: ${props => props.theme.colors.background};
  padding: 60px;
  justify-content: center;
  .backwards {
    width: 24px;
    height: 24px;
    margin: auto 0;
    padding: 0 20px;
    cursor: pointer;
    box-sizing: content-box;
  }
  .pathname {
    vertical-align: baseline;
    font-size: 50px;
    letter-spacing: -2px;
    font-family: 'TheJamsil5Bold';
  }
  @media ${props => props.theme.mobile} {
    .backwards {
      width: 12px;
      height: 12px;
      margin: auto 0;
      padding: 0 20px;
      cursor: pointer;
    }
    .pathname {
      font-size: 30px;
      margin-right: 30px;
    }
    padding: 25px;
  }
  @media ${props => props.theme.tablet} {
    .backwards {
      width: 16px;
      height: 16px;
      margin: auto 0;
      padding: 0 20px;
      cursor: pointer;
    }
    .pathname {
      font-size: 40px;
      margin-right: 30px;
    }
    padding: 35px;
  }
  @media ${props => props.theme.laptop} {
    .backwards {
      width: 20px;
      height: 20px;
      margin: auto 0;
      padding: 0 20px;
      cursor: pointer;
    }
    .pathname {
      font-size: 50px;
      margin-right: 30px;
    }
    padding: 45px;
  }
`

export const Header = () => {
  let navigate = useNavigate()
  return (
    <Wrapper>
      <a
        className="backwards"
        onClick={() => {
          navigate('/')
        }}>
        <ChevronLeftIcon />
      </a>
      <div className="pathname">
        {window.location.pathname.replace('/', '').toUpperCase()}
      </div>
    </Wrapper>
  )
}
