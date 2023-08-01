import { editExpense, deleteExpense } from "@/api";
import { useState, useEffect } from "react";
import { styled } from "styled-components";
import { Button } from "antd";
import BackBtn from "@/components/common/BackBtn";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { ConsumptionTags, IncomeTags } from "@/constants/tags";
import { Icon } from "@iconify/react";
import { useUserStore } from "@/store/useUserStore";

const Edit = () => {
  const { _id } = useParams<string>();
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;

  const userId = useUserStore((state) => state.userId);
  const [expense, setExpense] = useState<boolean>(true);
  const [inputCheck, setInputCheck] = useState([true, true, true, true, true] as boolean[]);
  const [isActive, SetIsActive] = useState<boolean>(false);
  const [date, setDate] = useState<string>(data.date.split("T")[0]);
  const [time, setTime] = useState<string>(data.date.split("T")[1].slice(0, 5));
  const [amount, setAmount] = useState<number>(Math.abs(data.amount));
  const [tag, setTag] = useState<string>(data.category.split("+")[0]);
  const [content, setContent] = useState<string>(data.category.split("+")[1]);

  useEffect(() => {
    if (inputCheck.every((input) => input === true)) {
      SetIsActive(true);
    } else {
      SetIsActive(false);
    }
  }, [inputCheck]);

  useEffect(() => {
    if (data.amount > 0) {
      setExpense(false);
    } else {
      setExpense(true);
    }
  }, [data]);

  // input 내용 입력 시 버튼 active 핸들러
  const inputCheckHandler = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    if (e.target.value) {
      const updatedInputs = [...inputCheck];
      updatedInputs[index] = true;
      setInputCheck(updatedInputs);
    } else {
      const updatedInputs = [...inputCheck];
      updatedInputs[index] = false;
      setInputCheck(updatedInputs);
    }
  };

  // 수정 버튼 핸들러
  const editBtnHandler = (tag: string) => {
    if (userId) {
      const body = {
        amount: expense ? -amount : amount,
        userId: userId,
        category: `${tag}+${content}`,
        date: `${date}T${time}:00.000Z` //"2023-07-04T10:30:00.000Z"
      };

      editExpense(body, _id as string).then(() => {
        setInputCheck([true, true, false, false, false] as boolean[]);
        SetIsActive(false);
        setDate(new Date().toISOString().substring(0, 10));
        setTime(new Date().toTimeString().slice(0, 5));
        setAmount(0);
        setTag("");
        setContent("");
        alert("수정 완료!");
        navigate(-1);
      });
    }
  };

  // 삭제 버튼 핸들러
  const deleteBtnHandler = () => {
    deleteExpense(_id as string).then(() => {
      alert("삭제 성공!");
      navigate(-1);
    });
  };

  // 지출/수입 버튼 핸들러
  const expenseConsumeHandler = () => {
    setExpense(true);
  };

  const expenseIncomeHandler = () => {
    setExpense(false);
  };

  // 날짜/시간 핸들러
  const dateInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const timeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
  };

  // 금액 핸들러
  const amountInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
  };

  // 태그 핸들러
  const tagInputHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTag(e.target.value);
  };

  // 내용 핸들러
  const contentInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  return (
    <>
      <BackBtn />
      <AddContainer>
        <ExpenseBtns>
          <ConsumeButton $expense={expense} onClick={() => expenseConsumeHandler()}>
            지출
          </ConsumeButton>
          <IncomeButton $expense={expense} onClick={() => expenseIncomeHandler()}>
            수입
          </IncomeButton>
        </ExpenseBtns>
        <FormContainer action="">
          <FormElement>
            <label htmlFor="date">날짜</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => {
                inputCheckHandler(e, 0);
                dateInputHandler(e);
              }}
            />
          </FormElement>
          <FormElement>
            <label htmlFor="time">시간</label>
            <input
              type="time"
              id="time"
              value={time}
              onChange={(e) => {
                inputCheckHandler(e, 1);
                timeInputHandler(e);
              }}
            />
          </FormElement>
          <FormElement>
            <label htmlFor="amount">금액</label>
            <input
              type="number"
              id="amount"
              pattern="\d*"
              placeholder="₩4,500"
              value={amount === 0 ? "" : amount}
              onChange={(e) => {
                inputCheckHandler(e, 2);
                amountInputHandler(e);
              }}
            />
          </FormElement>
          <FormElement>
            <label htmlFor="tag">태그</label>
            <select
              id="tag"
              value={tag}
              onChange={(e) => {
                inputCheckHandler(e, 3);
                tagInputHandler(e);
              }}
            >
              {expense
                ? ConsumptionTags.map((tag) => (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  ))
                : IncomeTags.map((tag) => (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  ))}
            </select>
          </FormElement>
          <FormElement>
            <label htmlFor="content">내용</label>
            <input
              type="text"
              id="content"
              placeholder="스타벅스 아이스 아메리카노"
              value={content}
              onChange={(e) => {
                inputCheckHandler(e, 4);
                contentInputHandler(e);
              }}
            />
          </FormElement>
        </FormContainer>
        <SubmitBtn $isActive={isActive}>
          <Button type="primary" disabled={!isActive} onClick={() => editBtnHandler(tag)}>
            수정하기
          </Button>
        </SubmitBtn>
        <DeleteBtn onClick={deleteBtnHandler}>
          <Icon icon="maki:waste-basket" />
          <div>삭제하기</div>
        </DeleteBtn>
      </AddContainer>
    </>
  );
};

export default Edit;

interface ButtonProps {
  $expense: boolean;
}
interface SubmitBtnProps {
  $isActive: boolean;
}

const AddContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  width: 390px;
  height: auto;
  margin-top: 100px;
`;

const ExpenseBtns = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  color: #ffffff;
`;

const ConsumeButton = styled.button<ButtonProps>`
  width: 100px;
  height: 30px;
  border: none;
  outline: none;
  border-radius: 10px;
  background-color: ${(props) => (props.$expense ? "var(--point-color-red)" : "var(--base-color-grey)")};
  color: #ffffff;
`;

const IncomeButton = styled.button<ButtonProps>`
  width: 100px;
  height: 30px;
  border: none;
  outline: none;
  border-radius: 10px;
  background-color: ${(props) => (props.$expense ? "var(--base-color-grey)" : "var(--point-color-green)")};
  color: #ffffff;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  width: 280px;
  height: auto;
`;

const FormElement = styled.div`
  label {
    margin-right: 20px;
    font-weight: 600;
  }
  input,
  select {
    width: 200px;
    height: 30px;
    border: none;
    border-bottom: 1px solid var(--base-color-grey);
    background-color: transparent;
  }
`;

const SubmitBtn = styled.div<SubmitBtnProps>`
  Button {
    width: 300px;
    height: 50px;
    border-radius: 10px;
    background-color: ${(props) => (props.$isActive ? "var(--point-color-yellow)" : "var(--base-color-grey)")};
  }
`;

const DeleteBtn = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: #505050;
  width: 300px;
  height: 30px;
  svg {
    width: 20px;
    height: 20px;
  }
`;
