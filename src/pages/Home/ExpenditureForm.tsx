import { useEffect, useState } from 'react';
import { DatePicker, Space, Button, Modal, Input, message } from 'antd';
import { DailyExpensesType } from '@/types/expenses';
import dayjs from 'dayjs';

//Home index에서 받아오는 props 데이터 type interface
interface espenseFormProps {
  selectedData?: DailyExpensesType;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setToggleFetch: React.Dispatch<React.SetStateAction<boolean>>;
  edit?: boolean;
}

export default function ExpenditureForm({
  // Home index에서 받아오는 데이터 목록
  selectedData,
  open,
  setOpen,
  edit,
  setToggleFetch,
}: espenseFormProps) {
  // 소비내역 등록, 삭제, 수정 시 버튼에 표시되는 로딩상태 지정 변수
  const [isSending, setIsSending] = useState(false);
  // 소비내역 등록, 수정 시 입력값 및 지정 변수
  const [inputText, setInputText] = useState('');
  const [inputNumber, setInputNumber] = useState('');
  const [inputDate, setInputDate] = useState<dayjs.Dayjs | null>(null);

  //일별 소비 목록에서 수정버튼을 클릭했을때 선택된 데이터를 가져와서 입력값에 넣어주는 useeffect
  useEffect(() => {
    if (selectedData) {
      setInputText(selectedData.category);
      setInputNumber(selectedData.amount.toString());
      setInputDate(dayjs(selectedData.date).add(-9, 'hour'));
    }
  }, [selectedData]);

  //등록버튼 클릭시 실행되는 함수
  const handleSubmit = async () => {
    if (!inputDate) {
      message.error('날짜를 선택해주세요');
      return;
    }
    if (!inputText.trim()) {
      message.error('소비 내용을 입력해주세요');
      return;
    }
    if (!inputNumber.trim()) {
      message.error('소비 금액을 입력해주세요');
      return;
    }

    setIsSending(true);
    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
      const response = await fetch('http://52.78.195.183:3003/api/expenses', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          amount: inputNumber.trim(),
          userId: 'team3',
          category: inputText.trim(),
          date: dayjs(inputDate).add(9, 'hour').toISOString(),
        }),
      });
      if (!response.ok) {
        console.log('서버로 부터 응답이 왔는데 에러임.');
        message.error('오류가 발생하였습니다');
        return;
      }
      setToggleFetch((prev: boolean) => !prev);
      message.success('소비 내역이 등록되었습니다');
    } catch (error) {
      console.log('서버로 부터 응답 안옴', error);
      message.error('오류가 발생하였습니다');
    } finally {
      setIsSending(false);
      setOpen(false);
      setInputNumber('');
      setInputText('');
    }
  };
  //수정버튼 클릭시 실행되는 함수
  const handleEdit = async () => {
    setIsSending(true);
    await new Promise((resolve) => setTimeout(resolve, 300));

    if (!inputDate) {
      message.error('날짜를 선택해주세요');
      return;
    }
    if (!inputText.trim()) {
      message.error('소비 내용을 입력해주세요');
      return;
    }
    if (!inputNumber.trim()) {
      message.error('소비 금액을 입력해주세요');
      return;
    }

    try {
      const response = await fetch(
        `http://52.78.195.183:3003/api/expenses/${selectedData?._id}`,
        {
          method: 'PUT',
          headers: { 'content-type': 'application/json' },

          body: JSON.stringify({
            amount: inputNumber.trim(),
            userId: 'team3',
            category: inputText.trim(),
            date: dayjs(inputDate).add(9, 'hour').toISOString(),
          }),
        },
      );
      if (!response.ok) {
        console.log('서버로 부터 응답이 왔는데 에러임.');
        return;
      }
      setToggleFetch((prev: boolean) => !prev);
      message.success('소비 내역이 수정되었습니다');
    } catch (error) {
      console.log('서버로 부터 응답 안옴', error);
      message.error('오류가 발생하였습니다');
    } finally {
      setIsSending(false);
      setOpen(false);
    }
  };

  return (
    <>
      <Modal
        centered
        //edit 값이 true 일때 수정 타이틀, flase 일때 등록 타이틀 표시
        title={
          <div style={{ textAlign: 'left', margin: '20px 25px 5px' }}>
            {edit ? '소비 내역 수정' : '소비 내역 등록'}
          </div>
        }
        //open 변수가 true 일때 모달창 open
        open={open}
        //x 버튼 클릭시 open 변수가 flase로 지정후 모달 종료됨
        onCancel={() => {
          setOpen(false);
          setInputDate(edit ? dayjs(selectedData?.date).add(-9, 'hour') : null);
          setInputNumber(edit ? selectedData?.amount.toString() ?? '' : '');
          setInputText(edit ? selectedData?.category ?? '' : '');
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
            //edit 값이 true 일때 수정 기능 함수 실행, flase 일때 등록 기능 함수 실행
            onClick={edit ? handleEdit : handleSubmit}
            loading={isSending}
            disabled={isSending}
          >
            {edit ? '수정하기' : '등록하기'}
          </Button>
        }
      >
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <DatePicker
            value={inputDate}
            onChange={(data: dayjs.Dayjs | null) => setInputDate(data)}
            style={{ width: '100%' }}
            showTime
          />
          <Input
            placeholder="소비 내용"
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
            }}
          />
          <Input
            type="number"
            step={100}
            addonAfter="₩"
            placeholder="소비 금액"
            value={inputNumber}
            onChange={(e) => {
              setInputNumber(e.target.value);
            }}
          />
        </Space>
      </Modal>
    </>
  );
}
