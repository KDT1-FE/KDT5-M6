import Pagination from "react-js-pagination";
import "@/Components/Search/Component/SearchPaging.scss";

const SearchPaging: React.FC<SearchPagingProps> = ({page, count, setPage}) => {

  return (
    <div className="PageStyles">
      <Pagination
        activePage={page} //현재 페이지
        itemsCountPerPage={page} //한페이지에 보이는 아이템 개수
        totalItemsCount={count} //아이템 총 개수
        pageRangeDisplayed={3} //페이지네이션에서 보여줄 페이지 범위
        prevPageText={"<"} //이전 텍스트
        nextPageText={">"} //다음 텍스트
        lastPageText={""} //맨 마지막 이동 텍스트
        firstPageText={""} //맨 앞으로 이동 텍스트
        itemClassFirst={"FirstArrow"} //맨 앞으로 이동 텍스트 스타일 적용 클래스명
        itemClassPrev={"PrevArrow"} //맨 이전 이동 텍스트 스타일 적용 클래스명
        itemClassNext={"NextArrow"} //맨 다음 이동 텍스트 스타일 적용 클래스명
        itemClassLast={"ListArrow"} //맨 마지막 이동 텍스트 스타일 적용 클래스명
        activeClass={"active"} //페이지 번호 텍스트 선택 상태 스타일 적용 클래스명
        itemClass={"item"} //번호 페이지 텍스트 스타일 적용 클래스명
        onChange={setPage} //페이지가 바뀌면 핸들링 시켜줄 함수
      />
    </div>
  );
}

export default SearchPaging;
