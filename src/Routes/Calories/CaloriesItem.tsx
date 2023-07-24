import "@/Routes/Calories/CaloriesItem.scss";
import { useEffect, useState } from "react";

export default function CaloriesItem({ v, i, setList }: any) {
  const [amount] = useState(v.amount);
  const [count] = useState(Number(v.description.split("-")[1]));

  useEffect(() => {
    setList((prev: CaloriesItem) => {
      return prev.filter((v) => {
        if (v._id !== i) {
          return v;
        } else {
          v.amount = amount;
          v.description = v.description.split("-")[0] + `-${count}`;
          return v;
        }
      });
    });
  }, [amount]);

  function short(text: string, i: number) {
    if (text.length > i) {
      return text.substring(0, i) + "...";
    } else {
      return text;
    }
  }

  return (
    <li className="CaloriesItem">
      <div className="ItemTitle">{short(v.description, 12)}</div>
      <div className="ItemAmount">{amount}Kcal</div>
    </li>
  );
}
