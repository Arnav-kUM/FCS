import './App.css';
import Home from './Pages/Home';
import DetailedView from './Pages/DetailedView';
import Login from './Pages/Login';
import SellPage from './Pages/SellPage'
import BuyPage from './Pages/BuyPage';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Auth from './ProtectedRoutes';
import DashBoard from './Pages/DashBoard';

function App() {
  return (
    <div className='mx-2'>
        <Routes>
        <Route element={<Login />} path='/'></Route>
          <Route element={<Home /> }path='/home'></Route>
          <Route element={ <DetailedView /> } path='/details/:propertyId'></Route>
          <Route element={ <SellPage/> } path='/sell'></Route>
          <Route element={ <BuyPage/> } path='/buy'></Route>
          <Route element={ <DashBoard/> } path='/dashboard'></Route>

        </Routes>
    </div>
  );
}

export default App;
