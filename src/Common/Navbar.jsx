import { NavLink, useNavigate } from "react-router-dom";
import "./navbar.css";
import sideIcon from "../image/sideiCONS.png";
import { useState } from "react";
import dashImg from "../image/dashboard.png";
import downkey from "../image/downKey.png";
import logout from "../image/logout.png";
import system from "../image/settings-sliders.png";
import alas from '../image/alas.png'


function Navbar({ hideCreateOrder = false }) {
  const user = JSON.parse(localStorage.getItem("iron_user"));

  const [openSidebar , setOpenSidebar] = useState(false);
  const [openDashboard, setOpenDashboard] = useState(false);


  const navigate = useNavigate();

  return (
    <div className="navBr_wrap">

      <div className="navBr_Cont">


  {/* sidebar for small screen  */}
  <div className="smallScreenSide">

         
          <img src={sideIcon} alt="" onClick={() => setOpenSidebar((prev) => !prev)}
            className="threeLine" />

        {openSidebar && (
          
          <div className="allSidebar">
            <div>
              {/* dashbaord  */}
              <div
                onClick={() => setOpenDashboard((prev) => !prev)}
                className="dashbord"
              >
                <img src={dashImg} alt="" />
                <div className="dsad">
                  <p>Dashboard</p>
                  <img src={downkey} alt="" />
                </div>
              </div>

              {openDashboard && (
                <div className="opeDashWrap">
                  {/* single */}
                  <div
                    onClick={() => navigate("/dashboard")}
                    className="SOpeDsh"
                  >
                    {/* radio */}
                    <p className="radio"></p>

                    <span>Order</span>
                  </div>

                  {/* single */}
                  <div className="SOpeDsh">
                    {/* radio */}
                    <p className="radio"></p>

                    <span>Billing</span>
                  </div>
                </div>
              )}
            </div>

            {/* navItems  */}
            <NavLink to="/systemSetting">
              <div className="nanItem">
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
                alert("logout successfully");
              }}
              className="nanItem"
            >
              <img src={logout} alt="" />
              <span>Logout</span>
            </div>
          </div>
        )}
      </div>

        <h2 className="flex items-center">Hi,{user?.name} <img className="ml-2" src={alas} alt="alas" /></h2>

        {!hideCreateOrder && (
          <button
            onClick={() => navigate("/createOrder")}
            className="createOBtn"
          >
            <span>Create Order</span>
          </button>
        )}
      </div>

    
    </div>
  );
}

export default Navbar;
