/** 설명 */
declare interface FoodItem {
  id: number;
  DESC_KOR: string;
  NUTR_CONT1: number;
  NUTR_CONT2: number;
  NUTR_CONT3: number;
  NUTR_CONT4: number;
  NUTR_CONT5: number;
  NUTR_CONT6: number;
  SERVING_WT: number;
  image: "f8";
}

/** 설명 */
declare interface Item {
  id: number;
  title: string;
  calories: number | string;
  carbs: number | string;
  protein: number | string;
  fat: numbe | stringr;
  sugar: number | string;
  sodium: number | string;
  serving: number;
  image?: string;
}

  declare interface CaloriesItem {
    filter(arg0: (v: { _id: any; amount: any; description: string; }) => { _id: any; amount: any; description: string; }): unknown;
    amount: number;
    category: string;
    date: string;
    description: string;
    userId: string;
    __v: number;
    _id: string;
  }

declare interface ItemData {
  DESC_KOR: string;
  NUTR_CONT1: string;
  NUTR_CONT2: string;
  NUTR_CONT3: string;
  NUTR_CONT4: string;
  NUTR_CONT5: string;
  NUTR_CONT6: string;
  SERVING_WT: string;
  image: string;
}

/** 설명 */
declare interface Arr {
  _id: string;
  date: string;
  userId: string;
  amount: number;
  category: string;
  description: string;
}

/** 설명 */
declare interface SearchPagingProps {
  page: number;
  count: number;
  setPage: (page: number) => void;
}

declare interface GetData {
  amount: number;
  category: string;
  date: string;
  description: string;
  userId: string;
  __v: number;
  _id: string;
}

/** 설명 */
declare interface FoodContextType {
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
}

/** 설명 */
declare interface FoodAddContextType {
  addFoodItem: {
    id: number;
    title: string;
    calories: number;
    carbs: number;
    protein: number;
    fat: number;
    sugar: number;
    sodium: number;
    serving: number;
  };

  /** 설명 */
  setAddFoodItem: React.Dispatch<
    React.SetStateAction<{
      id: number;
      title: string;
      calories: number;
      carbs: number;
      protein: number;
      fat: number;
      sugar: number;
      sodium: number;
      serving: number;
    }>
  >;
}

/** 설명 */
declare interface FoodAddsContextType {
  addFoodItem: any;
  setAddFoodItem: Dispatch<SetStateAction<boolean>>;
}

/** 설명 */
declare interface FoodDelsContextType {
  delFoodItem: any;
  setDelFoodItem: Dispatch<SetStateAction<boolean>>;
}

/** 설명 */
declare interface FoodDelContextProps {
  delFoodItem: number;
  setDelFoodItem: Dispatch<SetStateAction<number>>;
}

/** 적절한 타입값 찾을때까지 any 타입 사용 */
declare type FoodAddsContext = any;

/** 적절한 타입값 찾을때까지 any 타입 사용 */
declare type FoodDelsContext = any;
