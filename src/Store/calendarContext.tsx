import { PropsWithChildren, createContext } from "react";

const CalendarContext = createContext("");

export function CalendarContextProdiver(props: PropsWithChildren) {
  return (
    <CalendarContext.Provider value="">
      {props.children}
    </CalendarContext.Provider>
  );
}
