import Navbar from "../Common/Navbar";
import Sidebar from "../Common/Sidebar";
import "./createOrder.css";
import cross from "../image/cross.png";
import plus from "../image/plus 2.png";
import { useEffect, useState } from "react";
import { useMain } from "../hooks/useMain";
import { useLocation, useNavigate } from "react-router-dom";

function CreateOrder({notify}) {
  const location = useLocation();
  const order = location?.state?.item;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
  });

  const [formId, setFormId] = useState([0]);

  const {
    getAllType,
    createIronOrder,
    getRoundCuttingPrice,
    getFlatIronCutting,
    updateOrders,
    fetchIronQuality,
  } = useMain();

  const changeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addForm = (e) => {
    e.preventDefault();
    setFormId((prev) => [...prev, prev.length]);
  };

  const removeForm = (index) => {
    if (formId.length === 1 && index === 0) {
      return navigate("/dashboard")
    }
    setFormId((prev) => prev.filter((_, i) => i !== index));
  };

  const [allType, setAllType] = useState([]);

  const [allIronQuality, setAllIronQuality] = useState([]);

  const getqualityFunction = async () => {
    const resp = await fetchIronQuality();
    if (resp?.status) {
      setAllIronQuality(resp?.allIronQuality);
    }
  };

  useEffect(() => {
    getTypeFuntion();
    getqualityFunction();
  }, []);

  const getTypeFuntion = async () => {
    const resp = await getAllType();
    if (resp.status) {
      setAllType(resp?.allType);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const resp = await createIronOrder(formData);
    console.log("Res", resp);
    if (resp.status) {
      notify("success","successfully created the order")
      navigate("/dashboard");
      setFormData({
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
      });
    } else {
      notify("error","something went wrong please try again")
    }
  };

  useEffect(() => {
    if (order) {
      const {
        client,
        type,
        ironQuality,
        Diameter,
        quantity,
        Length,
        Height,
        Width,
        Weight,
        CuttingPrice,
      } = order;

      console.log("pr", order);

      setFormData({
        client,
        type,
        ironQuality,
        Diameter,
        quantity,
        Length,
        Height,
        Width,
        Weight,
        CuttingPrice,
      });
    }
  }, []);

  const projectUpdateHandler = async (e) => {
    e.preventDefault();

    const {
      client,
      type,
      ironQuality,
      Diameter,
      quantity,
      Length,
      Height,
      Width,
      Weight,
      CuttingPrice,
    } = formData;

    const ans = await updateOrders({
      client,
      type,
      ironQuality,
      Diameter,
      quantity,
      Length,
      Height,
      Width,
      Weight,
      CuttingPrice,
      id: order._id,
    });

    if (ans?.status) {
      console.log("hi");
      notify("success", "successfully Updated");
      // alert("successfully updated");
      setFormData({
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
      });

      navigate("/dashboard");
    } else {
      notify("error","something went wrong");
    }
  };

  const getRoundCutting = async () => {
    const resp = await getRoundCuttingPrice({
      type: formData.type,
      Diameter: formData.Diameter,
      Length: formData.Length,
      quantity: formData.quantity,
    });
    if (resp.status) {
      setFormData((prev) => ({
        ...prev,
        CuttingPrice: resp?.CuttingPrice,
      }));
    }
  };

  const getFlatCuttingPrice = async () => {
    const resp = await getFlatIronCutting({
      type: formData.type,
      Height: formData.Height,
      Weight: formData.Weight,
      quantity: formData.quantity,
    });
    console.log("res", resp);
    if (resp.status) {
      setFormData((prev) => ({
        ...prev,
        CuttingPrice: resp?.CuttingPrice,
      }));
    }
  };

  useEffect(() => {
    if (formData.type === "Flat") {
      if (
        formData.Height !== "" &&
        formData.Weight !== "" &&
        formData.quantity !== ""
      ) {
        getFlatCuttingPrice();
      } else {
        setFormData((prev) => ({
          ...prev,
          CuttingPrice: "",
        }));
      }
    } else if (formData.type === "Round") {
      if (formData.Diameter !== "" && formData.Length && formData.quantity) {
        getRoundCutting();
      } else {
        setFormData((prev) => ({
          ...prev,
          CuttingPrice: "",
        }));
      }
    }
  }, [
    formData.type,
    formData.Length,
    formData.Weight,
    formData.quantity,
    formData.Diameter,
    formData.Width,
    formData.Height,
  ]);

  return (
    <div className="cretOrdrWrap">
      <Navbar hideCreateOrder={true} />

      <div className="CrtOrCont">
        <Sidebar notify={notify} />

        <main className="mainOrdCon">
          <div className="mainRcc">
            {formId.map((id, index) => (
              <form
                onSubmit={order ? projectUpdateHandler : submitHandler}
                key={index}
                className="ordForm"
              >
                <nav className="orFiNa">
                  <p>Create Order</p>
                  <img onClick={() => {
                    removeForm(index);
                    
                  }} src={cross} alt="" />
                </nav>

                <hr />

                <div className="allFields">
                  <label className={`${index>0 && "hh"}`} htmlFor="client">
                    <p>CLIENT NAME</p>
                    <input
                      id="client"
                      onChange={changeHandler}
                      name="client"
                      value={formData?.client}
                      type="text"
                      required
                    />
                  </label>

                  <label>
                    <p>TYPE</p>
                    <select
                      value={formData.type}
                      onChange={changeHandler}
                      name="type"
                      id="type"
                    >
                      <option selected>Select</option>
                      {allType.map((item) => (
                        <option key={item?._id} value={item?.Name}>
                          {item?.Name}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label>
                    <p>IRON QUALITY</p>
                    <select
                      value={formData?.ironQuality}
                      onChange={changeHandler}
                      name="ironQuality"
                      id="type"
                    >
                      <option selected>Select</option>
                      {allIronQuality.map((item) => (
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
                        onChange={changeHandler}
                        value={formData.Diameter}
                        name="Diameter"
                        type="text"
                        maxLength="4"
                        required
                      />
                    </label>
                  )}




                  {formData.type !== "Round" && (
                    <label htmlFor="">
                      <p>HEIGHT</p>
                      <input
                        onChange={changeHandler}
                        value={formData.Height}
                        name="Height"
                        type="text"
                        maxLength="4"
                        required
                      />
                    </label>
                  )}

                  <label>
                    <p>LENGTH</p>
                    <input
                      onChange={changeHandler}
                      value={formData.Length}
                      name="Length"
                      type="text"
                      maxLength="4"
                      required
                    />
                  </label>

                  {formData.type !== "Round" && (
                    <label htmlFor="">
                      <p>WIDTH</p>
                      <input
                        onChange={changeHandler}
                        value={formData.Width}
                        name="Width"
                        type="text"
                        maxLength="4"
                        required
                      />
                    </label>
                  )}

                  <label>
                    <p>QUANTITY</p>
                    <input
                      onChange={changeHandler}
                      value={formData.quantity}
                      name="quantity"
                      type="text"
                      maxLength="4"
                      required
                    />
                  </label>


                  <label>
                    <p>WEIGHT</p>
                    <input
                      onChange={changeHandler}
                      value={formData.Weight}
                      name="Weight"
                      type="text"
                      maxLength="4"
                      required
                    />
                  </label>

                  <label>
                    <p>CUTTING PRICE</p>
                    <input
                      onChange={changeHandler}
                      value={formData.CuttingPrice}
                      name="CuttingPrice"
                      type="text"
                      required
                    />
                  </label>
                </div>

                <div className="btnSec">
                  <button className="submitBtn">Submit</button>
                  <button onClick={addForm} className="AdBtn">
                    Add <img src={plus} alt="" />
                  </button>
                </div>
              </form>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default CreateOrder;
