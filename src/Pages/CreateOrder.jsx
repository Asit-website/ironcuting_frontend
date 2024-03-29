import Navbar from "../Common/Navbar";
import Sidebar from "../Common/Sidebar";
import "./createOrder.css";
import add from "../image/add1.png"
import d from "../image/delete1.png"
import edit from "../image/edit1.png"
import { useEffect, useState } from "react";
import { useMain } from "../hooks/useMain";
import { useLocation, useNavigate } from "react-router-dom";
import adding from '../image/adding.svg';
import deleting from '../image/deleteing.svg'
import sonta from '../image/sonta.svg';
function UserOrder({ notify }) {
  const location = useLocation();
  let data  = location?.state?.item;
  const [order1 , setOrder1] = useState(data);

  const [order, setOrder] = useState([]);
  
  

  const [formData, setFormData] = useState(
    {
      client: "",
      orderNumber:"",
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

  const [updatedId, setUpdatedId] = useState(null);

  const [openForm, setOpenForm] = useState(false);

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
    getRoundCuttingPrice,
    deleteForm,
    fetchUserFormWithId,
    updateFormHadler
  } = useMain();


  const getRoundCutting = async () => {
    const resp = await getRoundCuttingPrice({
      type: formData.type,
      Diameter: formData.Diameter,
      quantity: formData.quantity,
      ironQuality: formData.ironQuality,
    });

    if (resp.status) {
      setFormData((prev) => ({
        ...prev,
        CuttingPrice: resp?.CuttingPrice
      }))
    }
  };


  const fetchUserForm = async (id = false) => {
      let ans;
      if(id){
         ans = await fetchUserFormWithId(id);
         
        }
        else {
          ans = await fetchUserFormWithId(order1?._id);
      }
     console.log("fetucn user form ",ans);
    if (ans.status) {
      setOrder(ans?.data);
    }

  }

  const getRoundweight = async () => {
    const resp = await getRoundWeight({
      type: formData.type,
      Length: formData.Length,
      Diameter: formData.Diameter,
    });

    if (resp.status) {
      setFormData((prev) => ({
        ...prev,
        Weight: resp?.Weight
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
      setFormData((prev) => ({
        ...prev,
        CuttingPrice: resp?.CuttingPrice
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
      const { Weight } = resp;
      setFormData((prev) => ({
        ...prev,
        Weight: Weight
      }))

    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {

      if (order1) {
        const resp = await createIronOrder2(formData, order1._id);
        if (resp?.status) {
          // alert("Successfully created");
          notify("success","successfully created");
          fetchUserForm();
          setOpenForm(false);
          navigate("/createOrder");
        }
      }
      else {
        const resp = await createIronOrder(formData);
         
        if (resp?.status) {
          notify("success",resp?.message);
          const {orderCreate} = resp;
          setOrder1(orderCreate);        
          fetchUserForm(orderCreate?._id);
          setOpenForm(false);
          
        }
        else {
          if(resp?.code === 403){
  alert(resp?.message);
          }
        }
      }
    } catch (error) {
       console.log(error);
      //  alert("error")
    }
  }

  useEffect(() => {
    fetchUserForm();
    getTypeFuntion();
    getqualityFunction();


    if (order1) {
      setOpenForm(false);
    }
    else {
      setOpenForm(true);
    }

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

  const deleteOrder = async (id) => {
    try {

      const ans = await deleteForm(id, order1?._id);
      fetchUserForm();

    } catch (error) {
      console.log(error);
    }
  }

  const updateHandler = async (e) => {
    e.preventDefault();
    const ans = await updateFormHadler(formData, updatedId, order1?._id);
    if (ans?.status) {
      fetchUserForm();
      // alert("Successfuly updated");
      notify("success","successfully updated")
      setOpenForm(false);
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
      },)
    }
  }


  return (
    <div className="cretOrdrWrap">
      <Navbar hideCreateOrder={true} />

      <div className="CrtOrCont">
        <Sidebar notify={notify} />

        <main className="mainOrdCon">
          <div className="mainRcc">
          <h2 className="sof"> <span className="sets">CLIENT NAME : </span> {order1?.client}</h2>
          {
            order1 &&


            <div class="relative overflow-x-auto">
              <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">

                <thead class="text-xs  uppercase saty">
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
                      HEIGHT
                    </th>
                    <th scope="col" class="px-6 py-3">
                      WIDTH
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
                    order?.map((item, index) => (
                      <tr key={index} class="bg-white border-b salar">
                        <th scope="row" class="px-6 py-4 whitespace-nowrap">
                          {index+1}
                        </th>
                        <td class="px-6 py-4">
                          {item?.type}
                        </td>
                        <td class="px-6 py-4">
                          {item?.ironQuality}
                        </td>
                        <td class="px-6 py-4">
                          {item?.type === "Round" ? item?.Diameter : "-"}
                          
                        </td>
                        <td class="px-6 py-4">
                          {item?.type === "Flat" ? item?.Height : "-"}
                        </td>
                        <td class="px-6 py-4">
                          {item?.type === "Flat" ? item?.Width : "-"}
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

                        <td class="px-6 py-4 flex gap-2">

                          <img onClick={() => {
                            setOpenForm(true);
                            setFormData({
                              type: "",
                              ironQuality: "",
                              Diameter: "",
                              Length: "",
                              quantity: "",
                              Weight: "",
                              CuttingPrice: "",
                              Height: "",
                              Width: ""
                            })
                            setUpdatedId(null);

                          }} className="cursor-pointer" src={adding} alt="add" />

                          <img onClick={() => {
                            setOpenForm(true);
                            setFormData({
                              type: item?.type,
                              ironQuality: item?.ironQuality,
                              Diameter: item?.Diameter,
                              Length: item?.Length,
                              quantity: item?.quantity,
                              Weight: item?.Weight,
                              CuttingPrice: item?.CuttingPrice,
                              Height: item?.Height,
                              Width: item?.Width
                            })
                            setUpdatedId(item?._id);
                          }} src={sonta} alt="edit" className="cursor-pointer" />

                          <img onClick={() => {
                            deleteOrder(item?._id);
                            setOpenForm(false);
                            setUpdatedId(null);
                          }} src={deleting} alt="delete" className="cursor-pointer" />

                        </td>
                      </tr>
                    ))
                  }


                </tbody>
              </table>
            </div>

          }

            {
              openForm && <form
                onSubmit={updatedId ? updateHandler : submitHandler}
                className="ordForm"
              >
                <nav className="orFiNa">
                  <p>Create Order</p>

                </nav>

                <hr />

                <div className="allFields">

                  {
                    !order1 && 
                    <label htmlFor="type">
                    <p>ORDER NUMBER</p>

                    <input
                      onChange={(e) =>

                        setFormData((prev) => ({
                          ...prev,
                          orderNumber: e.target.value
                        }))
                      }
                      value={formData.orderNumber}
                      name="orderNumber"
                      type="Number"
                      required
                    />

                  </label>
                  }
                  {
                    !order1 &&


                    <label htmlFor="type">
                      <p>CLIENT NAME</p>

                      <input
                        onChange={(e) =>

                          setFormData((prev) => ({
                            ...prev,
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
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
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
                        setFormData((prev) => ({
                          ...prev,
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
                          setFormData((prev) => ({
                            ...prev,
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
                          setFormData((prev) => ({
                            ...prev,
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
                          setFormData((prev) => ({
                            ...prev,
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
                        setFormData((prev) => ({
                          ...prev,
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
                        setFormData((prev) => ({
                          ...prev,
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
                        setFormData((prev) => ({
                          ...prev,
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
                        setFormData((prev) => ({
                          ...prev,
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
                    {updatedId ? "Update" : "Submit"}
                  </button>

                </div>

              </form>
            }


          </div>




        </main>
      </div>
    </div>
  );
}

export default UserOrder;
