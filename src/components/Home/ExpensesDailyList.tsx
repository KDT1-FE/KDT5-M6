import { useState } from 'react';
import { theme } from '@/styles/theme';
import { tags } from '@/lib/utils/Tags';
import Button from '@/components/common/Button';
import { css, styled } from 'styled-components';
import InfoModal from '@/components/modal/InfoModal';
import UpdateModal from '@/components/modal/UpdateModal';

interface SelectedDailyProps {
  amount: number;
  category: string;
  date: string;
  userId: string;
  _id: string;
}

interface ExpensesDailyList {
  dailyList: SelectedDailyProps[];
  onItemUpdated: () => void;
}

function ExpensesDailyList({ dailyList, onItemUpdated }: ExpensesDailyList) {
  const [showUpdateModal, setShowUpdateModal] = useState<any>(null);
  const [showInfoModal, setShowInfoModal] = useState<any>(null);
  const [selelctItem, setSelectItem] = useState<SelectedDailyProps | null>(
    null,
  );

  const handleOpenUpdateModal = (item: SelectedDailyProps, index: number) => {
    setShowUpdateModal(index);
    setSelectItem(item);
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(null);
  };

  const handleOpenInfoModal = (item: SelectedDailyProps, index: number) => {
    setShowInfoModal(index);
    setSelectItem(item);
  };

  const handleCloseInfoModal = () => {
    setShowInfoModal(null);
  };

  const Icon = ({ label }: { label: string }) => {
    const tag = tags.find((tag) => tag.label === label);
    if (tag) {
      return <div>{tag.icon}</div>;
    }
  };
  return (
    <>
      <Title></Title>
      <ul>
        {dailyList
          ? dailyList.map((item, index) => (
              <li key={index}>
                <Wrapper>
                  <Category>
                    <Icon label={[...item.category.split(',')][0]} />
                    <Title>{[...item.category.split(',')][0]}</Title>
                  </Category>
                  <Detail>
                    <Amount $isSpend={item.amount > 0}>
                      {item.amount.toLocaleString()}원
                    </Amount>
                    <Buttons>
                      <Button
                        $gray="true"
                        onClick={() => handleOpenInfoModal(item, index)}
                      >
                        상세
                      </Button>
                      <Button
                        $gray="true"
                        onClick={() => handleOpenUpdateModal(item, index)}
                      >
                        수정
                      </Button>
                    </Buttons>
                  </Detail>
                </Wrapper>
                {showInfoModal === index && selelctItem && (
                  <InfoModal
                    key={index}
                    amount={selelctItem.amount}
                    category={selelctItem.category}
                    date={selelctItem.date}
                    close={handleCloseInfoModal}
                  />
                )}

                {showUpdateModal === index && selelctItem && (
                  <UpdateModal
                    key={index}
                    amount={selelctItem.amount}
                    category={selelctItem.category}
                    date={selelctItem.date}
                    _id={selelctItem._id}
                    close={handleCloseUpdateModal}
                    onItemUpdated={onItemUpdated}
                  />
                )}
              </li>
            ))
          : '내역이 없습니다!'}
      </ul>
    </>
  );
}

const Title = styled.h1`
  margin-left: 0.5rem;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #000;
  margin-bottom: 0.5rem;
  padding: 1rem 0.5rem 0.5rem;
`;

const Category = styled.div`
  color: ${theme.colors.gray};
  display: flex;
`;

const Detail = styled.div`
  display: flex;
`;

const Amount = styled.div<{
  $isSpend?: boolean;
}>`
  margin: 2px 8px;
  ${(props) =>
    props.$isSpend &&
    css`
      color: ${theme.colors.blue};
    `}
`;
const Buttons = styled.div`
  > button {
    font-size: 0.5rem;
    padding: 4px 8px;
    margin-left: 5px;
  }
  > button:hover {
    transform: scale(110%);
  }
`;

export default ExpensesDailyList;
