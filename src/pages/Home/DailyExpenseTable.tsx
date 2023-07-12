import { Divider, Space, Table, theme, message, Popconfirm } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DailyExpenseType } from '@/types/expense';
import { DeleteTwoTone, EditOutlined } from '@ant-design/icons';
import { useState } from 'react';

interface DailyExpenseTableProps {
  data: DailyExpenseType[];
}

export default function DailyExpenseTable({ data }: DailyExpenseTableProps) {
  const [selected, setSelected] = useState('');

  const confirm = async () => {
    try {
      const response = await fetch(
        `http://52.78.195.183:3003/api/expenses/${selected}`,
        { method: 'DELETE', headers: { 'content-type': 'application/json' } },
      );
      if (!response.ok) {
        console.log('서버로 부터 응답이 왔는데 에러임.');
        return;
      }
      console.log('완료');
    } catch (error) {
      console.log('서버로 부터 응답 안옴', error);
    } finally {
      message.success('소비기록 삭제 완료');
    }
  };

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
      dataIndex: 'time',
      key: 'time',
      align: 'center',
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (_, data) => (
        <Space size="small">
          <EditOutlined
            onClick={() => console.log(data._id)}
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
              onClick={() => setSelected(data._id)}
              className="hover_icon"
            />{' '}
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return <Table columns={columns} dataSource={data} size="small" bordered />;
}
