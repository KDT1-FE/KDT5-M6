import { SearchResultType } from '@/types/search';
import { Modal, Table, Result } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import '@/index.css';
import formatDateAndTime from '@/utils/formatDateAndTime';

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
    // 9시간 차이나서 그런건데 멘토님한테 물어볼예정
    const stringToIOS = new Date(date);
    const adjustedDate = new Date(
      stringToIOS.getTime() - 9 * 60 * 60 * 1000,
    ).toISOString();
    setValue(new Date(adjustedDate)); // 선택한 아이템의 날짜를 index.tsx 캘린더에서 봤던 value(선택날짜)로 지정해줌

    setSearchResultModalOpen(false); // 검색결과 모달 닫고
    setDailyExpenseModalOpen(true); // 일별 소비 모달 열고
  };

  return (
    <>
      <Modal
        centered
        title="검색결과"
        open={searchResultModalOpen}
        onCancel={() => setSearchResultModalOpen(false)}
        footer={null}
      >
        {searchResults.length === 0 ? (
          <Result status="404" subTitle="검색 결과가 없습니다" />
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
