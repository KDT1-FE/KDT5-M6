import { useReducer, useState } from "react";
import { ContentListItem } from "@/Components/Common/Content-list-item.tsx";
import useDataQuery from "@/Hooks/useData-Query.tsx";

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "select":
      return { id: action.id, description: action.description, amount: action.amount };
    case "changeDescription":
      return { ...state, description: action.description };
    case "changeAmount":
      return { ...state, amount: action.amount };
    case "reset":
      return { id: null, description: "", amount: 0 };
    default:
      return state;
  }
};

export default function ContentList(props: { date: string, category: string }) {
  const [state, dispatch] = useReducer(reducer, { id: null, description: "", amount: 0 });
  const [isDiv, setIsDiv] = useState<Record<string, boolean>>({});
  const {changeExpend, deleteExpend} = useDataQuery()

  const params: SearchParamsType = {
    q: props.category,
    userId: "team6"
  };
  const { getSearchData : {isLoading, error, data: searchData} } = useDataQuery(params)
  const handleChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (state.id !== id) {
      const index = searchData.findIndex((item: ExpendType) => item._id === id);
      const item = searchData[index];
      dispatch({ type: "select", id, description: item.description, amount: item.amount });
      setIsDiv({ ...isDiv, [id]: true });
    } else {
      if (target.id === "description") {
        dispatch({ type: "changeDescription", description: target.value });
      } else if (target.id === "amount") {
        dispatch({ type: "changeAmount", amount: Number(target.value) });
      }
    }
  };

  const handleSubmit = (id: string) => {
    if (state.id === id) {
      changeExpend.mutate({
        id, data: {
          userId: "team6",
          category: props.category,
          date: props.date,
          description: state.description,
          amount: state.amount
        }
      });
      dispatch({ type: "reset" });
      setIsDiv({ ...isDiv, [id]: false });
    }
  };

  const handleDelete = (id: string) => {
    deleteExpend.mutate(id);
  };

  if (isLoading) {
    return "Loading...";
  } else if (error instanceof Error) {
    return `An error has occurred: ${error.message}`;
  }

  return (
    <div>
      <ul className={"pretend-list"}>
        {searchData.map((item: searchParamsTypeOutput, i: number) => {
          if (item.date === props.date) {
            return (
              <ContentListItem
                key={i}
                isDiv={isDiv} state={state} item={item}
                handleChange={handleChange} handleSubmit={handleSubmit} handleDelete={handleDelete} />
            );
          }
          return null;
        })}
      </ul>
    </div>
  );
}

