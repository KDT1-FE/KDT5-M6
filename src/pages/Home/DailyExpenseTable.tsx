import { Divider, Space, Table, message, Popconfirm } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DailyExpensesType } from '@/types/expenses';
import { DeleteTwoTone, EditOutlined } from '@ant-design/icons';
import { useState } from 'react';
import ExpenditureForm from './ExpenditureForm';

//DailyExpenseTable에서 받아오는 props 데이터 type interface
interface DailyExpenseTableProps {
  dailyExpenses: DailyExpensesType[];
  setToggleFetch: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DailyExpenseTable({
  // DailyExpenseTable에서 받아오는 데이터 목록
  dailyExpenses,
  setToggleFetch,
}: DailyExpenseTableProps) {
  //modal창 열기,닫기 상태 지정 변수
  const [open, setOpen] = useState(false);
  //수정, 삭제 버튼 클릭시 선택되는 '특정된 데이터'를 지정하는 변수
  const [selectedData, setSelectedData] = useState<DailyExpensesType>();

  // 삭제 버튼 클릭시 실행되는 삭제 기능 함수
  const handleDelet = async () => {
    try {
      const response = await fetch(
        `http://52.78.195.183:3003/api/expenses/${selectedData?._id}`,
        { method: 'DELETE', headers: { 'content-type': 'application/json' } },
      );
      if (!response.ok) {
        console.log('서버로 부터 응답이 왔는데 에러임.');
        return;
      }
      setToggleFetch((prev) => !prev);
    } catch (error) {
      console.log('서버로 부터 응답 안옴', error);
    } finally {
      message.success('소비기록 삭제 완료');
    }
  };

  // 출력되는 일별 목록 데이터 타입
  const columns: ColumnsType<DailyExpensesType> = [
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
      dataIndex: 'time',
      key: 'time',
      align: 'center',
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      // 일별로 가져온 데이터 배열을 객체별로 렌더링
      render: (_, data) => (
        <div>
          <Space size="small">
            <EditOutlined
              //소비내역 수정 버튼
              onClick={() => {
                // 수정할 데이터 선택 및 전달 데이터 변수로 값 전달
                setSelectedData(data);
                // 수정 모달 열림
                setOpen(true);
              }}
              className="hover_icon"
            />
            <Divider type="vertical" style={{ margin: '0' }} />
            <Popconfirm
              title="소비 기록 삭제"
              description={
                // 삭제 버튼 클릭시 삭제 컨펌 팝업
                <span style={{ marginRight: '20px' }}>
                  소비 기록을 삭제하시겠습니까?
                </span>
              }
              okText="삭제" // 삭제 컨펌 버튼
              onConfirm={handleDelet} // 삭제 컨펌 클릭시 삭제 기능 함수 실행
              cancelText="취소" // 삭제 취소 버튼
              onCancel={() => {
                message.error('삭제 취소');
              }} // 삭제 취소 클릭시 삭제 기능 함수 실행 안됨
            >
              <DeleteTwoTone
                //소비내역 삭제 버튼
                twoToneColor="red"
                onClick={() => {
                  // 삭제할 데이터 선택 및 전달 데이터 변수로 값 전달
                  setSelectedData(data);
                }}
                className="hover_icon"
              />
            </Popconfirm>
          </Space>
          <ExpenditureForm
            // 수정 모달
            setToggleFetch={setToggleFetch}
            open={open}
            setOpen={setOpen}
            edit
            selectedData={selectedData}
          />
        </div>
      ),
    },
  ];

  return (
    <Table columns={columns} dataSource={dailyExpenses} size="small" bordered />
  );
}
