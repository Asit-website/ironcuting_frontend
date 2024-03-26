import Navbar from "../Common/Navbar";
import Sidebar from "../Common/Sidebar";
import "./createOrder.css";
import cross from "../image/cross.png";
import plus from "../image/plus 2.png";
import { useEffect, useState } from "react";
import { useMain } from "../hooks/useMain";
import { useLocation, useNavigate } from "react-router-dom";

function UserOrder({ notify }) {
  const location = useLocation();
  const order = location?.state?.item;


   console.log('order ',order);

  const [formData, setFormData] = useState(
    {
      client: "",
      type: "",
      ironQuality: "",
      Diameter: "",
      quantity: "",
      Length: "",
      Height: "",
      Width: "",
      Weight: "",
      CuttingPrice: "",
    },
  );

  const [allType, setAllType] = useState([]);

  const [allIronQuality, setAllIronQuality] = useState([]);

  const navigate = useNavigate();

  const getqualityFunction = async () => {
    const resp = await fetchIronQuality();
    if (resp?.status) {
      setAllIronQuality(resp?.allIronQuality);
    }
  };

  const getTypeFuntion = async () => {
    const resp = await getAllType();
    if (resp.status) {
      setAllType(resp?.allType);
    }
  };


  const {
    getAllType,
    createIronOrder,
    createIronOrder2,
    getFlatIronCutting,
    fetchIronQuality,
    getRoundWeight,
    getFlatWeight,
    getRoundCuttingPrice
  } = useMain();


  const getRoundCutting = async () => {
    const resp = await getRoundCuttingPrice({
      type: formData.type,
      Diameter: formData.Diameter,
      quantity: formData.quantity,
      ironQuality: formData.ironQuality,
    });

    if (resp.status) {
      setFormData((prev)=>({
        ...prev ,
        CuttingPrice : resp?.CuttingPrice
      }))
    }
  };


  const getFlatCuttingPrice = async () => {
    const resp = await getFlatIronCutting({
      type: formData.type,
      Height: formData.Height,
      Width: formData.Width,
      quantity: formData.quantity,
      ironQuality: formData.ironQuality,
    });

    if (resp.status) {
    setFormData((prev)=>({
        ...prev ,
        CuttingPrice: resp?.CuttingPrice
    }))
    }
  };

  const getRoundweight = async () => {
    const resp = await getRoundWeight({
      type: formData.type,
      Length: formData.Length,
      Diameter: formData.Diameter,
    });

    if (resp.status) {
            setFormData((prev)=>({
                ...prev ,
                Weight: resp?.Weight
            }))
    }
  };

  const getFlatweight = async () => {
    const resp = await getFlatWeight({
      type: formData.type,
      Length: formData.Length,
      Height: formData.Height,
      Width: formData.Width,
    });


    if (resp.status) {
       const {Weight} = resp;
        setFormData((prev)=>({
            ...prev  , 
            Weight: Weight
        }))

    }
  };

 const submitHandler = async(e)=>{
     e.preventDefault();
    try{

        if(order){
          const resp = await createIronOrder2(formData , order._id);
          if(resp?.status){
            alert("Successfully created");
            navigate("/dashboard");
          }
        }
        else {
          const resp = await createIronOrder(formData);
          if(resp?.status){
            alert("Successfully created");
            navigate("/dashboard");
          }
        }
    } catch(error){
        console.log(error);
    }
 }

  useEffect(() => {
    getTypeFuntion();
    getqualityFunction();
  }, []);


  useEffect(() => {
    if (formData?.type === "Flat") {
      if (
        formData?.Height !== "" &&
        formData?.Width !== "" &&
        formData?.quantity !== ""
      ) {
        getFlatCuttingPrice();
      } else {
     
      }
    } else if (formData?.type === "Round") {
      if (
        formData?.Diameter !== "" &&
        formData?.Length &&
        formData?.quantity
      ) {
        getRoundCutting();
      } else {

      }
    }
  }, [
    formData?.type,
    formData?.Length,
    formData?.Weight,
    formData?.quantity,
    formData?.Diameter,
    formData?.Width,
    formData?.Height,
  ]);

  useEffect(() => {
    if (formData.type === "Flat") {
      if (
        formData.Length !== "" &&
        formData.Height !== "" &&
        formData.Width !== ""
      ) {
        getFlatweight();
      } else {
    
      }
    } else if (formData.type === "Round") {
      if (
        formData.Diameter !== "" &&
        formData.Length
      ) {
        getRoundweight();
      } else {
   
      }
    }
  }, [
    formData?.type,
    formData?.Length,
    formData?.Height,
    formData?.Width,
    formData?.Diameter,
  ]);

  return (
    <div className="cretOrdrWrap">
      <Navbar hideCreateOrder={true} />

      <div className="CrtOrCont">
        <Sidebar notify={notify} />

        <main className="mainOrdCon">

           <h2>{order?.client}</h2>



      {
        order && 
          

<div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">

        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                ORDER NO.
                </th>
                <th scope="col" class="px-6 py-3">
                TYPE
                </th>
                <th scope="col" class="px-6 py-3">
                IRON QUALITY
                </th>
                <th scope="col" class="px-6 py-3">
                DIAMETER
                </th>
                <th scope="col" class="px-6 py-3">
                LENGTH
                </th>
                <th scope="col" class="px-6 py-3">
                QUANTITY
                </th>
                <th scope="col" class="px-6 py-3">
                WEIGHT
                </th>
                <th scope="col" class="px-6 py-3">
                CUTTING PRICE
                </th>
                <th scope="col" class="px-6 py-3">
                ACTION
                </th>
            </tr>
        </thead>

        <tbody>

            {
                order?.form?.map((item ,index)=>(
                    <tr key={index} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                     {index+1}
                    </th>
                    <td class="px-6 py-4">
                        {item?.type}
                    </td>
                    <td class="px-6 py-4">
                        {item?.ironQuality}
                    </td>
                    <td class="px-6 py-4">
                        {item?.Diameter}
                    </td>
                    <td class="px-6 py-4">
                        {item?.Length}
                    </td>
                    <td class="px-6 py-4">
                        {item?.quantity}
                    </td>
                    <td class="px-6 py-4">
                        {item?.Weight}
                    </td>
                    <td class="px-6 py-4">
                        {item?.CuttingPrice}
                    </td>
                    <td class="px-6 py-4">
                        ACTIONS 
                    </td>
                </tr>
                ))
            }
         
          
        </tbody>
    </table>
</div>

          }



          <div  className="mainRcc">
     
              <form
                onSubmit={ submitHandler }
                className="ordForm"
              >
                <nav className="orFiNa">
                  <p>Create Order</p>
                
                </nav>

                <hr />

                <div className="allFields">


 { 
  !order  && 


                  <label htmlFor="type">
                    <p>CLIENT NAME</p>

                    <input
                        onChange={(e) =>
                         setFormData((prev)=>({
                            ...prev ,
                            client: e.target.value
                         }))
                        }
                        value={formData.client}
                        name="client"
                        type="text"
                        required
                      />
                
                  </label>


                      }

                  <label htmlFor="type">
                    <p>TYPE</p>
                    <select
                      value={formData?.type}
                      onChange={(e)=>{
                        setFormData((prev)=>({
                            ...prev ,
                            type: e.target.value
                        }))
                      }}
                      name="type"
                      id="type"
                    
                    >
                      <option selected>Select</option>
                      {allType?.map((item) => (
                        <option key={item?._id} value={item?.Name}>
                          {item?.Name}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label htmlFor="ironQuality">
                    <p>IRON QUALITY</p>
                    <select
                      value={formData?.ironQuality}
                      onChange={(e) =>
                               setFormData((prev)=>({
                                ...prev ,
                                ironQuality: e.target.value
                               }))
                      }
                      name="ironQuality"
                      id="ironQuality"
                    >
                      <option selected>Select</option>
                      {allIronQuality?.map((item) => (
                        <option key={item?._id} value={item?.Name}>
                          {item?.Name}
                        </option>
                      ))}
                    </select>
                  </label>

                  {formData.type !== "Flat" && (
                    <label>
                      <p>DIAMETER</p>
                      <input
                        onChange={(e) =>
                         setFormData((prev)=>({
                            ...prev ,
                            Diameter: e.target.value
                         }))
                        }
                        value={formData.Diameter}
                        name="Diameter"
                        type="number"
                        maxLength="4"
                        required
                        autoComplete="off"
                      />
                    </label>
                  )}

                  {formData.type !== "Round" && (
                    <label htmlFor="Height">
                      <p>HEIGHT</p>
                      <input
                        onChange={(e) =>
                            setFormData((prev)=>({
                                ...prev ,
                                Height: e.target.value
                             }))
                        }
                        value={formData.Height}
                        name="Height"
                        type="number"
                        maxLength="4"
                        required
                        className="hit"
                        autoComplete="off"
                      />
                    </label>
                  )}

                  {formData.type !== "Round" && (
                    <label htmlFor="">
                      <p>WIDTH</p>
                      <input
                        onChange={(e) =>
                            setFormData((prev)=>({
                                ...prev ,
                                Width: e.target.value
                             }))
                        }
                        value={formData.Width}
                        name="Width"
                        type="number"
                        maxLength="4"
                        required
                        className="hit"
                        autoComplete="off"
                      />
                    </label>
                  )}

                  <label>
                    <p>LENGTH</p>
                    <input
                      onChange={(e) =>
                        setFormData((prev)=>({
                            ...prev ,
                            Length: e.target.value
                         }))
                      }
                      value={formData.Length}
                      name="Length"
                      type="number"
                      maxLength={4}
                      required
                      className="hit"
                      autoComplete="off"
                    />
                  </label>

                  <label>
                    <p>QUANTITY</p>
                    <input
                      onChange={(e) =>
                        setFormData((prev)=>({
                            ...prev ,
                            quantity: e.target.value
                         }))
                      }
                      value={formData.quantity}
                      name="quantity"
                      type="number"
                      maxLength="4"
                      required
                      className="hit"
                      autoComplete="off"
                    />
                  </label>

                  <label>
                    <p>WEIGHT</p>
                    <input
                      onChange={(e) =>
                        setFormData((prev)=>({
                            ...prev ,
                            Weight: e.target.value
                         }))
                      }
                      value={formData.Weight}
                      name="Weight"
                      type="number"
                      // maxLength="4"
                      required
                      autoComplete="off"
                    />
                  </label>

                  <label>
                    <p>CUTTING PRICE</p>
                    <input
                      onChange={(e) =>
                        setFormData((prev)=>({
                            ...prev ,
                            CuttingPrice: e.target.value
                         }))
                      }
                      value={formData.CuttingPrice}
                      name="CuttingPrice"
                      type="number"
                      required
                      autoComplete="off"
                    />
                  </label>
                </div>

                <div className="btnSec">
                  <button type="submit" className="submitBtn">
                    Submit
                  </button>
                
                </div>

              </form>
        
          </div>



        </main>
      </div>
    </div>
  );
}

export default UserOrder;
