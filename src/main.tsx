import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Search } from './assets/components/search-top/search.tsx';
import { Result } from './assets/components/result-bottom/results.tsx';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App>
      <header></header>
      <Search />
      <Result></Result>
      <footer></footer>
    </App>
  </React.StrictMode>
);
