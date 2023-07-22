/* eslint-disable no-unused-vars */
import Dropdown from './Dropdown';
import { PaymentTags } from '@/lib/utils/Tags';

interface PaymentTagProps {
  handleMethodChange: (tags: string) => void;
  tag?: string;
}

function PaymentTag({ handleMethodChange, tag }: PaymentTagProps) {
  return (
    <Dropdown tag={tag} options={PaymentTags} onSelect={handleMethodChange} />
  );
}

export default PaymentTag;
