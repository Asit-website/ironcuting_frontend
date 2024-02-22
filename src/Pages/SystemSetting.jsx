import Navbar from "../Common/Navbar";
import Sidebar from "../Common/Sidebar";
import "./systemSetting.css"
import plusSet from "../image/plusSet.png"
import rightSign from "../image/RightSign.png"
import { useState } from "react";
import rightBlack from "../image/blackRight.png"
import sR1 from "../image/searchRi.png"
import deleteS from "../image/deleteS.png"
import editS from "../image/editS.png"

const leftData = [
   {
    title:"Type"
   } , 
   {
    title:"Iron Quality"
   } , 
   {
    title:"Cutting Price"
   }
]

 const allType = [
  "Round" , "Flat"
 ]

function SystemSetting(){

     const [currentSystem , setCurrentSystem] = useState(0);

      const [openPopup , setOpenPopup] = useState(false);

    return (
        <div className={`sysSetWrap  ${openPopup && "openPopup"}`}>

            <Navbar />


             <div className="sySeCont">

          <Sidebar />

           <div className="sySrIGHT">

                    <div className="sSetRCon">

                   
                   <nav>
                     <img onClick={()=>setOpenPopup(true)} src={plusSet} alt="" />
                   </nav>

                   <main className="syMain">

                    {/* left side */}
                    <div className="stMaLe">

                         {
                            leftData.map((item ,index)=>(
                                <div key={index} onClick={()=>setCurrentSystem(index)} className={`siStMale ${currentSystem === index ?  "currentSym" : "otherStm"}`}>
                                    <p>{item.title}</p>
                                    {
                                        currentSystem === index ?
                                        <img src={rightSign} alt=""  />
                                            :
                                            <img src={rightBlack} alt="" />
                                    }

                                </div>
                            ))
                         } 

                    </div>

                    {/* right side  */}
                    <div className="stMaRig">

                     {/* first  */}
                     <div className="stMRiFir">

                        {/*left   */}
                        <div className="stmRFLef">

                            <select name="" id="" className="enPage">
                                <option value="10"> 10 </option>
                            </select>

                            <span>Entries per page</span>

                        </div>

                        {/* right  */}
                        <div className="stmRFRig">
                            <img src={sR1} alt="" />

                            <input type="text" placeholder="Search" />

                        </div>

                     </div>


                     {/* second  */}
                     <div className="stMrSec">

                            <p>TYPE</p>
                            <p>ACTION</p>

                     </div>


                     {/* third  */}
                     <div className="stmRtHIR">

{
    allType.map((item , index)=>(
        <div key={index} className="singTtpe">
                    {/* left */}
                    <h2  className="STpeLi">{item}</h2>

                    {/* right */}
                    <div className="STpeRi">

                        <img src={editS} alt="" />
                        <img src={deleteS} alt="" />

                    </div>
        </div>
    ))
}

                     </div>

                    </div>

                   </main>

                    </div>

             <div>

               

             </div>

           </div>
             </div>



{
    openPopup && 
     <div className="creNoWrap">

             <div className="cretNPoup">

                    <h2>Create New</h2>

                    <hr />

                    <label className="enteNa" >
                        <p>Name</p>
                        <input type="text" placeholder="Enter Name"  />
                    </label>

                    <hr />

                    <div className="crCBtn">
                        <button onClick={()=>setOpenPopup(false)} className="canceBtn">
                        Cancel
                        </button>
                        <button className="createBtn">
                        Create
                        </button>
                    </div>

             </div>
     </div>
}

        </div>
    )
}

export default SystemSetting;