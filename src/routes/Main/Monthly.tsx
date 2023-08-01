import { PostBtn } from "@/components/PostBtn";
import MonthStatistics from "@/components/main/MonthStatistics";
import MonthlyList from "@/components/main/MonthlyList";
import styled from "styled-components";

const Monthly = () => {
  return (
    <MonthlyContainer>
      <MonthStatistics />
      <MonthlyList />
      <PostBtn />
    </MonthlyContainer>
  );
};
export default Monthly;

const MonthlyContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 390px;
  height: 680px;
  max-height: 800px;
`;
