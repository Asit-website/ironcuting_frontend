import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from './component/Auth/Auth';
import Dashboard from './component/Auth/Dashboard';
import MainState from './context/MainState';
import Navbar from './Common/Navbar';
import CreateOrder from './Pages/CreateOrder';
import Selectround from './component/Selectround';

function App() {
  return (
    <>

      <MainState>
        <Router>
       
          <Routes>
            <Route path='/' element={<Auth />} />
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path="/createOrder" element={<CreateOrder/>}/>
            <Route path="/selectround" element={<Selectround/>}/>
          </Routes>
        </Router>
      </MainState>
    </>
  );
}

export default App;
