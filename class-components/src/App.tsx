import './App.css'; 
import { Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import NotFound from './routes/NotFound';
import ItemDetails from './components/itemDetails/ItemDetails';
export interface SearchresultI {
  name: string;
  url: string;
}

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="/elem" element={<ItemDetails />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
