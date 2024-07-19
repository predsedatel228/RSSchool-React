import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import NotFound from './routes/NotFound';
import ItemDetails from './components/itemDetails/ItemDetails';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';
import { Provider } from 'react-redux';
import store from './store/store';
import React, { useState } from 'react';

export interface SearchresultI {
  name: string;
  url: string;
}
const ThemeContext = React.createContext(false);

const App = () => {
  const [lightTheme, setLightTheme] = useState(false);

  const toggleTheme = () => {
    setLightTheme(!lightTheme);
  }
  return (
    <ThemeContext.Provider value={lightTheme}>
      <main className={lightTheme? 'light' : 'dark'}>
        <button onClick={toggleTheme} className='toggle-theme'>ChangeTheme</button>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/elem" element={<ItemDetails />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </ThemeContext.Provider>
  );
};

// export default App;

const WrappedApp = () => {
  // const [darkTheme, setDarkTheme] = useState(true);
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Provider store={store}>
          <App />
        </Provider>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default WrappedApp;
