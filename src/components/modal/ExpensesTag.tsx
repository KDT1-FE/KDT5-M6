/* eslint-disable no-unused-vars */
import Dropdown from './Dropdown';
import { expenseTags } from '@/lib/utils/Tags';

interface ExpensesTagProps {
  handleTagChange: (tags: string) => void;
  tag?: string;
}

function ExpensesTag({ handleTagChange, tag }: ExpensesTagProps) {
  return (
    <Dropdown tag={tag} options={expenseTags} onSelect={handleTagChange} />
  );
}

export default ExpensesTag;
