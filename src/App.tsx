import { useState } from "react";

import { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/GlobalStyle";
import { darkTheme, lightTheme } from "./styles/theme";

import { HelmetProvider } from "react-helmet-async";
import Router from "./Router";

function App() {
  const [theme, setTheme] = useState("light");
  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyle />
      <HelmetProvider>
        <Router theme={theme} setTheme={setTheme} />
      </HelmetProvider>
    </ThemeProvider>
  );
}

export default App;
