import styled, { keyframes } from 'styled-components';

export const LoadingSpinner = () => {
  return <Loader />;
};

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
  display: inline-block;
  width: 200px;
  height: 200px;
  margin: 10px;
  border: 10px solid #A68BFC;
  border-radius: 50%;
  border-top-color: transparent;
  animation: ${spin} 1s linear infinite;
`;