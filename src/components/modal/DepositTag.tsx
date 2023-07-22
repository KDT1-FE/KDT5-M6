/* eslint-disable no-unused-vars */
import Dropdown from './Dropdown';
import { depositTags } from '@/lib/utils/Tags';

interface DepositTagProps {
  handleTagChange: (tags: string) => void;
  tag?: string;
}

function DepositTag({ handleTagChange, tag }: DepositTagProps) {
  return (
    // options으로 depositTags 배열을 하위 컴포넌트로 전달
    // 상위 컴포넌트에서 전달 받은 handleTagChange를 onSelect로 하위 컴포넌트로 props 전달
    <Dropdown tag={tag} options={depositTags} onSelect={handleTagChange} />
  );
}

export default DepositTag;
