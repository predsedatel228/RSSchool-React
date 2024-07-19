import React from 'react';
import ReactDOM from 'react-dom/client';
// import App, { ThemeContext } from './App.tsx';
import './index.css';
// import './components/themeProvider/themes.css'
// import ErrorBoundary from './components/errorBoundary/ErrorBoundary.tsx';
// import { BrowserRouter } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import store from './store/store.ts';
import WrappedApp from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WrappedApp />
  </React.StrictMode>,
);
