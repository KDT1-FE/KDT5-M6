import { Divider, Space, Table, message, Popconfirm } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DailyExpensesType } from '@/types/expenses';
import { DeleteTwoTone, EditOutlined } from '@ant-design/icons';
import { useState } from 'react';
import ExpenditureForm from './ExpenditureForm';

interface DailyExpenseTableProps {
  dailyExpenses: DailyExpensesType[];
  setToggleFetch: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DailyExpenseTable({
  dailyExpenses,
  setToggleFetch,
}: DailyExpenseTableProps) {
  const [open, setOpen] = useState(false);

  const [selectedData, setSelectedData] = useState<DailyExpensesType>();

  const confirm = async () => {
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
      render: (_, data) => (
        <div>
          <Space size="small">
            <EditOutlined
              onClick={() => {
                setSelectedData(data);
                setOpen(true);
              }}
              className="hover_icon"
            />
            <Divider type="vertical" style={{ margin: '0' }} />
            <Popconfirm
              title="소비 기록 삭제"
              description={
                <span style={{ marginRight: '20px' }}>
                  소비 기록을 삭제하시겠습니까?
                </span>
              }
              onConfirm={confirm}
              onCancel={() => {
                message.error('삭제 취소');
              }}
              okText="삭제"
              cancelText="취소"
            >
              <DeleteTwoTone
                twoToneColor="red"
                onClick={() => {
                  setSelectedId(data._id);
                }}
                className="hover_icon"
              />
            </Popconfirm>
          </Space>
          <ExpenditureForm
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
