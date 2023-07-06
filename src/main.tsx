import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App.tsx';
import { ConfigProvider } from 'antd';
import koKR from 'antd/locale/ko_KR';
import '@/index.css';

const theme = {
  token: {
    colorPrimary: '#52aaab',
  },
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider theme={theme} locale={koKR}>
      <App />
    </ConfigProvider>
  </React.StrictMode>,
);
