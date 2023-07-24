import styled from "styled-components";
import CalendarSection from "./calendar/CalendarSection";
import AddModal from "./modal/AddModal";
import Chart from "./chart/Chart";
import Search from "./search/Search";
import Today from "./today/Today";
import ContainerBox from "./common/ContainerBox";
import { useRecoilState } from "recoil";
import { openModalAtom } from "../state/modalClose";

// Todo: Chart type 지정
function Main() {
  const [openModal, setOpenModal] = useRecoilState(openModalAtom);

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <MainContainer>
      <ContainerFlex>
        <ContainerFlexCol>
          <ContainerBox>
            <AddButton onClick={handleOpenModal}>
              <span>+ </span>
              <span> 내역 추가</span>
            </AddButton>
            {openModal && <AddModal handleCloseModal={handleCloseModal} />}
          </ContainerBox>
          <ContainerBox>
            <Today />
          </ContainerBox>
          <ContainerBox>
            <Chart />
          </ContainerBox>
        </ContainerFlexCol>

        <ContainerBox>
          <CalendarSection />
        </ContainerBox>
      </ContainerFlex>

      <ContainerBox>
        <Search userId="team1" />
      </ContainerBox>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  width: 100%;
  margin-top: 2rem;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.bgColor};
  gap: 3rem;
`;
const ContainerFlex = styled.div`
  display: flex;
  gap: 3rem;
`;
const ContainerFlexCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
`;
const AddButton = styled.button`
  width: 30rem;
  border-radius: 14px;
  font-size: 1.5rem;
  height: 50px;
  background-color: ${(props) => props.theme.buttonColor};
`;
export default Main;
