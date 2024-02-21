import Navbar from "../Common/Navbar";
import Sidebar from "../Common/Sidebar";
import "./createOrder.css"
import cross from "../image/cross.png"
import plus from "../image/plus 2.png"

function CreateOrder(){
    return (
        <div className="cretOrdrWrap">

            <Navbar />

            <div className="CrtOrCont">

                <Sidebar />

          <main className="mainOrdCon">

             <form className="ordForm" >

              <nav className="orFiNa">
                <p>Create Order</p>
                <img src={cross} alt="" />
              </nav>

              <hr />

               <div className="allFields">
                  
                   {/* single  */}
                <label htmlFor="">
                    <p>CLIENT NAME</p>
                    <input type="text" />
                </label>

                   {/* single  */}
                <label htmlFor="">
                    <p>TYPE</p>
                  <select name="" id=""></select>
                </label>

                   {/* single  */}
                <label htmlFor="">
                    <p>IRON QUALITY</p>
                  <input type="text" />
                </label>

                   {/* single  */}
                <label htmlFor="">
                    <p>DIAMETER</p>
                  <input type="text" />
                </label>
                   {/* single  */}
                <label htmlFor="">
                    <p>QUANTITY</p>
                  <input type="text" />
                </label>
                   {/* single  */}
                <label htmlFor="">
                    <p>LENGTH</p>
                  <input type="text" />
                </label>
                   {/* single  */}
                <label htmlFor="">
                    <p>HEIGHT</p>
                  <input type="text" />
                </label>
                   {/* single  */}
                <label htmlFor="">
                    <p>WIDTH</p>
                  <input type="text" />
                </label>
                   {/* single  */}
                <label htmlFor="">
                    <p>WEIGHT</p>
                  <input type="text" />
                </label>

                   {/* single  */}
                <label htmlFor="">
                    <p>CUTTING PRICE</p>
                  <input type="text" />
                </label>

               </div>

               <div className="btnSec">
                <button className="submitBtn">
                Submit
                </button>
                <button className="AdBtn">
                Add <img src={plus} alt="" />
                </button>
               </div>

             </form>

          </main>

            </div>

        </div>
    )
}

export default CreateOrder;