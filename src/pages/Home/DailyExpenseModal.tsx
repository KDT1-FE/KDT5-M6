import { Modal } from 'antd';
import DailyExpenseTable from './DailyExpenseTable';
import { DailyExpensesType } from '@/types/expenses';

interface DailyExpenseModalProps {
  month: string;
  day: string;
  dailyExpenses: DailyExpensesType[];
  dailyExpenseModalOpen: boolean;
  setDailyExpenseModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setToggleFetch: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DailyExpenseModal({
  dailyExpenses,
  month,
  day,
  dailyExpenseModalOpen,
  setDailyExpenseModalOpen,
  setToggleFetch,
}: DailyExpenseModalProps) {
  return (
    <Modal
      title={`${month}월 ${day}일`}
      centered
      open={dailyExpenseModalOpen}
      onCancel={() => setDailyExpenseModalOpen(false)}
      footer={null}
    >
      <DailyExpenseTable
        dailyExpenses={dailyExpenses}
        setToggleFetch={setToggleFetch}
      />
    </Modal>
  );
}
