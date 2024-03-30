import dashImg from "../image/dashboard.png";
import system from "../image/settings-sliders.png";
import "./sidebar.css";
import logout from "../image/logout.png";
import { NavLink, useNavigate } from "react-router-dom";
import downkey from "../image/downKey.png";
import { useState } from "react";
import alas from '../image/alas.png';

function Sidebar({notify}) {
  const navigate = useNavigate();
  const [openDashboard, setOpenDashboard] = useState(false);


  return (

<>
   
    <div className="sideWrap">
       {/* <div className="flex items-center lo">
          <h2>Hi, Admin</h2>
          <img className="ml-2" src={alas} alt="" />
       </div> */}
      <div>
        {/* dashbaord  */}
      <NavLink to="/dashboard"><div
          // onClick={() => setOpenDashboard((prev) => !prev)}
          className={`${window.location.pathname==='/dashboard' ? "act" : ""} dashbord`}
        >
          <img src={dashImg} alt="" />
          <div className="dsad">
            <p>Dashboard</p>
            {/* <img src={downkey} alt="" /> */}
          </div>
        </div></NavLink>

        <NavLink to="/createAnother"><div
          // onClick={() => setOpenDashboard((prev) => !prev)}
          className={`${window.location.pathname==='/createAnother' ? "act" : ""} dashbord`}
        >
          <img src={dashImg} alt="" />
          <div className="dsad">
            <p>Create Another Id</p>
            {/* <img src={downkey} alt="" /> */}
          </div>
        </div></NavLink>

        {/* {openDashboard && (
          <div className="opeDashWrap">
            <div onClick={() => navigate("/dashboard")} className="SOpeDsh">
              <p className="radio"></p>
              <span>Order</span>
            </div>
            <div className="SOpeDsh">
              <p className="radio"></p>
              <span>Billing</span>
            </div>
          </div>
        )} */}
      </div>

      {/* navItems  */}
      <NavLink to="/systemSetting">
        <div className={`${window.location.pathname==='/systemSetting' ? "act" : ""} nanItem`}>
          <img src={system} alt="" />
          <span>System Setting</span>
        </div>
      </NavLink>

      {/* navItems  */}
      <div
        onClick={() => {
          localStorage.removeItem("b2b_user");
          localStorage.removeItem("b2b_token");
          navigate("/");
          notify("success","logout successfully")
          // alert("logout successfully");

        }}
        className="nanItem ssItem cursor-pointer"
      >
        <img src={logout} alt="" />
        <span>Logout</span>
      </div>

    </div>

         </>
  );
}

export default Sidebar;
