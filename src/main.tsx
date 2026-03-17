import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App.tsx';
import './styles/fonts.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App></App>
  </React.StrictMode>
);
