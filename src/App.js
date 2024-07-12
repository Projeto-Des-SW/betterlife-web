import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
//Pages
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';

function App() {
  return (
    <BrowserRouter>
    <div>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
