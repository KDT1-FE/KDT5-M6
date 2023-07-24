import { ApiHttp } from "@/Api/api";
import CaloriesItem from "./CaloriesItem";
import "@/Routes/Calories/CaloriesCartList.scss";
import { BiSolidMinusCircle } from "react-icons/bi";
import { useContext, useEffect, useState } from "react";
import { FoodAddsContext } from "@/Store/SearchContext";

function CaloriesCartList(props: any) {
  const [list, setList] = useState<Arr[]>([]);
  const { addFoodItem } = useContext(FoodAddsContext);

  //Api 등록된 리스트 불러오기
  async function get() {
    try {
      const res = await ApiHttp.get("expenses/search?userId=team6&q=칼로리");
      const data = res.data;
      if (data) {
        setList(
          data.filter((v: GetData) => {
            if (v.date.split("T")[0] === props.date) {
              return v;
            }
          })
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await ApiHttp.delete(`expenses/${id}`);
      setList((prevList) => prevList.filter((item) => item._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  // 리스트 업데이트시 랜더링
  useEffect(() => {
    get();
  }, [props.date, props.update, addFoodItem]);

  // 칼로리 총 합계 기능
  useEffect(() => {
    const sumCalories = list.reduce(
      (total, item) => total + Math.trunc(item.amount),
      0
    );
    setTotalCalories(sumCalories);
  }, [list]);

  const [totalCalories, setTotalCalories] = useState(0);

  return (
    <div className="CaloriesList">
      <div className="TotalCalories">
        <div className="TotalTitles">
          <div className="TotalTitleBox">
            <div className="TotalTitleDate">{props.dates}</div>
            <div className="TotalCaloriesText">총 칼로리</div>
          </div>
          <div className="TotalCaloriesData">
            {totalCalories}
            <div>Kcal</div>
          </div>
        </div>
        <div className="TabBox">
          <div className="TabTitle1">
            <div>여자 권장 칼로리</div>1,800~2,200 Kcal
          </div>
          <div className="TabTitle2">
            <div>남자 권장 칼로리</div>1,400~1,800 Kcal
          </div>
        </div>
      </div>
      <div className="CaloriesListBox">
        {list &&
          list.map((v, i) => {
            return (
              <div className="CaloriesAddItem" key={i}>
                <CaloriesItem key={i} v={v} i={i} setList={setList} />
                <BiSolidMinusCircle onClick={() => handleDelete(v._id)} />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default CaloriesCartList;
