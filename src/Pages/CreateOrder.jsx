import Navbar from "../Common/Navbar";
import Sidebar from "../Common/Sidebar";
import "./createOrder.css"
import cross from "../image/cross.png"
import plus from "../image/plus 2.png"
import { useState } from "react";

function CreateOrder(){


   const [formData , setFormData] = useState({
    clientName:"",
    type:"",
    ironQuality:"",
    diameter:"",
    quantity:"",
    length:"",
    height:"",
    width:"",
  weight:"",
  cuttingPrice:""
   })

   const [formId , setFormId] = useState([0]);

   const changeHandler = (e)=>{
    e.preventDefault();
         const {name , value} = e.target;
         setFormData((prev)=>({
          ...prev ,
          [name]:value
         }))
   }


   const addForm = (e) => {
    e.preventDefault();
    setFormId((prev) => [...prev, prev.length]);
};

const removeForm = (index) => {
   if(formId.length === 1 && index === 0){
    return ;
   }
  setFormId((prev) => prev.filter((_, i) => i !== index));
};

console.log("form" ,formId);
    return (
        <div className="cretOrdrWrap">

            <Navbar />

            <div className="CrtOrCont">

                <Sidebar />

          <main className="mainOrdCon">


           {
            formId.map((id , index)=>(
              <form key={index} className="ordForm" >

              <nav className="orFiNa">
                <p>Create Order</p>
                <img onClick={()=>removeForm(index)} src={cross} alt="" />
              </nav>

              <hr />

               <div className="allFields">
                  
                   {/* single  */}
                <label htmlFor="">
                    <p>CLIENT NAME</p>
                    <input  onChange={changeHandler} name="clientName" value={formData.clientName} type="text" />
                </label>

                   {/* single  */}
                <label htmlFor="">
                    <p>TYPE</p>
                  <select onChange={changeHandler}  name="type"  id="">

                    <option value="Select" selected disabled>Select</option>
                    <option value="FLAT">FLAT</option>
                    <option value="ROUND">ROUND</option>

                  </select>
                </label>

                   {/* single  */}
                <label htmlFor="">
                    <p>IRON QUALITY</p>
                  <input onChange={changeHandler} value={formData.ironQuality} name="ironQuality" type="text" />
                </label>

       {
        formData.type !== "FLAT" && 
                <label htmlFor="">
                    <p>DIAMETER</p>
                  <input onChange={changeHandler} value={formData.diameter} name="diameter" type="text" />
                </label>
                }


                   {/* single  */}
                <label htmlFor="">
                    <p>QUANTITY</p>
                  <input onChange={changeHandler} value={formData.quantity} name="quantity" type="text" />
                </label>
                   {/* single  */}
                <label htmlFor="">
                    <p>LENGTH</p>
                  <input onChange={changeHandler} value={formData.length} name="length" type="text" />
                </label>

{
  formData.type !== "ROUND" && 
                <label htmlFor="">
                    <p>HEIGHT</p>
                  <input onChange={changeHandler} value={formData.height} name="height" type="text" />
                </label>
}

               {
                formData.type !== "ROUND" && 
                <label htmlFor="">
                    <p>WIDTH</p>
                  <input onChange={changeHandler} value={formData.width} name="width" type="text" />
                </label>
                }


                   {/* single  */}
                <label htmlFor="">
                    <p>WEIGHT</p>
                  <input onChange={changeHandler} value={formData.weight} name="weight" type="text" />
                </label>

                   {/* single  */}
                <label htmlFor="">
                    <p>CUTTING PRICE</p>
                  <input onChange={changeHandler} value={formData.cuttingPrice} name="cuttingPrice" type="text" />
                </label>

               </div>

               <div className="btnSec">
                <button className="submitBtn">
                Submit
                </button>
                <button onClick={addForm} className="AdBtn">
                Add <img src={plus} alt="" />
                </button>
               </div>

             </form>
            ))
           }
            

          </main>

            </div>

        </div>
    )
}

export default CreateOrder;