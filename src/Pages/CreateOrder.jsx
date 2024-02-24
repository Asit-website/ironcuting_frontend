import Navbar from "../Common/Navbar";
import Sidebar from "../Common/Sidebar";
import "./createOrder.css"
import cross from "../image/cross.png"
import plus from "../image/plus 2.png"
import { useEffect, useState } from "react";
import { useMain } from "../hooks/useMain"


function CreateOrder() {


  const [formData, setFormData] = useState({
    clientName: "",
    type: "",
    ironQuality: "",
    diameter: "",
    quantity: "",
    length: "",
    height: "",
    width: "",
    weight: "",
    cuttingPrice: ""
  })

  const [formId, setFormId] = useState([0]);

  const { getAllType, createIronOrder, getRoundCuttingPrice, getFlatIronCutting } = useMain();


  const changeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const addForm = (e) => {
    e.preventDefault();
    setFormId((prev) => [...prev, prev.length]);
  };

  const removeForm = (index) => {
    if (formId.length === 1 && index === 0) {
      return;
    }
    setFormId((prev) => prev.filter((_, i) => i !== index));
  };

  const [allType, setAllType] = useState([]);


  const getTypeFuntion = async () => {
    const resp = await getAllType();
    if (resp.status) {
      setAllType(resp?.allType);
    }
  }

  useEffect(() => {
    getTypeFuntion();
  }, []);


  const submitHandler = async (e) => {
    e.preventDefault();
    const resp = await createIronOrder(formData);
    console.log("Res", resp);
    if (resp.status) {
      alert("Successfuly Created the order");
      setFormData({
        clientName: "",
        type: "",
        ironQuality: "",
        diameter: "",
        quantity: "",
        length: "",
        height: "",
        width: "",
        weight: "",
        cuttingPrice: ""
      })
    }
    else {
      alert("Something went wrong , please try again");
    }
  }


  const getRoundCutting = async () => {
    const resp = await getRoundCuttingPrice({ Type: formData.type, diameter: formData.diameter, length: formData.length, quantity: formData.quantity });
    if (resp.status) {
      setFormData((prev) => ({
        ...prev,
        cuttingPrice: resp?.cuttingPrice
      }))
    }
  }

  const getFlatCuttingPrice = async () => {
    const resp = await getFlatIronCutting({ Type: formData.type, height: formData.height, weight: formData.weight, quantity: formData.quantity });
    console.log("res", resp);
    if (resp.status) {
      setFormData((prev) => ({
        ...prev,
        cuttingPrice: resp?.cuttingPrice
      }))
    }
  }

  useEffect(() => {


    if (formData.type === "Flat") {

      if (formData.height !== "" && formData.weight !== "" && formData.quantity !== "") {

        getFlatCuttingPrice();
      }
      else {
        setFormData((prev) => ({
          ...prev,
          cuttingPrice: ""
        }))
      }

    }
    else if (formData.type === "Round") {
      if (formData.diameter !== "" && formData.length && formData.quantity) {
        getRoundCutting();

      }
      else {
        setFormData((prev) => ({
          ...prev,
          cuttingPrice: ""
        }))
      }
    }

  }, [formData.type, formData.length, formData.weight, formData.quantity, formData.diameter, formData.width, formData.height])

  return (
    <div className="cretOrdrWrap">

      <Navbar hideCreateOrder={true} />

      <div className="CrtOrCont">

        <Sidebar />

        <main className="mainOrdCon">

          <div className="mainRcc">

            {
              formId.map((id, index) => (
                <form key={index} className="ordForm" >

                  <nav className="orFiNa">
                    <p>Create Order</p>
                    <img onClick={() => removeForm(index)} src={cross} alt="" />
                  </nav>

                  <hr />

                  <div className="allFields">

                    <label >
                      <p>CLIENT NAME</p>
                      <input onChange={changeHandler} name="clientName" value={formData.clientName} type="text" />
                    </label>

                    <label >
                      <p>TYPE</p>
                      <select onChange={changeHandler} name="type" id="">

                        <option value="Select" selected disabled>Select</option>
                        {
                          allType.map((item) => (
                            <option key={item?._id} value={item?.Name}>{item?.Name}</option>

                          ))
                        }

                      </select>
                    </label>

                    <label>
                      <p>IRON QUALITY</p>
                      <input onChange={changeHandler} value={formData.ironQuality} name="ironQuality" type="text" />
                    </label>

                    {
                      formData.type !== "Flat" &&
                      <label >
                        <p>DIAMETER</p>
                        <input onChange={changeHandler} value={formData.diameter} name="diameter" type="text" />
                      </label>
                    }


                    <label >
                      <p>QUANTITY</p>
                      <input onChange={changeHandler} value={formData.quantity} name="quantity" type="text" />
                    </label>

                    <label >
                      <p>LENGTH</p>
                      <input onChange={changeHandler} value={formData.length} name="length" type="text" />
                    </label>

                    {
                      formData.type !== "Round" &&
                      <label htmlFor="">
                        <p>HEIGHT</p>
                        <input onChange={changeHandler} value={formData.height} name="height" type="text" />
                      </label>
                    }

                    {
                      formData.type !== "Round" &&
                      <label htmlFor="">
                        <p>WIDTH</p>
                        <input onChange={changeHandler} value={formData.width} name="width" type="text" />
                      </label>
                    }

                    <label >
                      <p>WEIGHT</p>
                      <input onChange={changeHandler} value={formData.weight} name="weight" type="text" />
                    </label>

                    <label >
                      <p>CUTTING PRICE</p>
                      <input onChange={changeHandler} value={formData.cuttingPrice} name="cuttingPrice" type="text" />
                    </label>

                  </div>

                  <div className="btnSec">
                    <button onClick={submitHandler} className="submitBtn">
                      Submit
                    </button>
                    <button onClick={addForm} className="AdBtn">
                      Add <img src={plus} alt="" />
                    </button>
                  </div>

                </form>
              ))
            }

          </div>

        </main>

      </div>

    </div>
  )
}

export default CreateOrder;