import { Select } from 'antd';

interface MySelectProps {
  options: { value: string; label: string }[];
  // eslint-disable-next-line no-unused-vars
  handleChange: (value: string) => void;
}

export default function MySelect({ options, handleChange }: MySelectProps) {
  return (
    <Select
      defaultValue="12"
      style={{ width: 120, marginBottom: 10 }}
      onChange={handleChange}
      options={options}
    />
  );
}
