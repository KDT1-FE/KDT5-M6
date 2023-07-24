import { postExpense } from "@/Api/api";
import { useContext } from "react";
import "@/Components/Search/Component/SearchItem.scss";
import { FoodAddsContext } from "@/Store/SearchContext";

function SearchItem(item: Item) {
  const { addFoodItem, setAddFoodItem } = useContext(FoodAddsContext);

  const todayDate = new Date();
  const formattedDate = `${todayDate.getFullYear()}-${String(todayDate.getMonth() + 1).padStart(2, '0')}-${String(todayDate.getDate()).padStart(2, '0')}`;


  function handleSubmit(item: any) {
    const postData ={ amount: Math.trunc(Number(item.calories)), userId: "team6", category: "칼로리", description: item.title,  date: formattedDate};
    postExpense(postData)
    setAddFoodItem(!addFoodItem)
    alert(` 나의 칼로리 정보에 '${item.title}' 추가 완료`)
  };

  return (
    <>
      <div className="ItemContainer" onClick={() => {handleSubmit(item)}}>
        <div className="TitleBox">
          <div className="ItemNumber">{item.id}</div>
          <div
            className="AddBtn"
          >+</div>
        </div>
        <div className="ItemTitle">{item.title}</div>
        <div className="ItemInfoBox">
          <span><div className="Pont1"/>당류: {item.sugar}g</span>
          <span><div className="Pont2"/>지방: {item.fat}g</span>
          <span><div className="Pont3"/>단백질: {item.protein}g</span>
          <span><div className="Pont4"/>나트륨: {item.sodium}mg</span>
          <span><div className="Pont5"/>탄수화물: {item.carbs}g</span>
          <span><div className="Pont6"/>1회 제공량: {item.serving}g</span>
        </div>
        <div className="ItemServing">
          {Math.trunc(Number(item.calories))}
          <span>Kcal</span>
        </div>
      </div>
    </>
  );
}

export default SearchItem;
