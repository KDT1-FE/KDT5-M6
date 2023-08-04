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
  const [change, setChange] = useState(false);

  return (
    <Conatainer>
      <LeftArea>
        <Left setToggle={setToggle} />
      </LeftArea>
      <AreaWrapper>
        <MiddleArea>
          <Middle
            change={change}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            toggle={toggle}
          />
        </MiddleArea>
        <RightArea>
          <Right selectedDate={selectedDate} setChange={setChange} />
        </RightArea>
      </AreaWrapper>
    </Conatainer>
  );
}

const Conatainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: space-around;
  background-color: ${theme.colors.gray[2]};
`;

const LeftArea = styled.div`
  width: 12%;
  min-width: 170px;
  background-color: ${theme.colors.black.black100};
`;

const AreaWrapper = styled.div`
  gap: 30px;
  width: 88%;
  display: flex;
  padding: 0 30px;
`;

const MiddleArea = styled.div`
  width: 65%;
  height: 100%;
  min-width: 500px;
`;
const RightArea = styled.div`
  width: 35%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default App;
