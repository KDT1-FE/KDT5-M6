import GlobalStyles from "@/styles/GlobalStyles.styles";
import { Route, Routes, Navigate } from "react-router-dom";
import styled from "styled-components";
import loadable from "@loadable/component";
import Loading from "@/components/common/Loading";

const MainLayout = loadable(() => import("@/layout/MainLayout"), {
  fallback: <Loading />
});
const SubLayout = loadable(() => import("@/layout/SubLayout"), {
  fallback: <Loading />
});

const Add = loadable(() => import("@/routes/Add/Add"), {
  fallback: <Loading />
});

const Edit = loadable(() => import("@/routes/Edit/Edit"), {
  fallback: <Loading />
});

const Search = loadable(() => import("@/routes/Search/Search"), {
  fallback: <Loading />
});

//Main Route
const Daily = loadable(() => import("@/routes/Main/Daily"), {
  fallback: <Loading />
});
const Weekly = loadable(() => import("@/routes/Main/Weekly"), {
  fallback: <Loading />
});
const Monthly = loadable(() => import("@/routes/Main/Monthly"), {
  fallback: <Loading />
});
const All = loadable(() => import("@/routes/Main/All"), {
  fallback: <Loading />
});

// Sub Layout
const Calendar = loadable(() => import("@/routes/Calendar/Calendar"), {
  fallback: <Loading />
});
const Chart = loadable(() => import("@/routes/Chart/Chart"), {
  fallback: <Loading />
});
const Account = loadable(() => import("@/routes/Account/Account"), {
  fallback: <Loading />
});

const App = () => {
  return (
    <Section>
      <GlobalStyles />
      <Routes>
        <Route path="/main/" element={<MainLayout />}>
          <Route path="/main/daily" element={<Daily />} />
          <Route path="/main/weekly" element={<Weekly />} />
          <Route path="/main/monthly" element={<Monthly />} />
          <Route path="/main/all" element={<All />} />
        </Route>
        <Route path="/sub" element={<SubLayout />}>
          <Route path="/sub/calendar" element={<Calendar />} />
          <Route path="/sub/chart" element={<Chart />} />
          <Route path="/sub/account" element={<Account />} />
        </Route>
        <Route path="/add" element={<Add />} />
        <Route path="/edit/:_id" element={<Edit />} />
        <Route path="/search" element={<Search />} />

        <Route path="/" element={<Navigate to="/main/daily" replace />} />
        <Route path="*" element={<Navigate to="/main/daily" replace />} />
      </Routes>
    </Section>
  );
};
export default App;

const Section = styled.section`
  position: relative;
  width: 390px;
  height: 844px;
  background-color: var(--base-color-lightgrey);
  border: 1.5px solid var(--base-color-grey);
  z-index: 1;
`;
