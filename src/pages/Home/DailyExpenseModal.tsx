import { Modal } from 'antd';
import { DailyExpenseType } from '@/types/expense';
import DailyExpenseTable from './DailyExpenseTable';

interface DailyExpenseModalProps {
  month: string;
  day: string;
  dailyExpenses: DailyExpenseType[];
  dailyExpenseModalOpen: boolean;
  setDailyExpenseModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DailyExpenseModal({
  dailyExpenses,
  month,
  day,
  dailyExpenseModalOpen,
  setDailyExpenseModalOpen,
}: DailyExpenseModalProps) {
  return (
    <Modal
      title={`${month}월 ${day}일`}
      centered
      open={dailyExpenseModalOpen}
      onCancel={() => setDailyExpenseModalOpen(false)}
      footer={null}
    >
      <DailyExpenseTable data={dailyExpenses} />
    </Modal>
  );
}
