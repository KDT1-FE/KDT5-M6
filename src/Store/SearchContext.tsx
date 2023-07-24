import React, { createContext, useState } from "react";

/** 설명 */
export const FoodKeywordContext = createContext<FoodContextType>({
  keyword: "",
  setKeyword: () => {
    return;
  },
});

/** 설명 */
export const FoodAddsContext = createContext<FoodAddsContextType>({
  addFoodItem: null,
  setAddFoodItem: () => {},
});

/** 설명 */
export const FoodDelsContext = createContext<FoodDelsContextType>({
  delFoodItem: null,
  setDelFoodItem: () => {},
});

/** 전역에 음식 정보 데이터를 context 사용 가능, 해당 기능은 App을 감싸 사용 전역으로 keyword, setKeyword 사용하는 값을 사용하거나 업데이트 */
function SearchContext({ children }: { children: React.ReactNode }) {
  const [addFoodItem, setAddFoodItem] = useState();
  const [delFoodItem, setDelFoodItem] = useState();
  const [keyword, setKeyword] = useState<string>("");

  return (
    <FoodAddsContext.Provider value={{ addFoodItem, setAddFoodItem }}>
      <FoodDelsContext.Provider value={{ delFoodItem, setDelFoodItem }}>
        <FoodKeywordContext.Provider value={{ keyword, setKeyword }}>
            {children}
        </FoodKeywordContext.Provider>
      </FoodDelsContext.Provider>
    </FoodAddsContext.Provider>
  );
}

export default SearchContext;
