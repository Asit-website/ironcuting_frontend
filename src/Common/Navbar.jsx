import { useNavigate } from "react-router-dom";
import "./navbar.css"

function Navbar({hideCreateOrder=false}){

     const navigate = useNavigate();

    return (

         <div className="navBr_wrap">

        <div className="navBr_Cont">

          <h2>Hi, Akash Negi</h2>

          {
               !hideCreateOrder && 

          <button onClick={()=>navigate("/createOrder")} className="createOBtn"><span>Create Order</span></button>
          }

        </div>
        
         </div>
    )
}

export default Navbar;