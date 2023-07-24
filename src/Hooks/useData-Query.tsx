import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteExpense, getSearchExpense, postExpense, putChange } from "@/Api/api.ts";
import dayjs from "dayjs";

export default function useDataQuery(params?: SearchParamsType) {
  const queryClient = useQueryClient();

  const getSearchData =
    useQuery(["searchData", params], () => {
      if (params) {
        return getSearchExpense(params).then((res) => {
          return res.map((item: searchParamsTypeOutput) => ({
            ...item,
            date: dayjs(item.date).format("YYYY-MM-DD")
          }));
        });
      } else {
        return [];
      }
    }, { staleTime: 1000 * 60 });

  const addExpend =
    useMutation((postData: ExpendType) => postExpense(postData), {
      onSuccess: () => {
        queryClient.invalidateQueries(["searchData"]);
        queryClient.invalidateQueries(["summaryData"]);
      }
    });
  const deleteExpend =
    useMutation((id: string) => deleteExpense(id), {
      onSuccess: () => {
        queryClient.invalidateQueries(["searchData"]);
        queryClient.invalidateQueries(["summaryData"]);
      }
    });
  const changeExpend =
    useMutation(({ id, data }: { id: string, data: ExpendType }) =>
      putChange(id, data), {
      onSuccess: () => {
        queryClient.invalidateQueries(["searchData"]);
        queryClient.invalidateQueries(["summaryData"]);
      }
    });
  return { addExpend, getSearchData, changeExpend, deleteExpend };
}
