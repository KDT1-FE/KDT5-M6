import { Route, Routes } from 'react-router-dom';
import NotFound from '@/pages/NotFound';
import Home from './pages/Home';
import Statistics from './pages/Statistics';

export default function App() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
