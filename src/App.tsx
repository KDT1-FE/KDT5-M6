import Graph from '@/components/graph/Graph';
import Layout from '@/components/common/Layout';
import NotFound from '@/components/common/NotFound';
import Detail from '@/components/detail/Detail';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@/components/Home/Home';
import '@/App.css'

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Main />}></Route> */}
          <Route path="/" element={<Layout />}>
            <Route path="/detail" element={<Detail />}></Route>
            <Route path="/" element={<Home />}></Route>
            {/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
            <Route path="*" element={<NotFound />} />
            <Route path="/graph" element={<Graph />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
