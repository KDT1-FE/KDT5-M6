import ExpensesTagList from '@/components/Home/ExpensesTagList';
import ExpensesDailyList from '@/components/Home/ExpensesDailyList';

export interface SelectedDailyProps {
  amount: number;
  category: string;
  date: string;
  userId: string;
  _id: string;
}
interface CalendarDataProps {
  dailyList: SelectedDailyProps[];
  tag: string;
  onItemUpdated: () => void;
}

function ExpensesList({ dailyList, tag, onItemUpdated }: CalendarDataProps) {
  // tag가 존재면 TagList, 그렇지 않으면 DailyList 반환
  return (
    <>
      {tag ? (
        <ExpensesTagList
          dailyList={dailyList}
          tag={tag}
          onItemUpdated={onItemUpdated}
        />
      ) : (
        <ExpensesDailyList
          dailyList={dailyList}
          onItemUpdated={onItemUpdated}
        />
      )}
    </>
  );
}

export default ExpensesList;
