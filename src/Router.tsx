import { Dispatch, SetStateAction, useCallback } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import MainPage from "./pages/MainPage";

interface IRouterProps {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
}

function Router({ theme, setTheme }: IRouterProps) {
  const isLight = theme === "light";

  const onToggleDark = useCallback(() => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, [theme, setTheme]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<MainPage isLight={isLight} onToggleDark={onToggleDark} />}
        />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
