import React, { useState } from 'react';
import { DatePicker, Space, Button, Modal, Input, Select } from 'antd';
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
export default function ExpenditureForm() {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  // const [modalText, setModalText] = useState('Content of the modal');
  const [InputText, setInputText] = useState('');
  const [InputNumber, setInputNumber] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const selectDateHandler = (
    value: DatePickerProps['value'] | RangePickerProps['value'],
    dateString: [string, string] | string,
  ) => {
    const date = dateString;
    const Time = date.slice(0, 10);
    const Date = date.slice(11, 19);
    const selectedDate = `${Time}T${Date}`;
    setSelectedDate(selectedDate);
    console.log('ok:', selectedDate);
  };

  const onOk = (
    value: DatePickerProps['value'] | RangePickerProps['value'],
  ) => {
    console.log('onOk: ', selectedDate);
  };

  const { Option } = Select;

  const selectBefore = (
    <Select defaultValue="add" style={{ width: 60 }}>
      <Option value="add">+</Option>
      <Option value="minus">-</Option>
    </Select>
  );

  // interface ReqBody {
  //   amount: number;
  //   Id: string;
  //   category: string;
  //   date: string;
  // }

  // interface ResBody {
  //   message: string;
  // }

  const onclickHandler = async () => {
    console.log('등록합니다:', InputText, InputNumber, selectedDate);
    await fetch('http://52.78.195.183:3003/api/expenses', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        amount: `${InputNumber}`,
        userId: 'testtest28',
        category: `${InputText}`,
        date: `${selectedDate}`,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response.message);
      });
    // .then(() => {
    //   setConfirmLoading(true);
    //   setTimeout(() => {
    //     setOpen(false);
    //     setConfirmLoading(false);
    //   }, 1000);
    // });
  };
  const afterSubmit = () => {
    setInputText('');
    setInputNumber(0);
    setSelectedDate('');
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        +
      </Button>
      <Modal
        title={<div>소비 지출 내역 등록</div>}
        open={open}
        onOk={onclickHandler}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        afterClose={afterSubmit}
        footer={
          <Button
            className="btn__right"
            style={{
              margin: '20px auto 30px',
              width: '95%',
            }}
            key="submit"
            onClick={onclickHandler}
            disabled={InputNumber ? false : true}
          >
            등록완료하기
          </Button>
        }
      >
        <Space direction="vertical" size={12}>
          <DatePicker showTime onChange={selectDateHandler} onOk={onOk} />
        </Space>
        <Input
          placeholder="지출 품목"
          defaultValue={''}
          value={InputText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInputText(e.target.value)
          }
          disabled={selectedDate ? false : true}
        />

        <Input
          type="number"
          addonBefore={selectBefore}
          addonAfter="₩"
          placeholder="지출 및 입금내역"
          value={InputNumber}
          onChange={(e: React.ChangeEvent<number>) =>
            setInputNumber(e.target.value as number)
          }
          disabled={InputText ? false : true}
        />
      </Modal>
    </>
  );
}
