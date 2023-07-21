import { useState, useEffect } from "react";
import { searchExpenses } from "@/api";
import { search } from "@/types/apiTypes";
import { useUserStore } from "@/store/useUserStore";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import BackBtn from "@/components/common/BackBtn";
import DailyList from "@/components/main/DailyList";
import styled from "styled-components";

const Search = () => {
  const userId = useUserStore((state) => state.userId);
  const [realSearchText, setRealSearchText] = useState("");
  const [searchData, setSearchData] = useState<search[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(true);
  const [searchResult, setSearchResult] = useState<{ [key: string]: search[] }>({});
  const [resultExist, setResultExist] = useState<boolean>(false);
  const [isStartSearch, setIsStartSearch] = useState<boolean>(false);

  useEffect(() => {
    onSearch();
    setIsSearching(true);
  }, [realSearchText]);

  useEffect(() => {
    if (Object.keys(searchResult).length > 0) {
      setResultExist(true);
    } else {
      setResultExist(false);
    }
  }, [searchResult]);

  const onSearch = async () => {
    if (realSearchText && userId) {
      searchExpenses(realSearchText, userId).then((res) => {
        setSearchData(res);
      });
    }
  };

  const autoSearchClickHandler = (index: number) => {
    const category = searchData[index].category.split("+")[1];
    setRealSearchText(category);
    setIsSearching(false);
  };

  const startSearch = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLSpanElement | MouseEvent>) => {
    e.preventDefault();
    const result = createResultList();
    setSearchResult(result);
    setIsSearching(false);
    setIsStartSearch(true);
  };

  const createResultList = () => {
    const newDayList: { [key: string]: search[] } = {};
    searchData.forEach((list) => {
      const date = list.date;
      const [, month, dayTime] = date.split("-");
      const day = dayTime.split("T")[0];
      const formattedDay = `${month}.${day}`;
      if (newDayList[formattedDay]) {
        newDayList[formattedDay].push(list);
      } else {
        newDayList[formattedDay] = [list];
      }
    });
    return newDayList;
  };

  return (
    <>
      <BackBtn />
      <SearchContainer>
        <SearchTitle>검색</SearchTitle>
        <SearchInputContainer>
          <form onSubmit={(e) => startSearch(e)}>
            <SearchInput
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setRealSearchText(e.target.value);
              }}
              value={realSearchText}
              placeholder="가계부 내역을 검색해보세요 ~"
            />
          </form>
          <SearchOutlined onClick={(e) => startSearch(e)} />
        </SearchInputContainer>
        <SearchResultContainer>
          {realSearchText ? (
            <AutoSearchContainer className={isSearching ? "" : "active"}>
              <AutoSearchWrap>
                {searchData.map((item: search, index) => (
                  <AutoSearchData key={index} onClick={() => autoSearchClickHandler(index)}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: item.category
                          .replace("+", ":")
                          ?.replace(
                            new RegExp(realSearchText, "gu"),
                            `<span style="color:var(--point-color-red)">${realSearchText}</span>`
                          )
                      }}
                    />
                  </AutoSearchData>
                ))}
              </AutoSearchWrap>
            </AutoSearchContainer>
          ) : null}
        </SearchResultContainer>
        {!resultExist && isStartSearch ? (
          <ResultContainer>
            <div>검색 결과가 존재하지 않아요! ㅠㅠ</div>
          </ResultContainer>
        ) : (
          <ResultContainer>
            {Object.entries(searchResult).map(([day, expenseList]) => (
              <DailyList key={day} day={day} expenseList={expenseList} searchText={realSearchText} />
            ))}
          </ResultContainer>
        )}
      </SearchContainer>
    </>
  );
};

export default Search;

const SearchContainer = styled.div`
  position: relative;
  top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 100%;
  min-height: 800px;
  max-width: 100;
  max-height: 800px;
`;

const SearchTitle = styled.div`
  font-weight: 700;
  font-size: 2em;
  margin: 24px;
`;

const SearchInputContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  width: 330px;
  max-width: 330px;
  height: 45px;
  border: 0;
  svg {
    width: 30px;
    height: 30px;
    path {
    }
  }
`;

const SearchInput = styled(Input)`
  width: 300px;
  height: 50px;
  outline: none;
  border-radius: 10px;
  border: 1px solid var(--base-color-grey);
  padding-left: 10px;
  background-color: #ffffff;
`;

const SearchResultContainer = styled.div``;

const AutoSearchContainer = styled.div`
  position: relative;
  display: block;
  width: 300px;
  min-height: 100px;
  border: 2px solid var(--base-color-grey);
  border-radius: 10px;
  padding: 15px;
  margin-right: 40px;
  background-color: #ffffff;
  z-index: 9;
  &.active {
    display: none;
  }
`;

const AutoSearchWrap = styled.ul``;

const AutoSearchData = styled.li`
  list-style: none;
  padding: 6px 8px;
  width: 100%;
  font-size: 14px;
  font-weight: bold;
  z-index: 4;
  letter-spacing: 2px;
  &:hover {
    background-color: #edf5f5;
    cursor: pointer;
  }
  position: relative;
  img {
    position: absolute;
    right: 5px;
    width: 18px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const ResultContainer = styled.div`
  display: block;
  position: absolute;
  top: 150px;
`;
