import styled from "styled-components";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

const BackBtn = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <BackBtnContainer onClick={goBack}>
      <Icon icon="ic:sharp-arrow-back-ios" />
    </BackBtnContainer>
  );
};

const BackBtnContainer = styled.div`
  position: absolute;
  top: 30px;
  left: 20px;
  display: flex;
  width: 50px;
  justify-content: center;
  cursor: pointer;
  z-index: 9;
  svg {
    width: 40px;
    height: 40px;
    path {
      color: var(--point-color-green);
    }
  }
`;
export default BackBtn;
