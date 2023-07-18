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
  const [selectedDate, setSelectedDate] = useState<string>('');
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

  const handleRowClick = (date: string) => {
    setSelectedDate(date);
    setDailyExpenseModalOpen(true);
    setSearchResultModalOpen(false);
  };

  const closeModal = () => {
    setSelectedDate('');
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
