import dayjs from "dayjs";
import { postExpense } from "@/Api/api";
import "@/Routes/Calories/Calories.scss";
import { useContext, useState } from "react";
import FoodData from "@/Api/calories/FoodDB.json";
import Calendar from "@/Components/Calendar/Calendar";
import { FoodDelsContext } from "@/Store/SearchContext";
import RemoteDate from "@/Components/Calendar/RemoteDate";
import CaloriesCartList from "@/Routes/Calories/CaloriesCartList";
import { MdOutlineCalendarMonth, MdOutlineFace, MdOutlineFace3 } from "react-icons/md";

export default function Calories({ toggle }: any) {
  const [tab, setDealTab] = useState("curr");
  const [today, setToday] = useState(new Date().getDate());
  const [whatYear, setWhatYear] = useState(new Date().getFullYear());
  const [whatMonth, setWhatMonth] = useState(new Date().getMonth() + 1);

  const [updateCartList, setUpdateCartList] = useState(false);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const { setDelFoodItem } = useContext(FoodDelsContext);

  //달력 표시 토글 기능
  const toggleCalendarVisibility = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };

  //검색 포커스 기능
  const SearchFocus = () => {
    toggle();
    setDelFoodItem(true)
  };

  const todayDate = new Date();
  const formattedDate = `${todayDate.getFullYear()}-${String(todayDate.getMonth() + 1).padStart(2, '0')}-${String(todayDate.getDate()).padStart(2, '0')}`;
  
  function handleSubmit(item: ItemData) {
    const postData = {
      amount: Math.trunc(Number(item.NUTR_CONT1)),
      userId: "team6",
      category: "칼로리",
      description: item.DESC_KOR,
      date: formattedDate,
    };
    postExpense(postData);
    setUpdateCartList(prevState => !prevState);
  }

  return (
    <div className="CaloriesContainer">
      <div className="gender">
        <button
          type="button"
          id="GenderBtn"
          className={`btn ${tab === "curr" ? "active" : ""}`}
          onClick={() => setDealTab("curr")}
        >
          <div className="icon"><MdOutlineFace/></div>
          <span>남자 권장 칼로리</span>
        </button>
        <button
          type="button"
          id="GenderBtn"
          className={`btn ${tab === "prev" ? "active" : ""}`}
          onClick={() => setDealTab("prev")}
        >
          <div className="icon"><MdOutlineFace3/></div>
          <span>여자 권장 칼로리</span>
        </button>
      </div>
      <div className="CaloriesContainerTitle">자신의 성별을 선택하여 권장 칼로리를 확인하고 칼로리를 등록할 날짜를 달력을 사용하여 선택해주세요.</div>
      {/* 남자, 여자 권장 칼로리 표시 */}
      {tab === "curr" ? (
        <div className="HumanInfo">
          <ul className="RecommendCalories">
            <li><div className="ColorBox1" />탄수화물: 권장량 300-400g</li>
            <li><div className="ColorBox2" />단백질 : 권장량 55-75g</li>
            <li><div className="ColorBox3" />지방: 권장량 55-80g</li>
            <li><div className="ColorBox4" />당: 권고량 50g</li>
            <li><div className="ColorBox5" />나트륨: 권고량 2000mg</li>
          </ul>
        </div>
      ) : (
        <div className="HumanInfo">
          <ul className="RecommendCalories">
            <li><div className="ColorBox1" />탄수화물: 권장량 250-350g</li>
            <li><div className="ColorBox2" />단백질 : 권장량 45-65g</li>
            <li><div className="ColorBox3" />지방: 권장량 45-65g</li>
            <li><div className="ColorBox4" />당: 권고량 50g</li>
            <li><div className="ColorBox5" />나트륨: 권고량 2000mg</li>
          </ul>
        </div>
      )}
      <div className="DateBtn" onClick={toggleCalendarVisibility}>
        <div><MdOutlineCalendarMonth/></div>
        <div className="DateTitle">
          {dayjs(`${whatYear}-${whatMonth}-${today}`).format("YYYY-MM-DD")}
        </div>
      </div>
      {isCalendarVisible ? (
        <div className="CaloriesCalender">
          <RemoteDate
            month={whatMonth}
            year={whatYear}
            setMonth={setWhatMonth}
            setYear={setWhatYear}
            backgroundColor={"var(--primary2)"}
          />
          <Calendar
            month={whatMonth}
            year={whatYear}
            today={today}
            setToday={setToday}
            setMonth={setWhatMonth}
            setYear={setWhatYear}
            category={"칼로리"}
            backgroundColor={"var(--primary1)"}
          />
        </div>
      ) : (
        <div className="CaloriesFoodContainer">
          <div className="FoodBoxLeft">
            <div className="CaloriesTitle"><div className="strong">추천</div> 칼로리</div>
            <div className="Content">섭취한 음식을 선택해주세요. 추가음식 선택은 하단의 + 검색을 사용하주세요.</div>
            <div className="CaloriesFoodList">
              {FoodData.map((item, i) => {
                return (
                  <div className="CaloriesItemContainer" key={i} onClick={() => {handleSubmit(item);}}>
                    <div className="TitleBox">
                      <div className="PlusBtn">+</div>
                    </div>
                    <div className="ItemImg">
                      <img src={`/images/image-food-${item.image}.png`} />
                    </div>
                    <div className="ItemTitle">{item.DESC_KOR}</div>
                    <div className="ItemServing">
                      <div>({Math.trunc(Number(item.NUTR_CONT1))}Kcal)</div>
                    </div>
                  </div>
                );
              })}
              <div className="SearchBtn" onClick={SearchFocus}>+</div>
            </div>
          </div>
          <div className="FoodBoxRight">
            <div className="CaloriesTitle"><div className="strong">오늘</div> 나의 칼로리</div>
            <div className="Content">선택한 날짜의 칼로리 리스트를 확인할 수 있습니다.</div>
            <CaloriesCartList
              update={updateCartList}
              date={dayjs(`${whatYear}-${whatMonth}-${today}`).format("YYYY-MM-DD")}
              dates={dayjs(`${whatYear}-${whatMonth}-${today}`).format("YYYY년M월DD일")}
            />
          </div>
        </div>
      )}
    </div>
  );
}
