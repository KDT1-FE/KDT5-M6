import { Dispatch, SetStateAction, useState } from 'react';
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

  setToggleFetch: React.Dispatch<React.SetStateAction<boolean>>;
  edit?: boolean;
  list: boolean;
  setList: React.Dispatch<React.SetStateAction<boolean>>;
  selectedId?: string | null;
  selectedAmount?: number;
  selectedCategory?: string;
  selectedDate?: string;
}

export default function ExpenditureForm({
  open,
  setOpen,
  edit,
  list,
  setList,
  selectedId,
  selectedAmount,
  selectedCategory,
  selectedDate,
  setToggleFetch,
}: espenseFormProps) {
  // { selected }: espenseEditDeletProps,
  const [isSending, setIsSending] = useState(false);
  const [inputText, setInputText] = useState('');
  const [inputNumber, setInputNumber] = useState(0);
  const [selecteDate, setSelecteDate] = useState('');
  // const [plusMinus, setPlusMinus] = useState('-');

  const selectDateHandler = (
    _value: DatePickerProps['value'] | RangePickerProps['value'],
    dateString: string,
  ) => {
    const date = dateString;
    const Time = date.slice(0, 10);
    const Date = date.slice(11, 19);
    const selecteDate = `${Time}T${Date}`;
    setSelecteDate(selecteDate);
  };

  const displaydate = selectedDate?.slice(0, 10);
  const dispalyTime = selectedDate?.slice(11, 19);
  const displayDate = `${displaydate} ${dispalyTime}`;

  // const { Option } = Select;

  const cancleHandler = () => {
    setIsSending(false);
    setOpen(false);
    setInputNumber(0);
    setInputText('');
    setSelecteDate('');
  };

  const handleSubmit = async () => {
    setIsSending(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    if (inputText.length <= 0) {
      alert('카테고리를 입력해주세요');
    }
    if (selecteDate.length <= 0) {
      alert('날짜를 입력해주세요');
    }
    if (inputNumber == 0) {
      alert('지출내역을 입력해주세요');
      cancleHandler();
      return;
    }
    try {
      const response = await fetch('http://52.78.195.183:3003/api/expenses', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          amount: inputNumber,
          userId: 'team3',
          category: inputText,
          date: selecteDate,
        }),
      });
      if (!response.ok) {
        console.log('서버로 부터 응답이 왔는데 에러임.');
        return;
      }
      setToggleFetch((prev: boolean) => !prev);
      // 성공적으로 추가함
    } catch (error) {
      console.log('서버로 부터 응답 안옴', error);
    } finally {
      setIsSending(false);
      setOpen(false);
      setList(!list);
      setInputNumber(0);
      setInputText('');
      setSelecteDate('');
    }
  };

  const handleEdit = async () => {
    setIsSending(true);
    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
      const response = await fetch(
        `http://52.78.195.183:3003/api/expenses/${selectedId}`,
        {
          method: 'PUT',
          headers: { 'content-type': 'application/json' },

          body: JSON.stringify({
            amount: inputNumber || selectedAmount,
            userId: 'team3',
            category: inputText || selectedCategory,
            date: selecteDate || selectedDate,
          }),
        },
      );
      if (!response.ok) {
        console.log('서버로 부터 응답이 왔는데 에러임.');
        return;
      }
      console.log('수정 완료');
      // 성공적으로 수정함
    } catch (error) {
      console.log('서버로 부터 응답 안옴', error);
    } finally {
      setIsSending(false);
      setOpen(false);
      setList(!list);
      setInputNumber(0);
      setInputText('');
      setSelecteDate('');
    }
  };

  return (
    <>
      <Modal
        centered
        title={
          <div style={{ textAlign: 'left', margin: '20px 25px 5px' }}>
            {edit ? '소비 지출 내역 수정' : '소비 지출 내역 등록'}
          </div>
        }
        open={open}
        onOk={handleSubmit}
        onCancel={() => {
          setOpen(false);
          setInputNumber(0);
          setInputText('');
        }}
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
            onClick={handleSubmit}
            loading={isSending}
            disabled={isSending}
          >
            {edit ? '수정하기' : '등록하기'}
          </Button>
        }
      >
        <Space
          direction="vertical"
          align="center"
          style={{ width: '100%', display: 'block' }}
        >
          <DatePicker
            placeholder={edit ? '일자 선택' : `${displayDate}`}
            showTime
            onChange={selectDateHandler}
            style={{
              marginBottom: '5px',
            }}
          />

          <Input
            placeholder={edit ? '지출 품목' : selectedCategory}
            value={edit ? inputText : null || inputText}
            onChange={(e) => {
              setInputText(e.target.value);
            }}
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
            step={100}
            placeholder={edit ? '0' : selectedAmount}
            defaultValue={edit ? '0' : inputNumber || selectedAmount}
            value={edit ? inputNumber || null : inputNumber || null}
            onChange={(e) => setInputNumber(Number(e.target.value))}
          />
        </Space>
      </Modal>
    </>
  );
}
