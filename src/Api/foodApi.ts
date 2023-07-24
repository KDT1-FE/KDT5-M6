import axios from "axios";

/** 공공데이터 URL */
const api = "https://apis.data.go.kr/1471000/FoodNtrIrdntInfoService1/getFoodNtrItdntList1?";

/** 공공데이터 인증키, 개발 배포전에 .env로 인증키 관리 예정 */
const key = "WlE%2FDkF0kK0xfOxDxW0wQwO77QRVW7dSqxlHG3v6lWJUsQNJ48Yq%2BOshP7IBoVy%2B30I%2FKzsmBA5P40n6y%2Ba%2BkQ%3D%3D";

/** 공공데이터 API 기능 Axios사용 검색어를 매개변수로 받아 url의 desc_kor에 전달 */
const dataApi = async (search: string) => {
  try {
    const url = `${api}serviceKey=${key}&type=json&desc_kor=${search}&numOfRows=50`;
    const res = await axios.get(url);
    const result = res.data;
    result.body.items.map((value: string, index: number)=>Object.assign(value, {id:index + 1}))
    return result;
  } catch (error) {
    console.error(error);
  }
};

export { dataApi };
