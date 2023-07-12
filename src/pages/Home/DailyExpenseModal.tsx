import { Modal } from 'antd';
import DailyExpenseTable from './DailyExpenseTable';
import { DailyExpensesType } from '@/types/expenses';

interface DailyExpenseModalProps {
  month: string;
  day: string;
  dailyExpenses: DailyExpensesType[];
  dailyExpenseModalOpen: boolean;
  setDailyExpenseModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  list: boolean;
  setList: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DailyExpenseModal({
  dailyExpenses,
  month,
  day,
  dailyExpenseModalOpen,
  setDailyExpenseModalOpen,
  list,
  setList,
}: DailyExpenseModalProps) {
  return (
    <Modal
      title={`${month}월 ${day}일`}
      centered
      open={dailyExpenseModalOpen}
      onCancel={() => setDailyExpenseModalOpen(false)}
      footer={null}
    >
      <DailyExpenseTable data={dailyExpenses} list={list} setList={setList} />
    </Modal>
  );
}
