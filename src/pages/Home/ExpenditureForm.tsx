import { useState } from 'react';
import {
  DatePicker,
  Space,
  Button,
  Modal,
  Input,
  // Select,
} from 'antd';
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';

interface espenseFormProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  edit: boolean;
  list: boolean;
  setList: React.Dispatch<React.SetStateAction<boolean>>;
  selected: string | null;
}
// interface espenseEditDeletProps {
//   selected: string | null;
// }

export default function ExpenditureForm({
  open,
  setOpen,
  edit,
  list,
  setList,
  selected,
  setToggleAdd
}: espenseFormProps) {
  // { selected }: espenseEditDeletProps,
  const [isSending, setIsSending] = useState(false);
  const [inputText, setInputText] = useState('');
  const [inputNumber, setInputNumber] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');
  // const [plusMinus, setPlusMinus] = useState('-');
  // const [selected, setSelected] = useState('');

  const selectDateHandler = (
    _value: DatePickerProps['value'] | RangePickerProps['value'],
    dateString: [string, string] | string,
  ) => {
    const date = dateString;
    const Time = date.slice(0, 10);
    const Date = date.slice(11, 19);
    const selectedDate = `${Time}T${Date}`;
    setSelectedDate(selectedDate);
  };
  // const { Option } = Select;

  const handleSubmit = async () => {
    setIsSending(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    try {
      const response = await fetch('http://52.78.195.183:3003/api/expenses', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          amount: inputNumber,
          userId: 'team3',
          category: inputText,
          date: selectedDate,
        }),
      });
      if (!response.ok) {
        console.log('서버로 부터 응답이 왔는데 에러임.');
        return;
      }
      console.log('성공!!');
      // 성공적으로 추가함
      setToggleAdd((prev:boolean)=>!prev)
    } catch (error) {
      console.log('서버로 부터 응답 안옴', error);
    } finally {
      setIsSending(false);
      setOpen(false);
      setList(true);
      setInputNumber(0);
      setInputText('');
    }
  };

  const handleEdit = async () => {
    setIsSending(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    try {
      const response = await fetch(
        `http://52.78.195.183:3003/api/expenses/${selected}`,
        {
          method: 'PUT',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            amount: inputNumber,
            userId: 'team3',
            category: inputText,
            date: selectedDate,
          }),
        },
      );
      if (!response.ok) {
        console.log('서버로 부터 응답이 왔는데 에러임.');
        return;
      }
      console.log('수정!!');
      // 성공적으로 수정함
      setToggleAdd((prev:boolean)=>!prev)
    } catch (error) {
      console.log('서버로 부터 응답 안옴', error);
    } finally {
      setIsSending(false);
      setOpen(false);
      setList(true);
      setInputNumber(0);
      setInputText('');
    }
  };

  return (
    <>
      <Modal
        centered
        title={
          <div style={{ textAlign: 'left', margin: '20px 25px 5px' }}>
            {edit ? '소비 지출 내역 등록' : '소비 지출 내역 수정'}
          </div>
        }
        centered
        open={open}
        onOk={handleSubmit}
        onCancel={() => setOpen(false)}
        bodyStyle={{
          margin: '20px auto 15px',
          width: '90%',
          padding: ' 0',
          justifyContent: 'center',
          alignContent: 'center',
        }}
        footer={
          <Button
            type="primary"
            style={{
              margin: '5px auto 20px',
              width: '90%',
              display: 'block',
              border: 'none',
              boxShadow: '2px 2px 8px rgb(240 240 240 / 88%)',
            }}
            onClick={edit ? handleSubmit : handleEdit}
            loading={isSending}
            disabled={isSending}
          >
            {edit ? '등록하기' : '수정하기'}
          </Button>
        }
      >
        <Space
          direction="vertical"
          align="center"
          style={{ width: '100%', display: 'block' }}
        >
          <DatePicker
            showTime
            onChange={selectDateHandler}
            style={{
              marginBottom: '5px',
            }}
          />

          <Input
            placeholder="지출 품목"
            defaultValue={''}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={selectedDate ? false : true}
            style={{
              marginBottom: '5px',
            }}
          />

          <Input
            type="number"
            // addonBefore={
            //   <Select
            //     defaultValue="-"
            //     onChange={(value: string) => {
            //       setPlusMinus(value);
            //     }}
            //     style={{ width: 60 }}
            //   >
            //     <Option value="+">+</Option>
            //     <Option value="-">-</Option>
            //   </Select>
            // }
            addonAfter="₩"
            value={inputNumber}
            onChange={(e) => setInputNumber(Number(e.target.value))}
            disabled={!inputText}
          />
        </Space>
      </Modal>
    </>
  );
}
