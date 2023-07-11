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
`;
const MiddleArea = styled.div`
  width: 55%;
  height: 100%;
  margin: auto;
`;
const RightArea = styled.div`
  width: 33%;
  /* border: 1px solid red; */
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default App;
