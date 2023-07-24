import styled from "styled-components";

interface IContainerBox {
  [rest: string]: any;
}

function ContainerBox({ ...rest }: IContainerBox) {
  return <StyledContainerBox {...rest} />;
}

const StyledContainerBox = styled.div`
  background: ${(props) => props.theme.containerBoxColor};
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.4);
  border-radius: 14px;
`;

export default ContainerBox;
