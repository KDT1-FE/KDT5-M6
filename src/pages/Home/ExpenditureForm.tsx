import { useState } from 'react';
import { DatePicker, Space, Button, Modal, Input, Select } from 'antd';
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';

export default function ExpenditureForm() {
  const [isSending, setIsSending] = useState(false);
  const [open, setOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [inputNumber, setInputNumber] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');
  // const [plusMinus, setPlusMinus] = useState('-');

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
    } catch (error) {
      console.log('서버로 부터 응답 안옴', error);
    } finally {
      setIsSending(false);
      setOpen(false);
      setInputNumber(0);
      setInputText('');
    }
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        +
      </Button>
      <Modal
        title={<div>소비 지출 내역 등록</div>}
        open={open}
        onOk={handleSubmit}
        onCancel={() => setOpen(false)}
        footer={
          <Button
            type="primary"
            style={{
              margin: '20px auto 30px',
              width: '95%',
            }}
            onClick={handleSubmit}
            loading={isSending}
            disabled={isSending}
          >
            등록하기
          </Button>
        }
      >
        <Space direction="vertical" size={12}>
          <DatePicker showTime onChange={selectDateHandler} />
          <Input
            placeholder="지출 품목"
            defaultValue={''}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={selectedDate ? false : true}
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
