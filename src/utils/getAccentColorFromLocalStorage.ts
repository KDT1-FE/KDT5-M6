export default function getAccentColorFromLocalStorage() {
  // local 저장소에서 key값이 accentColor를 가져옴
  const accentColor = localStorage.getItem('accentColor');
  // accentColor라는 값이 있다면 해당 값을 json parsing해서 변수에 저장하여 return 없으면 #87e4ac색 return
  return accentColor ? JSON.parse(accentColor) : '#87e4ac';
}
