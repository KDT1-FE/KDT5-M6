import { useEffect, useState } from 'react';
import { DatePicker, Space, Button, Modal, Input } from 'antd';
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
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
  const [inputNumber, setInputNumber] = useState('' as string);
  const [selecteDate, setSelecteDate] = useState('');

  //일별 소비 목록에서 수정버튼을 클릭했을때 선택된 데이터를 가져와서 입력값에 넣어주는 useeffect
  useEffect(() => {
    if (
      selectedData?.category !== undefined &&
      selectedData?.category !== undefined
    ) {
      setInputText(selectedData.category);
      //amount의 number type을 string type으로 변경
      setInputNumber(selectedData.amount as unknown as string);
      setSelecteDate(selectedData.date);
    }
  }, [selectedData?.amount, selectedData?.category, selectedData?.date]);

  //Date 입력값 선택 시 api 요청 데이터에 맞게 변경해주는 변수
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

  //Date 표시 format 지정
  const dateFormat = 'YYYY-MM-DD HH:mm:ss';

  // cancel 버튼 클릭시 실행되는 함수, 로딩 종료 및 모달창 닫기
  const cancleHandler = () => {
    setIsSending(false);
    setOpen(false);
  };

  //등록버튼 클릭시 실행되는 함수
  const handleSubmit = async () => {
    setIsSending(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    //카테고리 유효성검사(입력된값의 길이가 0과 같더나 작을때) 후 알럿메세지
    if (inputText && inputText.length <= 0) {
      alert('카테고리를 입력해주세요');
    }
    //날짜 유효성검사(입력된값의 길이가 0과 같더나 작을때) 후 알럿메세지
    if (selecteDate.length <= 0) {
      alert('날짜를 입력해주세요');
    }
    //지출금액 유효성검사(입력된값의 길이가 0과 같더나 작을때) 후 알럿메세지
    if (inputNumber.length <= 0) {
      alert('지출금액을 입력해주세요');
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
      cancleHandler();
      //등록완료 후 모달이 종료되었을때 입력값을 초기화시켜주는 변수
      setInputNumber('');
      setInputText('');
    }
  };

  //수정버튼 클릭시 실행되는 함수
  const handleEdit = async () => {
    setIsSending(true);
    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
      const response = await fetch(
        `http://52.78.195.183:3003/api/expenses/${selectedData?._id}`,
        {
          method: 'PUT',
          headers: { 'content-type': 'application/json' },

          body: JSON.stringify({
            amount: inputNumber,
            userId: 'team3',
            category: inputText,
            date: selecteDate,
          }),
        },
      );
      if (!response.ok) {
        console.log('서버로 부터 응답이 왔는데 에러임.');
        return;
      }
      setToggleFetch((prev) => !prev);
    } catch (error) {
      console.log('서버로 부터 응답 안옴', error);
    } finally {
      cancleHandler();
      //수정완료 후 모달이 종료되었을때 입력값을 초기화시켜주는 변수
      setInputNumber('');
      setInputText('');
      setSelecteDate('');
    }
  };

  return (
    <>
      <Modal
        centered
        //edit 값이 true 일때 수정 타이틀, flase 일때 등록 타이틀 표시
        title={
          <div style={{ textAlign: 'left', margin: '20px 25px 5px' }}>
            {edit ? '소비 지출 내역 수정' : '소비 지출 내역 등록'}
          </div>
        }
        //open 변수가 true 일때 모달창 open
        open={open}
        //x 버튼 클릭시 open 변수가 flase로 지정후 모달 종료됨
        onCancel={() => {
          setOpen(false);
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
        <Space
          direction="vertical"
          align="center"
          style={{ width: '100%', display: 'block' }}
        >
          <DatePicker
            //날짜 선택
            placeholder="일자 선택"
            //edit 값이 true 일때 수정 기능 함수 실행, flase 일때 등록 기능 함수 실행
            value={edit ? dayjs(selecteDate, dateFormat) : undefined}
            //요청 데이터에서 필요로 하는 날짜 형식
            format={dateFormat}
            showTime
            //Date 입력값 선택 시 api 요청 데이터에 맞게 변경해주는 변수
            onChange={selectDateHandler}
            style={{
              marginBottom: '5px',
            }}
          />
          <Input
            // 카테고리 입력
            placeholder="지출 품목"
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
            }}
            style={{
              marginBottom: '5px',
            }}
          />

          <Input
            // 지출금액 입력
            type="number"
            addonAfter="₩"
            step={100}
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
