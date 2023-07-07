import { Route, Routes } from 'react-router-dom';
import NotFound from '@/pages/NotFound';
import Home from '@/pages/Home';
import Statistics from '@/pages/Statistics';
import MyDrawer from '@/components/MyDrawer';
import About from '@/pages/About';

export default function App() {
  return (
    <Routes>
      <Route element={<MyDrawer />}>
        <Route path="/" element={<Home />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
