import { SearchResultType } from '@/types/search';
import { formatPaymentDate } from '@/utils/formatPaymentDate';
import { Typography, Modal, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DailyExpenseType } from '@/types/expense';
import { useState } from 'react';
import DailyExpenseModal from './DailyExpenseModal';
import moment from 'moment';

const { Text } = Typography;

interface SearchResultModalProps {
  searchResultModalOpen: boolean;
  setSearchResultModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  searchResults: SearchResultType[];
}

export default function SearchResultModal({
  searchResultModalOpen,
  setSearchResultModalOpen,
  searchResults,
}: SearchResultModalProps) {
  const [selectedDate, setSelectedDate] = useState<string>('');

  const columns: ColumnsType<DailyExpenseType> = [
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
      render: (date: string) => formatPaymentDate(date),
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
        title="검색 결과"
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
            onRow={(record) => ({
              onClick: () => handleRowClick(record.date),
            })}
            rowKey={(record) => record.id} // 고유한 식별자를 사용하여 key prop 설정
          />
        )}
      </Modal>

      {selectedDate && (
        <DailyExpenseModal
          month={moment(selectedDate).format('M')}
          day={moment(selectedDate).format('D')}
          dailyExpenseModalOpen={true}
          setDailyExpenseModalOpen={closeModal}
          dailyExpenses={
            searchResults.filter(
              (result) => result.date === selectedDate,
            ) as DailyExpenseType[]
          }
        />
      )}
    </>
  );
}
