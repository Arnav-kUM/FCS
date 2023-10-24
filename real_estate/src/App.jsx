import './App.css';
import Home from './Pages/Home';
import DetailedView from './Pages/DetailedView';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div className='mx-2'>
      <Router>
        <Routes>
          <Route element={<Home />} path='/'></Route>
          <Route element={<DetailedView />} path='/details'></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
