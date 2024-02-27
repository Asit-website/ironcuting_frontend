
import dashImg from "../image/dashboard.png"
import system from "../image/settings-sliders.png"
import "./sidebar.css"
import logout from "../image/logout.png"
import { NavLink, useNavigate } from "react-router-dom"
import downkey from "../image/downKey.png"
import { useState } from "react"

function Sidebar() {
    const navigate = useNavigate();
    const [openDashboard , setOpenDashboard] = useState(false);
    return (
        <div className="sideWrap">

          <div>

         
            {/* dashbaord  */}
            <div onClick={()=>setOpenDashboard((prev)=>!prev)} className="dashbord">
                <img src={dashImg} alt="" />
                    <div className="dsad">
                        <p>Dashboard</p>
                        <img src={downkey} alt="" />
                    </div>
            </div>
            
            {
           openDashboard && 
           <div className="opeDashWrap">

            {/* single */}
            <div onClick={()=>navigate("/dashboard")} className="SOpeDsh">
                 
                 {/* radio */}
                 <p className="radio">

                 </p>

                 <span>Order</span>

            </div>

            {/* single */}
            <div className="SOpeDsh">
                 
                 {/* radio */}
                 <p className="radio">

                 </p>

                 <span>Billing</span>

            </div>

           </div>
            }

            </div>

            {/* navItems  */}
           <NavLink to="/systemSetting"><div className="nanItem">
                <img src={system} alt="" />
                <span>System Setting</span>
            </div></NavLink>
            {/* navItems  */}
            <div onClick={() => {
                localStorage.removeItem('b2b_user');
                localStorage.removeItem('b2b_token');
                navigate('/');
                alert("logout successfully")
            }} className="nanItem">
                <img src={logout} alt="" />
                <span>Logout</span>
            </div>

        </div>
    )
}

export default Sidebar;