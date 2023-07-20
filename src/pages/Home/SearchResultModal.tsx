import { SearchResultType } from '@/types/search';
import { Typography, Modal, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import '@/index.css';
import formatDateAndTime from '@/utils/formatDateAndTime';

const { Text } = Typography;

interface SearchResultModalProps {
  searchResultModalOpen: boolean;
  setSearchResultModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  searchResults: SearchResultType[];
  dailyExpenses: SearchResultType[];
  setValue: React.Dispatch<React.SetStateAction<Date>>;
  setDailyExpenseModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SearchResultModal({
  searchResultModalOpen,
  setSearchResultModalOpen,
  searchResults,
  setValue,
  setDailyExpenseModalOpen,
}: SearchResultModalProps) {
  // 검색 결과를 표시하기 위한 테이블 컬럼 정의
  const columns: ColumnsType<SearchResultType> = [
    {
      title: '소비내역',
      dataIndex: 'category',
      key: 'category',
      align: 'center',
    },
    {
      title: '금액',
      dataIndex: 'amount',
      key: 'amount',
      align: 'center',
      sorter: {
        compare: (a, b) => a.amount - b.amount,
      },
      render: (amount: number) => amount.toLocaleString(), // 천 단위로 구분하여 표시
    },
    {
      title: '시간',
      dataIndex: 'date',
      key: 'date',
      align: 'center',
      render: (time: string) => {
        const formattedDate = formatDateAndTime(time);
        return `${formattedDate.date} ${formattedDate.time}`;
      },
    },
  ];

  // 검색 결과 테이블에서 행을 클릭했을 때의 핸들러 함수
  const handleRowClick = (date: string) => {
    setDailyExpenseModalOpen(true);
    setSearchResultModalOpen(false);
  };

  // 모달을 닫는 함수
  const closeModal = () => {
    setSearchResultModalOpen(false);
  };

  return (
    <>
      <Modal
        centered
        title="검색결과"
        open={searchResultModalOpen}
        onCancel={closeModal}
        footer={null}
      >
        {searchResults.length === 0 ? (
          <Text>No results found.</Text>
        ) : (
          // 검색 결과가 있는 경우 테이블로 표시
          <Table
            columns={columns}
            dataSource={searchResults}
            size="small"
            bordered
            rowClassName="table-row"
            onRow={(record) => ({
              onClick: () => {
                setValue(new Date(record.date));
                handleRowClick(record.date);
              },
            })}
            rowKey={(record) => record._id}
          />
        )}
      </Modal>
    </>
  );
}
