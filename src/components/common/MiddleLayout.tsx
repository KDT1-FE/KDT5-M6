import React from 'react';
import { isValidElement } from 'react';
import { styled } from 'styled-components';
import back from '../../assets/arrow_back_ios.png';
import forward from '../../assets/arrow_forward_ios.png';
import { theme } from '../../styles/theme';

interface IChildren {
  children: React.ReactNode;
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
}

interface IDateProp {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
}

function MiddleLayout({ ...props }: IChildren) {
  const { date, setDate, children } = props;
  const dateProp: IDateProp = {
    date,
    setDate
  };

  const childrenWithProps = React.Children.map(children, (child) => {
    if (isValidElement(child)) {
      return React.cloneElement(child, {
        ...(child.props as Partial<IDateProp>),
        ...dateProp
      });
    }
  });

  return (
    <LayoutWrapper>
      <Title>
        <LeftArrow
          type="button"
          onClick={() =>
            setDate(new Date(date.getFullYear(), date.getMonth() - 1))
          }
        >
          <Lefticon src={back} alt="Left" />
        </LeftArrow>
        <Monthly>
          {(date.getMonth() + 1).toString().padStart(2, '0')}.{' '}
          {date.getFullYear()}
        </Monthly>
        <RightArrow
          type="button"
          onClick={() =>
            setDate(new Date(date.getFullYear(), date.getMonth() + 1))
          }
        >
          <Righticon src={forward} alt="Right" />
        </RightArrow>
      </Title>
      <ContentWrapper>{childrenWithProps}</ContentWrapper>
    </LayoutWrapper>
  );
}

const LayoutWrapper = styled.div`
  width: 100%;
  height: 95%;
  display: flex;
  padding: 10px;
  min-height: 550px;
  align-items: center;
  border-radius: 40px;
  flex-direction: column;
  background-color: ${theme.colors.white};
  box-shadow: 5px 5px 20px ${theme.colors.gray[1]};
`;
const Title = styled.span`
  width: 50%;
  display: flex;
  margin-top: 25px;
  align-items: center;
  justify-content: space-between;
`;
const Lefticon = styled.img`
  width: 1rem;
`;
const LeftArrow = styled.button`
  border: 0;
  font-size: 2rem;
  background-color: transparent;
  &:hover {
    cursor: pointer;
  }
`;
const Monthly = styled.span`
  margin: 25px;
  font-weight: 500;
  font-size: 2.5rem;
  text-align: center;
  font-family: 'poppins';
`;
const Righticon = styled.img`
  width: 1rem;
`;
const RightArrow = styled.button`
  border: 0;
  font-size: 2rem;
  background-color: transparent;
  &:hover {
    cursor: pointer;
  }
`;
const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

export default MiddleLayout;
