import { Divider, Space, Table, message, Popconfirm } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DailyExpensesType } from '@/types/expenses';
import { DeleteTwoTone, EditOutlined } from '@ant-design/icons';
import { useState } from 'react';
import ExpenditureForm from '@/pages/Home/ExpenditureForm';

interface DailyExpenseTableProps {
  data: DailyExpensesType[];
  list: boolean;
  setList: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DailyExpenseTable({
  data,
  list,
  setList,
}: DailyExpenseTableProps) {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [selected, setSelected] = useState('');

  const handleClickEdit = () => {
    setOpen(true);
    setEdit(false);
  };

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
      setList(!list);
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
        <Space size="small">
          <EditOutlined
            onClick={() => {
              setSelected(data._id);
              handleClickEdit();
            }}
            className="hover_icon"
          />
          <ExpenditureForm
            open={open}
            setOpen={setOpen}
            edit={edit}
            list={list}
            setList={setList}
            selected={selected}
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
                setSelected(data._id);
              }}
              className="hover_icon"
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return <Table columns={columns} dataSource={data} size="small" bordered />;
}
