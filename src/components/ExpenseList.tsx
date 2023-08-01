import { Link } from "react-router-dom";
import styled from "styled-components";

type Props = {
  _id: string;
  amount: number;
  category: string;
  date: string;
  searchText?: string;
};

const ExpenseList = ({ _id, amount, category, date, searchText }: Props) => {
  return (
    <ExpenseListContainer to={`/edit/${_id}`} state={{ amount, category, date }}>
      <TextInfo>
        <span>{category.split("+")[0]}</span>
        <span>{date.slice(11, 16)}</span>
      </TextInfo>
      <ExpenseInfo>
        {searchText ? (
          <ExpenseName
            dangerouslySetInnerHTML={{
              __html: category
                .split("+")[1]
                ?.replace(
                  new RegExp(searchText, "gu"),
                  `<span style="color:var(--point-color-red)">${searchText}</span>`
                )
            }}
          />
        ) : (
          <ExpenseName>{category.split("+")[1]}</ExpenseName>
        )}
        <ExpenseAmount className={amount > 0 ? "income" : ""}>
          ₩{amount > 0 ? amount.toLocaleString() : amount.toLocaleString().slice(1)}
        </ExpenseAmount>
      </ExpenseInfo>
    </ExpenseListContainer>
  );
};
export default ExpenseList;

const ExpenseListContainer = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 330px;
  min-height: 60px;
  max-width: 330px;
  max-height: 60px;
  padding: 0 20px 0;
  border-radius: 10px;
  margin-bottom: 12px;
  background-color: #ffffff;
  cursor: pointer;
`;

const TextInfo = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.8em;
  text-align: left;
  color: #9b9b9b;
`;

const ExpenseInfo = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 600;
  text-align: right;
  color: var(--base-color-black);
`;

const ExpenseName = styled.div`
  font-weight: 600;
`;

const ExpenseAmount = styled.span`
  color: var(--point-color-red);
  &.income {
    color: var(--point-color-green);
  }
`;
