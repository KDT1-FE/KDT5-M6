import styled from "styled-components";

const Loading = () => {
  return (
    <Container>
      <LoadingContainer />
    </Container>
  );
};

export default Loading;

const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const LoadingContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 32px;
  width: 120px;
  border-bottom: 5px solid var(--base-color-grey);
  box-sizing: border-box;
  animation: balancing 2s linear infinite alternate;
  transform-origin: 50% 100%;

  &:before {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: var(--point-color-red);
    animation: ballbns 2s linear infinite alternate;
  }
  &:after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: 0;
    height: 20px;
    width: 20px;
    transform: translate(-50%, 100%);
    border-radius: 50%;
    border: 6px solid var(--base-color-grey);
  }
  @keyframes ballbns {
    0% {
      left: 0;
      transform: translateX(0%);
    }
    100% {
      left: 100%;
      transform: translateX(-100%);
    }
  }
  @keyframes balancing {
    0% {
      transform: rotate(-15deg);
    }
    50% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(15deg);
    }
  }
`;
