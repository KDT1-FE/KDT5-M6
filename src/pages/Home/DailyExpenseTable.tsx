import { Divider, Space, Table, message, Popconfirm } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DailyExpensesType } from '@/types/expenses';
import { DeleteTwoTone, EditOutlined } from '@ant-design/icons';
import { useState } from 'react';
import ExpenditureForm from '@/pages/Home/ExpenditureForm';
import { API_BASE_URL } from '@/data/constants';

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
  // 기록수정 modal창 열기,닫기 상태 지정 변수
  const [editFormOpen, setEditFormOpen] = useState(false);

  // 수정, 삭제 버튼 클릭시 선택되는 '특정된 데이터'를 지정하는 변수
  const [selectedData, setSelectedData] = useState<DailyExpensesType>();

  // 삭제 버튼 클릭시 실행되는 삭제 기능 함수
  const handleDelete = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500)); // 억지 0.5초
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/expenses/${selectedData?._id}`,
        { method: 'DELETE', headers: { 'content-type': 'application/json' } },
      );
      if (!response.ok) {
        console.log('서버로 부터 응답이 왔는데 에러임.');
        message.error('오류가 발생하였습니다');
        return;
      }
      // 삭제 성공
      message.success('소비기록 삭제 완료');
      setToggleFetch((prev) => !prev);
    } catch (error) {
      console.log('서버로 부터 응답 안옴', error);
      message.error('오류가 발생하였습니다');
    }
  };

  // 출력되는 일별 목록 데이터 타입, antd table에서 요구하는 형식
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
      render: (amount: number) => amount.toLocaleString(),
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
                setEditFormOpen(true);
              }}
              className="hover_icon"
            />
            <Divider type="vertical" style={{ margin: '0' }} />

            {/*  삭제 버튼 클릭시 삭제 컨펌 팝업 */}
            <Popconfirm
              title="소비 기록 삭제"
              description={
                <span style={{ marginRight: '20px' }}>
                  '{data.category}' 소비 기록을 삭제하시겠습니까?
                </span>
              }
              okText="삭제" // 삭제 컨펌 버튼
              onConfirm={handleDelete} // 삭제 컨펌 클릭시 삭제 기능 함수 실행
              cancelText="취소" // 삭제 취소 버튼
            >
              {/* 소비내역 삭제 버튼 */}
              <DeleteTwoTone
                twoToneColor="red"
                onClick={() => {
                  // 삭제할 데이터 선택 및 전달 데이터 변수로 값 전달
                  setSelectedData(data);
                }}
                className="hover_icon"
              />
            </Popconfirm>
          </Space>

          {/*  수정 모달 */}
          <ExpenditureForm
            setToggleFetch={setToggleFetch}
            open={editFormOpen}
            setOpen={setEditFormOpen}
            edit // 이게 있으면 edit모드임
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
