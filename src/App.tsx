import { styled } from 'styled-components';
import Left from './components/Left';
import Middle from './components/Middle';
import Right from './components/Right';
import { useState } from 'react';
import { theme } from './styles/theme.ts';

function App() {
  const [selectedDate, setSelectedDate] = useState('');

  return (
    <Conatainer>
      <LeftArea>
        <Left />
      </LeftArea>
      <MiddleArea>
        <Middle selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      </MiddleArea>
      <RightArea>
        <Right selectedDate={selectedDate} />
      </RightArea>
    </Conatainer>
  );
}

const Conatainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${theme.colors.gray[2]};
  display: flex;
  justify-content: space-around;
`;

const LeftArea = styled.div`
  width: 12%;
`;
const MiddleArea = styled.div`
  width: 55%;
  marign: auto;
  padding-left: .8rem;
`;
const RightArea = styled.div`
  width: 33%;
  border: 1px solid red;
`;

export default App;
