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

  const [onEdit, setOnEdit] = useState(false);
  const [editData, setEditData] = useState({});

  const [data,setData] = useState(false);

  const stylePeer = {
    display: data ? "block" : "none"
  }


  console.log('order ', order);

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
      setFormData((prev) => ({
        ...prev,
        CuttingPrice: resp?.CuttingPrice
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

      if (order) {
        const resp = await createIronOrder2(formData, order._id);
        if (resp?.status) {
          alert("Successfully created");
          navigate("/dashboard");
        }
      }
      else {
        const resp = await createIronOrder(formData);
        if (resp?.status) {
          alert("Successfully created");
          navigate("/dashboard");
        }
      }
    } catch (error) {
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
          <div className="mainRcc">
            <h2 className="test_nam"> <span className="client_nam">CLIENT NAME :</span> {order?.client}</h2>
            {
              order &&


              <div class="relative overflow-x-auto">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">

                  <thead class="jlo uppercase">
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
                      order?.form?.map((item, index) => (
                        <tr key={index} class="bg-white border-b gho">
                          <th scope="row" class="px-6 py-4  whitespace-nowrap">
                            {index + 1}
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
                            <div className="flex items-center jop">
                              <svg onClick={()=>{
                                setData(true);
                              }} width="23" height="23" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="30" height="30" rx="2" fill="#00A96E" />
                                <g clip-path="url(#clip0_577_144)">
                                  <path d="M22.3333 13.875H15.6667V7.625C15.6667 7.45924 15.5964 7.30027 15.4714 7.18306C15.3464 7.06585 15.1768 7 15 7C14.8232 7 14.6536 7.06585 14.5286 7.18306C14.4036 7.30027 14.3333 7.45924 14.3333 7.625V13.875H7.66667C7.48986 13.875 7.32029 13.9408 7.19526 14.0581C7.07024 14.1753 7 14.3342 7 14.5C7 14.6658 7.07024 14.8247 7.19526 14.9419C7.32029 15.0592 7.48986 15.125 7.66667 15.125H14.3333V21.375C14.3333 21.5408 14.4036 21.6997 14.5286 21.8169C14.6536 21.9342 14.8232 22 15 22C15.1768 22 15.3464 21.9342 15.4714 21.8169C15.5964 21.6997 15.6667 21.5408 15.6667 21.375V15.125H22.3333C22.5101 15.125 22.6797 15.0592 22.8047 14.9419C22.9298 14.8247 23 14.6658 23 14.5C23 14.3342 22.9298 14.1753 22.8047 14.0581C22.6797 13.9408 22.5101 13.875 22.3333 13.875Z" fill="white" />
                                </g>
                                <defs>
                                  <clipPath id="clip0_577_144">
                                    <rect width="16" height="15" fill="white" transform="translate(7 7)" />
                                  </clipPath>
                                </defs>
                              </svg>

                              <svg width="23" height="23" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="30" height="30" rx="2" fill="#FFBE00" />
                                <g clip-path="url(#clip0_576_130)">
                                  <path d="M16.736 10.7913L7 20.5267V23H9.47333L19.2087 13.264L16.736 10.7913Z" fill="white" />
                                  <path d="M22.4883 7.512C22.1603 7.18412 21.7154 6.99993 21.2516 6.99993C20.7878 6.99993 20.343 7.18412 20.015 7.512L17.6816 9.84867L20.1543 12.3213L22.4876 9.988C22.6504 9.82557 22.7796 9.63263 22.8678 9.42022C22.9559 9.20781 23.0013 8.98011 23.0014 8.75014C23.0014 8.52017 22.9562 8.29244 22.8681 8.07999C22.7801 7.86753 22.651 7.67452 22.4883 7.512Z" fill="white" />
                                </g>
                                <defs>
                                  <clipPath id="clip0_576_130">
                                    <rect width="16" height="16" fill="white" transform="translate(7 7)" />
                                  </clipPath>
                                </defs>
                              </svg>

                              <svg width="23" height="23" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="30" height="30" rx="2" fill="#FF5861" />
                                <g clip-path="url(#clip0_576_125)">
                                  <path d="M18.333 9.66667V8.33333C18.333 7.97971 18.1925 7.64057 17.9425 7.39052C17.6924 7.14048 17.3533 7 16.9997 7H12.9997C12.6461 7 12.3069 7.14048 12.0569 7.39052C11.8068 7.64057 11.6663 7.97971 11.6663 8.33333V9.66667H8.33301V11H9.66634V21C9.66634 21.5304 9.87705 22.0391 10.2521 22.4142C10.6272 22.7893 11.1359 23 11.6663 23H18.333C18.8634 23 19.3721 22.7893 19.7472 22.4142C20.1223 22.0391 20.333 21.5304 20.333 21V11H21.6663V9.66667H18.333ZM14.333 18.3333H12.9997V14.3333H14.333V18.3333ZM16.9997 18.3333H15.6663V14.3333H16.9997V18.3333ZM16.9997 9.66667H12.9997V8.33333H16.9997V9.66667Z" fill="white" />
                                </g>
                                <defs>
                                  <clipPath id="clip0_576_125">
                                    <rect width="16" height="16" fill="white" transform="translate(7 7)" />
                                  </clipPath>
                                </defs>
                              </svg>


                            </div>
                          </td>
                        </tr>
                      ))
                    }


                  </tbody>
                </table>
              </div>

            }

            <form
              
              onSubmit={submitHandler}
              className="ordForm"
            >
              <nav className="orFiNa">
                <p>Create Order</p>

              </nav>

              <hr />

              <div className="allFields">


                {
                  !order &&


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
