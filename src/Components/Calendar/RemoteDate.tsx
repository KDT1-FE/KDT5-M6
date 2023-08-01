import "./RemoteDate.scss";

type Props = CalendarProps & {
  backgroundColor?: string;
};

export default function RemoteDate(props: Props) {
  const { month, year, setMonth, setYear } = props;

  return (
    <div
      className="controll-wrap"
      style={{ backgroundColor: props.backgroundColor }}
    >
      <div className="controll">
        <div
          className="month"
          onClick={(e) => {
            if (e.target instanceof HTMLButtonElement) {
              e.target.className.includes("down") && setMonth(month - 1);
              e.target.className.includes("up") && setMonth(month + 1);
            }
          }}
        >
          <button className="down img" id="prev"></button>
          <div>{month}</div>
          <button className="up img" id="next"></button>
        </div>
        <div
          className="year"
          onClick={(e) => {
            if (e.target instanceof HTMLButtonElement) {
              e.target.className.includes("down") && setYear(year - 1);
              e.target.className.includes("up") && setYear(year + 1);
            }
          }}
        >
          <button className="down img" id="down"></button>
          <div>{year}</div>
          <button className="up img" id="up"></button>
        </div>
      </div>
    </div>
  );
}
