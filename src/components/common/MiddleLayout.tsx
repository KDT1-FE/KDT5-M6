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
          <Lefticon src={back} alt="" />
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
          <Righticon src={forward} alt="" />
        </RightArrow>
      </Title>
      <ContentWrapper>{childrenWithProps}</ContentWrapper>
    </LayoutWrapper>
  );
}

const LayoutWrapper = styled.div`
  width: 97%;
  height: 100%;
  margin: 2%;
  padding: 6%;
  background-color: ${theme.colors.white};
  border-radius: 40px;
  box-shadow: 5px 5px 20px ${theme.colors.gray[1]};
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Title = styled.span`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Lefticon = styled.img`
  width: 1rem;
`;
const LeftArrow = styled.button`
  border: 0;
  background-color: transparent;
  font-size: 2rem;
  &:hover {
    cursor: pointer;
  }
`;
const Monthly = styled.span`
margin: 20px;
  text-align: center;
  font-size: 2.5rem;
  font-family: 'poppins';
  font-weight: 500;
`;
const Righticon = styled.img`
  width: 1rem;
`;
const RightArrow = styled.button`
  border: 0;
  background-color: transparent;
  font-size: 2rem;
  &:hover {
    cursor: pointer;
  }
`;
const ContentWrapper = styled.div`
  width: 100%;
`;

export default MiddleLayout;
