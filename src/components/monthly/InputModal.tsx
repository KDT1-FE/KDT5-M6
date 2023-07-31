import { useState, forwardRef } from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Select, Radio } from 'antd'
import { getUserData } from 'utils/index'
import { submitApi } from 'apis/index'

export function ModalContent({
  onClose,
  onSearch
}: {
  onClose: () => void
  onSearch: (params?: any) => void
}) {
  const [ViewData, setViewData] = useState({
    userId: '',
    amount: 0,
    priceText: '',
    date: new Date(),
    category: '입금',
    radioStatus: '입금'
  })

  const buttons = [
    { text: '입금', backgroundColor: '#53c7a1', color: 'white' },
    { text: '지출', backgroundColor: '#FF6666', color: 'white' }
  ]

  const optiondatalist = [
    {
      value: '식비',
      label: '식비'
    },
    {
      value: '교통비',
      label: '교통비'
    },
    {
      value: '의료/건강',
      label: '의료/건강'
    },
    {
      value: '쇼핑',
      label: '쇼핑'
    },
    {
      value: '공과금',
      label: '공과금'
    },
    {
      value: '여가',
      label: '여가'
    },
    {
      value: '기타',
      label: '기타'
    }
  ]

  const getChangeDate = (date: any) => {
    setViewData(prevData => ({
      ...prevData,
      date: date
    }))
  }

  const handleChange = (e: any) => {
    const formattedValue = e.target.value.replace(/[^0-9]/g, '') // 숫자 이외의 문자 제거
    const formattedNumber = formatter.format(Number(formattedValue)) // 포맷 적용

    setViewData(prevData => ({
      ...prevData,
      amount: Number(formattedValue),
      priceText: formattedNumber
    }))
  }

  const formatter = new Intl.NumberFormat('ko-KR')

  const DatePick = forwardRef(({ value, onClick }: { value: string; onClick: () => void }) => (
    <Datebutton
      className="custom-btn"
      onClick={onClick}>
      {value}
    </Datebutton>
  ))

  const onChangeSelect = (value: any) => {
    setViewData(prevData => ({
      ...prevData,
      category: value
    }))
  }

  const handleButtonInnerClick = () => {
    onClose()
  }

  const submitButton = () => {
    if (ViewData.amount === 0) {
      alert('금액을 입력해주세요.')
      return
    }

    if (ViewData.category === '' && ViewData.radioStatus !== '입금') {
      alert('카테고리를 선택해주세요.')
      return
    }

    let updatedAmount = ViewData.amount
    if (ViewData.radioStatus === '지출') {
      updatedAmount = -Number(updatedAmount)
    }

    const updatedData = {
      ...ViewData,
      userId: getUserData()?.email ?? '',
      amount: updatedAmount
    }

    if (confirm('내역을 등록하시겠습니까?')) {
      sendReg(updatedData)
    }
  }

  const sendReg = async (updatedData: any) => {
    try {
      const response = await submitApi(updatedData)
      if (response.status === 201) {
        alert('등록되었습니다.')
        onSearch(updatedData.date)
        onClose()
      } else {
        alert('등록 실패했습니다. 관리자에게 문의하세요.')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const statusRadio = (e: any) => {
    const selectItem = e.target.value

    setViewData(prevData => ({
      ...prevData,
      radioStatus: selectItem
    }))
  }

  return (
    <ModalComponent>
      <ModaltopBox>
        <DateBox>
          <DatePicker
            dateFormat="yyyy-MM-dd"
            selected={ViewData.date}
            onChange={getChangeDate}
            customInput={
              <DatePick
                value={''}
                onClick={function (): void {
                  throw new Error('Function not implemented.')
                }}
              />
            }
          />
        </DateBox>
        <XbuttonBox onClick={handleButtonInnerClick}>
          <button>x</button>
        </XbuttonBox>
      </ModaltopBox>
      <InputBox>
        <span className="money">₩</span>
        <input
          type="text"
          name="amount"
          onChange={handleChange}
          value={ViewData.priceText}
          style={{ fontSize: '60px' }}
          placeholder="0"
        />
      </InputBox>
      <SelectBox>
        <Select
          placeholder="카테고리를 골라주세요!"
          optionFilterProp="children"
          onChange={onChangeSelect}
          style={{ margin: 'auto', width: '200px' }}
          //onSearch={onSearch}
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={optiondatalist}
        />
      </SelectBox>
      <ButtonBox>
        <ButtonInner>
          <Radio.Group
            name="radiogroup"
            defaultValue={'입금'}
            onChange={statusRadio}>
            {buttons.map((button, index) => (
              <StyledButton
                key={index}
                backgroundColor={button.backgroundColor}
                color={button.color}>
                <Radio value={button.text}>{button.text}</Radio>
              </StyledButton>
            ))}
          </Radio.Group>
        </ButtonInner>
      </ButtonBox>
      <Register>
        <button onClick={submitButton}>등록</button>
      </Register>
    </ModalComponent>
  )
}

const ModalComponent = styled.div`
  width: 90%;
  margin: auto;
  left: 10%;
  border-radius: 10px;
  padding-bottom: 90px;
  background-color: #ffff;
  position: absolute;
  z-index: 100;
  bottom: 220px;
`
const ModaltopBox = styled.div`
  width: 100%;
  position: relative;
  margin-top: 10px;
  display: flex;
`

const DateBox = styled.div`
  width: 150px;
  height: 30px;
  position: relative;
  left: 30px;
  margin-top: 5px;
  font-weight: bold;
`
const XbuttonBox = styled.div`
  width: 6%;
  height: 30px;
  position: absolute;
  left: 90%;
  top: 8px;

  button {
    width: 100%;
    height: inherit;
    border: none;
    background-color: #d8d8d8;
  }
`

const InputBox = styled.div`
  width: 100%;
  height: 90px;
  margin-top: 30px;

  .money {
    position: relative;
    font-size: 60px;
    font-weight: bold;
    top: 10px;
    color: #454545;
    left: 40px;
  }

  input {
    width: 40%;
    height: 70px;
    position: relative;
    top: 10px;
    left: 80px;
    padding: 10px;
    border: none;
    caret-color: red;
    color: #19376d;
  }

  input:focus {
    outline: none;
  }
`
const Datebutton = styled.button`
  width: 110px;
  height: 40px;
  border: none;
  border-radius: 30px;
  background-color: #8d72e1;
  color: white;

  :hover {
    background-color: #ad7be9;
  }
`

const SelectBox = styled.div`
  width: 200px;
  height: 50px;
  margin: auto;
  position: relative;
  top: 15px;
`

const ButtonBox = styled.div`
  width: 100%;
  height: 100px;
  margin-top: 30px;
  position: relative;
  display: flex;
`
const ButtonInner = styled.div`
  width: 100%;
  padding-bottom: 15px;
  position: relative;

  .ant-radio-group{
    position: relative;
    left: 20%;
    width: 60%;
    display: flex;
  }
`

const StyledButton = styled.button<{ backgroundColor: string; color: string }>`
  background-color: ${props => props.backgroundColor};
  color: ${props => props.color};
  /* 원하는 스타일 속성 추가 */
  width: 50%;
  height: 65px;
  margin: 10px;
  padding: 5px 10px;
  font-size: 16px;
  border: none;
  position: relative;
  border-radius: 4px;
  cursor: pointer;
`

const Register = styled.div`
  width: 140px;
  height: 50px;
  margin: auto;

  button {
    width: inherit;
    height: inherit;
    background-color: #F4E0B9;
    border: none;
    border-radius: 5px;
  }
`
