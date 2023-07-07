import { Route, Routes } from 'react-router-dom';
import NotFound from '@/pages/NotFound';
import MyLayout from '@/components/MyLayout';
import Home from './pages/Home';
import Statistics from './pages/Statistics';

export default function App() {
  return (
    <Routes>
      <Route element={<MyLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
