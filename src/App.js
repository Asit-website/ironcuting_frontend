import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from './component/Auth/Auth';
import Dashboard from './component/Auth/Dashboard';
import MainState from './context/MainState';
import CreateOrder from './Pages/CreateOrder';
import Selectround from './component/Selectround';
import SystemSetting from './Pages/SystemSetting';
import ForgotPass from './component/Auth/ForgotPass';
import ResetPassword from './component/Auth/ResetPassword';
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import Table from './component/Table';
import GetOtp from './component/Auth/GetOtp';
import OrderHistory from './component/OrderHistory';
function App() {
  const notify = (status, message) => {
    if (status) {
      NotificationManager.success(message, "Success! ");
    } else {
      NotificationManager.error(message, "Failed! ");
    }
  };
  return (
    <>

      <MainState>
        <Router>
        <NotificationContainer />
          <Routes>
            <Route path='/' element={<Auth notify={notify} />} />
            <Route path='/dashboard' element={<Dashboard notify={notify} />} />
            <Route path="/createOrder" element={<CreateOrder notify={notify} /> } />
            <Route path='/systemSetting' element={<SystemSetting notify={notify} />}  />
            <Route path='/selectRound/:id' element={<Selectround notify={notify} />} />
            <Route path='/orderHistory/:id' element={<OrderHistory notify={notify}/>}/>
            <Route path='/table' element={<Table/>}/>
            <Route path="forgotPassword" element={<ForgotPass notify={notify} />} />
            <Route path="/getOtp" element={<GetOtp notify={notify} />} />
            <Route path="reset-password" element={<ResetPassword notify={notify} />} />
          </Routes>
        </Router>
      </MainState>
    </>
  );
}

export default App;
