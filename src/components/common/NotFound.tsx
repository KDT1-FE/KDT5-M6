import { styled } from 'styled-components'

const Wrapper = styled.div`
  .container {
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    h1 {
      font-size: 50px;
      margin-bottom: 50px;
    }
    p {
      font-size: 20px;
    }
    a {
      margin-top: 50px;
      text-decoration: none;
      padding: 15px;
      border: 1px solid #000;
      background-color: #fff;
      &:visited {
        color: #000;
      }
      &:hover {
        transition: 0.2s ease;
        color: #fff;
        background-color: #f15441;
        border-color: #f15441;
      }
    }
  }
`

export const NotFound = () => {
  return (
    <Wrapper>
      <div className="container">
        <h1>페이지 오류 안내</h1>
        <p>홈페이지 이용에 불편을 드려 죄송합니다.</p>
        <p> 선택한 페이지를 찾을 수 없습니다.</p>
        <a href="/">메인 페이지로 이동</a>
      </div>
    </Wrapper>
  )
}
