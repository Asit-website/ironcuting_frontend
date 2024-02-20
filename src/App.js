import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from './component/Auth/Auth';
function App() {
  return (
    <>
     <Router>
       <Routes>
          <Route path='/' element={<Auth/>}/>
       </Routes>
     </Router>
    </>
  );
}

export default App;
