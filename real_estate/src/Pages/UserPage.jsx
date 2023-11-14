import React from 'react'
import Home from './Home';
import DetailedView from './DetailedView';

import MyProperties from './MyProperties'
import TransactionPage from './TransactionPage';

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from './DashBoard';
const UserPage = () => {
  return (
    <div >
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<DetailedView />} path="/details/:propertyId" />
            <Route element={<MyProperties />} path="/myproperty" />
            <Route element={<TransactionPage />} path="/transaction" />
          
          </Routes>
      </div>
  )
}

export default UserPage