import './App.css';
import NavBar from './Pages/NavBar';
import Home from './Pages/Home';

function App() {
  return (
    <div className='mx-2'>
      <div className=''>
        <NavBar />
      </div>
      <div>
        <Home />
      </div>
    </div>
  
  );
}

export default App;
