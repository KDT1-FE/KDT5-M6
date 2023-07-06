import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App.tsx';
import { ConfigProvider } from 'antd';
import koKR from 'antd/locale/ko_KR';
import { BrowserRouter } from 'react-router-dom';
import '@/index.css';

const theme = {
  token: {
    colorPrimary: '#87E4AC',
  },
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider theme={theme} locale={koKR}>
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
