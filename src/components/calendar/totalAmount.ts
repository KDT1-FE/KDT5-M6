interface IExpense {
  _id: string;
  amount: number;
  userId: string;
  category: string;
  date: string;
}

export const totalAmount = (a:IExpense[]) => {
  if (a === undefined) {
    return [0,0];
  }
  let totalAmountPosi = 0;
  let totalAmountNeg = 0;
  for (let i = 0; i < a.length; i++) {
    a[i].amount > 0 ? totalAmountPosi += a[i].amount : totalAmountNeg += a[i].amount
  }
  return [totalAmountNeg, totalAmountPosi];
}