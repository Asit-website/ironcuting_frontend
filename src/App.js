import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from './component/Auth/Auth';
import Dashboard from './component/Auth/Dashboard';
function App() {
  return (
    <>
     <Router>
       <Routes>
          <Route path='/' element={<Auth/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
       </Routes>
     </Router>
    </>
  );
}

export default App;
