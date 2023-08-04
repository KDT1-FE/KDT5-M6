import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App.tsx';
import { BrowserRouter } from 'react-router-dom';
import '@/index.css';
import AccentColorProvider from '@/context/AccentColorContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AccentColorProvider>
        <App />
      </AccentColorProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
