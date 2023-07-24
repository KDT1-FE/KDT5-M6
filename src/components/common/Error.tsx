import { Link } from "react-router-dom";
import styled from "styled-components";

function Error() {
  return (
    <ErrorContainer>
      <span>404 Not Found!</span>
      <span>페이지를 찾을 수 없습니다!</span>
      <Link to="/">돌아가기</Link>
    </ErrorContainer>
  );
}

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  height: 100vh;
  span {
    font-size: 32px;
    color: #707070;
    &:first-child {
      font-size: 48px;
      color: #000;
    }
  }
  a {
    background: #ccc;
    padding: 8px 16px;
    border-radius: 12px;
    transition: all 0.2s linear;
    &:hover {
      background: #333;
      color: #fff;
    }
  }
`;

export default Error;
