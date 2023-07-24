import { useState } from "react";
import ContentList from "@/Components/Common/Content-list.tsx";
import "@/Components/Common/Content_modal.scss";
import { AiFillPlusCircle } from "react-icons/ai";
import useDataQuery from "@/Hooks/useData-Query.tsx";

export default function ContentPost({ todayDate, categoryName }: { todayDate: string, categoryName: string }) {
  const [text, setText] = useState("");
  const [money, setMoney] = useState(0);
  const [isFromVisible, setIsFromVisible] = useState(false);
  const { addExpend} = useDataQuery();


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const postData: ExpendType =
      { amount: money, userId: "team6", category: categoryName, description: text, date: String(todayDate) };
    addExpend.mutate(postData);
    setText("");
    setMoney(0);
    setIsFromVisible(false);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const re = /^[0-9\b]+$/;
    e.target.id === "money"
      ? (e.target.value === "" || re.test(e.target.value)) && setMoney(Number(e.target.value))
      : setText(e.target.value);
  };
  return (
    <div className={"pretend-buy-container"}>
      <div className="list-info">오늘 내가 절약한 소비를 입력하여 저축을 늘려보세요.</div>
      <div className={"list-container"}>
        <ContentList date={todayDate} category={categoryName} />
      </div>
      {isFromVisible &&
        <form
          className={"post-form"}
          onSubmit={handleSubmit}>
          <div>
            <input
              className={"content-input"}
              placeholder="절약한 상품명"
              id="product"
              onChange={handleChange}
              value={text}
              type="text"
              name="action"
            />
          </div>
          <div>
            <input
              className={"money-input"}
              id="money"
              onChange={handleChange}
              value={money}
              type="text"
              name="money"
            />
          </div>
          <div className={"buttons"}>
            <button className={"addButton"} type={"submit"}>추가</button>
          </div>
        </form>}
        <div className={"img-button"}>
        <AiFillPlusCircle
          className={"plus-button"}
          onClick={() => {
            setIsFromVisible(!isFromVisible);
          }} />
      </div>
    </div>
  );
}
