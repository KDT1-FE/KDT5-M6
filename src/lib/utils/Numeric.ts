// input에 숫자가 아닌 부분을 찾아서 제거 
// 숫자 단위에 , 가 필요하면 input value값에 .toLocaleString()
export const numeric = (input: string) => {
    return Number(input.replace(/[^0-9]/g, ''));
}