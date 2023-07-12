import { useState } from 'react';
import { styled } from 'styled-components';
import { theme } from './styles/theme.ts';
import Left from './components/Left';
import Middle from './components/Middle';
import Right from './components/Right';

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString());
  // Left 컴포넌트에 setToggle prop 전달
  const [toggle, setToggle] = useState(false);

  return (
    <Conatainer>
      <LeftArea>
        <Left setToggle={setToggle} />
      </LeftArea>
      <MiddleArea>
        <Middle
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          toggle={toggle}
        />
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
  min-width: 170px;
  background-color: ${theme.colors.black.black100};
`;
const MiddleArea = styled.div`
  height: 100%;
  width: 60%;
  min-width: 500px;
`;
const RightArea = styled.div`
  width: 28%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default App;
