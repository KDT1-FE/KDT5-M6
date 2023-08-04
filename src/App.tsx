import { Route, Routes } from 'react-router-dom';
import NotFound from '@/pages/NotFound';
import Home from '@/pages/Home';
import Statistics from '@/pages/Statistics';
import MyDrawer from '@/components/MyDrawer';
import About from '@/pages/About';
import { ConfigProvider } from 'antd';
import koKR from 'antd/locale/ko_KR';
import { useAccentColor } from '@/hooks/useAccentColor';

export default function App() {
  const { accentColor } = useAccentColor();
  const theme = {
    token: {
      colorPrimary: accentColor,
    },
  };

  return (
    <ConfigProvider theme={theme} locale={koKR}>
      <Routes>
        <Route element={<MyDrawer />}>
          <Route path="/" element={<Home />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ConfigProvider>
  );
}
