import './App.css';
import Home from './Pages/Home';
import DetailedView from './Pages/DetailedView';
import Login from './Pages/Login';
import MyProperties from './Pages/MyProperties'
import TransactionPage from './Pages/TransactionPage';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import DashBoard from './Pages/DashBoard';
import AuthState from './context/authstate';
import AdminPage from './Pages/AdminPage';
import UserPage from './Pages/UserPage';
function App() {
  return (
    <div className='mx-2'>
      <AuthState>
        <Routes>
        <Route element={<Login/>} path='/'></Route>
        <Route element={<AdminPage /> }path='/admin/*'></Route>
          <Route element={<UserPage /> }path='/user/*'></Route>
        </Routes>
        </AuthState>
    </div>
  );
}

export default App;
