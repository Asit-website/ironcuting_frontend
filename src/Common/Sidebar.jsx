
import dashImg from "../image/dashboard.png"
import system from "../image/settings-sliders.png"
import "./sidebar.css"
import logout from "../image/logout.png"
import { useNavigate } from "react-router-dom"
function Sidebar() {
    const navigate = useNavigate();
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