import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './routes/Main';
import ReactHookForm from './routes/ReactHookForm';
import UncontrolledForm from './routes/UncontrolledForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/form" element={<UncontrolledForm/>} />
          <Route path="/react-hook-form" element={<ReactHookForm/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
