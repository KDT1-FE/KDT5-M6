import "@/Components/Search/Search.scss";
import { dataApi } from "@/Api/foodApi";
import { FoodKeywordContext } from "@/Store/SearchContext";
import { useContext, useEffect, useState } from "react";
import SearchItem from "@/Components/Search/Component/SearchItem";
import SearchPaging from "@/Components/Search/Component/SearchPaging";
import Modal from "../Modal/Modal";
import Calories from "@/Routes/Calories/Calories";
import { MdDonutLarge } from "react-icons/md";

function SearchPage() {
  const [count, setCount] = useState(10); //아이템 총 개수
  const [currentPage, setCurrentPage] = useState(1); //현재 페이지. 기본값 '1'
  const [postPerPage] = useState(10); //한 페이지에 보여질 아이템 수
  const [indexOfLastPost, setIndexOfLastPost] = useState(0); //현재 페이지의 마지막 아이템 인덱스
  const [indexOfFirstPost, setIndexOfFirstPost] = useState(0); //현재 페이지의 첫번째 아이템 인덱스
  const [currentPosts, setCurrentPosts] = useState<FoodItem[]>([]); //현재 페이지에서 보여지는 아이템

  const [foodlist, setFoodlist] = useState<FoodItem[]>([]);
  const { keyword } = useContext(FoodKeywordContext);

  const setPage = (error: any) => {
    setCurrentPage(error);
  };

  //유즈파람 수정하기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dataApi(keyword);
        const datas = response?.body.items; //타입스크립트 수정 준비
        setFoodlist(datas);
        setCount(datas.length);
      } catch (error) {
        console.error("음식정보 리스트 영역 오류", error);
      }
    };
    void fetchData();
  }, [keyword]);

  useEffect(() => {
    setIndexOfLastPost(currentPage * postPerPage); //현재 페이지와 한 페이지에 보여질 아이템 수를 곱하여 결과 값을 setIndexOfLastPost에 넘긴다. -> 마지막 포스트 수는 3
    setIndexOfFirstPost(indexOfLastPost - postPerPage); //indexOfLastPost의 값과 한 페이지에 보여질 아이템 수를 뺀다 그 결과를 setIndexOfFirstPost에 전달 -> 첫번째 포스트는 0
    setCurrentPosts(foodlist.slice(indexOfFirstPost, indexOfLastPost)); //products의 배열을 현재 페이지의 첫번째와 마지막에 인덱스까지 값을 복사, 반환하여 setCurrentPosts에 전달
  }, [currentPage, indexOfLastPost, indexOfFirstPost, postPerPage, foodlist]); //위에 기능이 끝나면 배열 안의 결과들을 한 번 실행

  const [scale, setScale] = useState(false);

  return (
    <div className="Container">
      <>
        <div className="CaloriesSearchTitle"><div className="strong">검색</div> 결과</div>
        <div className="SearchContent">검색한 음식의 칼로리입니다. 원하시는 음식 칼로리 선택하면 ‘음식 칼로리 기록’에 추가 됩니다.</div>
      </>
      <div className="SearchBar">
        {/* <div className="SearchBarTitle">검색 결과</div> */}
        <div className="SearchBarText">
          <div className="SearchText1"><span className="WhitePoint">{keyword}</span>에 대한 총</div>
          <div className="SearchText1"><span className="WhitePoint">{foodlist.length}</span>개 결과가나왔습니다.</div>
        </div>
        <div className="CaloriesModalOpen" onClick={() => { setScale(true); }}><MdDonutLarge/>추가한 칼로리 확인하기</div>
      </div>
      <Modal visibility={scale} toggle={setScale}>
        <Calories visibility={scale} toggle={setScale}/>
      </Modal>
      <div className="CardContainer">
        {currentPosts && currentPosts.length > 0 ? (
          currentPosts.map((item, index) => {
            return (
              <SearchItem
                key={index} //배열 번호로 사용
                title={item.DESC_KOR}
                calories={item.NUTR_CONT1}
                carbs={item.NUTR_CONT2}
                protein={item.NUTR_CONT3}
                fat={item.NUTR_CONT4}
                sugar={item.NUTR_CONT5}
                sodium={item.NUTR_CONT6}
                serving={item.SERVING_WT}
                id={item.id}
              />
            );
          })
        ) : (
          <>데이터가 없습니다.</>
        )}
      </div>
      <div className="Pagenation">
        <SearchPaging page={currentPage} count={count} setPage={setPage} />
      </div>
    </div>
  );
}

export default SearchPage;
