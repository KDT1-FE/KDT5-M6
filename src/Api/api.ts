import axios from "axios";

export const ApiHttp = axios.create({
  baseURL: "/kdt5"
});

export async function postExpense(data:ExpendType) {
  try {
    const res = await ApiHttp.post('/expenses', data)
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export async function getExpense(userId: string) {
  try {
    const res =
      await ApiHttp.get(`http://52.78.195.183:3003/api/categories?userId=${userId}`);
    return res.data;
  } catch (error) {
    console.log(error)
  }
}

export async function getSearchExpense(params: SearchParamsType) {
  try {
    const res = await ApiHttp.get("/expenses/search", { params });
    return res.data;
  } catch (error) {
    console.log(error)
  }
}

export async function getSummary(params: SummaryType) {
  try {
    const res = await ApiHttp.get("/expenses/summary", { params });
    return res.data;
  } catch (error) {
    console.log(error)
  }
}

export async function putChange(userId: string, data: ExpendType) {
  try {
    const res = await ApiHttp.put(`/expenses/${userId}`, data);
    return res.data;
  } catch (error) {
    console.log(error)
  }
}

export async function deleteExpense(userId: string) {
  try {
    const res = await ApiHttp.delete(`/expenses/${userId}`);
    return res.data;
  } catch (error) {
    console.log(error)
  }
}

export async function getCalendar(params: CalendarDataType) {
  try {
    const res = await ApiHttp.get("/expenses/calendar", { params });
    return res.data;
  } catch (error) {
    console.log(error)
  }
}
