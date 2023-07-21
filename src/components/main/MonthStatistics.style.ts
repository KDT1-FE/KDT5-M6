import { styled } from "styled-components";

export const Container = styled.div`
  width: 350px;
  height: 150px;
  background-color: white;
  border-radius: 10px;
  margin-top: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 10px;
`;
export const Title = styled.div`
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 20px;
`;
export const DivideContainer = styled.div`
  display: flex;
`;
export const Consumption = styled.div`
  width: 150px;
  height: 70px;
  background-color: var(--point-color-red);
  border-radius: 10px;
  padding: 10px;
  & > p {
    color: var(--base-color-lightgrey);
    font-size: 14px;
    margin: 5px 0;
    overflow-wrap: break-word;
  }
`;
export const Income = styled(Consumption)`
  background-color: var(--point-color-green);
  margin-left: 10px;
`;
