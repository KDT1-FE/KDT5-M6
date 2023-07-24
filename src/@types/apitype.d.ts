
declare interface ExpendType {
  amount: number,
  userId: string,
  category: string,
  date: string,
  description: string,
  _id?: string
}

declare interface SearchParamsType {
  q: string,
  userId: string
}

declare interface SummaryType {
  period: string,
  userId: string,
  category?: string
}

declare interface CalendarDataType {
  year: string,
  month: string,
  userId: string
}

declare interface PretendBuyProps {
  getToday: (todayDate: string) => void;
}

declare interface searchParamsTypeOutput {
  _id: string,
  amount: number,
  userId: string,
  category: string,
  date: string,
  description: string,
}

declare interface CategoryProp {
  categoryName: string;
}

declare type State = {
    id: string | null;
    description: string;
    amount: number;
};

declare type Action =
  | { type: "select"; id: string; description: string; amount: number }
  | { type: "changeDescription"; description: string }
  | { type: "changeAmount"; amount: number }
  | { type: "reset" };

declare interface DescriptionProps {
  id:string;
  state: State;
  item: searchParamsTypeOutput;
  handleChange:(id:string, e: React.ChangeEvent<HTMLInputElement>) => void
  handleBlur: (id: string) => void;
  isDiv: boolean
}
declare interface ContentListItemProps {
  state: State;
  item: searchParamsTypeOutput;
  handleChange:(id:string, e: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (id: string) => void;
  isDiv: Record<string, boolean>
  handleDelete: (id: string) => void;
}