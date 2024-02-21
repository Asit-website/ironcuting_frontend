
import dashImg from "../image/dashboard.png"
import system from "../image/settings-sliders.png"
import "./sidebar.css"
import logout from "../image/logout.png"


function Sidebar(){
    return (
   <div className="sideWrap">

       {/* dashbaord  */}
        <div className="dashbord">
        <img src={dashImg} alt="" />
       <select name="" id="" >
        <option value="">
         <span>Dashboard</span>
        </option>
       </select>
        </div>

       {/* navItems  */}
       <div className="nanItem">
        <img src={system} alt="" />
        <span>System Setting</span>
       </div>
       {/* navItems  */}
       <div className="nanItem">
        <img src={logout} alt="" />
        <span>Logout</span>
       </div>

   </div>
    )
}

export default Sidebar;