import { styled } from 'styled-components';
import Left from './components/Left';
import Middle from './components/Middle';
import Right from './components/Right';

function App() {
  return (
    <Conatainer>
      <LeftArea>
        <Left />
      </LeftArea>
      <MiddleArea>
        <Middle />
      </MiddleArea>
      <RightArea>
        <Right />
      </RightArea>
    </Conatainer>
  );
}

const Conatainer = styled.div`
  display: flex;
  height: 100vh;
`;

const LeftArea = styled.div`
  width: 12%;
`;
const MiddleArea = styled.div`
  width: 55%;
`;
const RightArea = styled.div`
  width: 33%;
  border: 1px solid red;
`;

export default App;
