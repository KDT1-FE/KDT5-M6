import { Divider, Space, Table, theme } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DailyExpenseType } from '@/types/expense';
import { DeleteTwoTone, EditOutlined } from '@ant-design/icons';

interface DailyExpenseTableProps {
  data: DailyExpenseType[];
}

export default function DailyExpenseTable({ data }: DailyExpenseTableProps) {
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
          <Divider type="vertical" style={{ margin: 0 }} />
          <DeleteTwoTone
            twoToneColor="red"
            onClick={() => console.log(data._id)}
            className="hover_icon"
          />
        </Space>
      ),
    },
  ];

  return <Table columns={columns} dataSource={data} size="small" bordered />;
}
