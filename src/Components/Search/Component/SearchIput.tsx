import { useNavigate } from "react-router-dom";
import { FoodDelsContext, FoodKeywordContext } from "@/Store/SearchContext";
import "@/Components/Search/Component/SearchInput.scss";
import { MdSearch } from "react-icons/md"
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import NoPage from "./SearchNoPage";

function SearchIput() {
  const navi = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState<string>("");
  const { setKeyword } = useContext(FoodKeywordContext);
  const [showNoPage, setShowNoPage] = useState<boolean>(false);
  const { delFoodItem, setDelFoodItem } = useContext(FoodDelsContext);

  /** 검색값을 감지하여 setSearch에 전달 */
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  /** 키보드 'Enter'키 인식 후 handleSearchClick 함수 작동 기능 */
  const handleKeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearchClick();
    }
  };

  /** 상태 관리에 있는 검색값을 dataApi의 매개변수로 전달하는 검색 기능 */
  const handleSearchClick = () => {
    const trimSearch = search.trim();
    if (trimSearch === "") {
      alert("검색어를 입력해주세요");
    } else {
      const finalSearch = trimSearch.replace(/\s/g, "");
      navi("/search/" + finalSearch);
      setKeyword(finalSearch);
    }
  };

  const focusSearchInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    if (delFoodItem) {
      focusSearchInput();
      setDelFoodItem(false);
    }
  }, [delFoodItem]);

  useEffect(() => {
    if (searchResultsEmpty()) {
      setShowNoPage(true);
    } else {
      setShowNoPage(false);
    }
  }, [search]);

  const searchResultsEmpty = () => {
    return false;
  };
  
  return (
    <>
      <div className="search">
        <input
          ref={inputRef}
          type="text"
          value={search}
          onChange={handleSearchChange}
          onKeyDown={handleKeydown}
        />
        <div className="SearchIcon" onClick={handleSearchClick}><MdSearch/></div>
      </div>
      <div>
      {showNoPage && <NoPage />}
      </div>
    </>
  );
}

export default SearchIput;
