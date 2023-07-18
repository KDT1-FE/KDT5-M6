import { SearchResultType } from '@/types/search';
import formatDate from '@/utils/formatDateAndTime';
import { Typography, Modal, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import moment from 'moment';
import '@/index.css';

const { Text } = Typography;

interface SearchResultModalProps {
  searchResultModalOpen: boolean;
  setSearchResultModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  searchResults: SearchResultType[];
  dailyExpenses: SearchResultType[];
}

export default function SearchResultModal({
  searchResultModalOpen,
  setSearchResultModalOpen,
  searchResults,
  dailyExpenses,
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
        const formattedDate = formatDate(time);
        return `${formattedDate.date} ${formattedDate.time}`;
      },
    },
  ];

  const handleRowClick = (date: string) => {
    setSelectedDate(date);
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
              onClick: () => handleRowClick(record.date),
            })}
            rowKey={(record) => record._id}
          />
        )}
      </Modal>

      {selectedDate && (
        <Modal
          centered
          title={`${moment(selectedDate).format('M')}월 ${moment(
            selectedDate,
          ).format('D')}일`}
          open={searchResultModalOpen}
          onCancel={() => setSelectedDate('')}
          footer={null}
        >
          <Table
            columns={columns}
            dataSource={dailyExpenses}
            size="small"
            bordered
          />
        </Modal>
      )}
    </>
  );
}
