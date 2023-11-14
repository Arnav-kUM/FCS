import './App.css';
import Home from './Pages/Home';
import DetailedView from './Pages/DetailedView';
import Login from './Pages/Login';
import MyProperties from './Pages/MyProperties'
import TransactionPage from './Pages/TransactionPage';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Auth from './ProtectedRoutes';
import DashBoard from './Pages/DashBoard';
import AdminDashboard from './Pages/AdminPage';
import AuthState from './context/authstate';
import ReportPage from './Pages/ReportPage';
function App() {
  return (
    <div className='mx-2'>
      <AuthState>
        <Routes>
        <Route element={<Login />} path='/'></Route>
          <Route element={<Home /> }path='/home'></Route>
          <Route element={ <DetailedView /> } path='/details/:propertyId'></Route>
          <Route element={ <MyProperties/> } path='/myproperty'></Route>
          <Route element={ <TransactionPage/> } path='/transaction'></Route>
          <Route element={ <DashBoard/> } path='/dashboard'></Route>
          <Route element={ <AdminDashboard/> } path='/admin'></Route>
          <Route element={ <ReportPage/> } path='/admin/report'></Route>
        </Routes>
        </AuthState>
    </div>
  );
}

export default App;
