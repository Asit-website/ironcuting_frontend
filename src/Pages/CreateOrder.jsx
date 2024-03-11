import Navbar from "../Common/Navbar";
import Sidebar from "../Common/Sidebar";
import "./createOrder.css";
import cross from "../image/cross.png";
import plus from "../image/plus 2.png";
import { useEffect, useState } from "react";
import { useMain } from "../hooks/useMain";
import { useLocation, useNavigate } from "react-router-dom";

function CreateOrder({ notify }) {
  const location = useLocation();
  const order = location?.state?.item;
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);

  const [formData, setFormData] = useState([
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
  ]);

  const [formId, setFormId] = useState([0]);


  const {
    getAllType,
    createIronOrder,
    getRoundCuttingPrice,
    getFlatIronCutting,
    updateOrders,
    fetchIronQuality,
    getRoundWeight,
    getFlatWeight,
  } = useMain();

  const handleFormDataChange = (index, fieldName, value) => {
    // If the field is "Length", validate the input

    setCurrentIndex(index);

    if (
      (fieldName === "Length" ||
        fieldName === "Height" ||
        fieldName === "Width" ||
        fieldName === "Diameter") &&
      !/^\d{0,4}$/.test(value)
    ) {
      // If the input is not a valid number with up to 4 digits, return without updating the form data
      return;
    }

    // Update the form data
    setFormData((prevForms) => {
      const updatedForms = [...prevForms]; // Copy previous forms data
      updatedForms[index] = { ...updatedForms[index], [fieldName]: value }; // Update specific form data
      return updatedForms;
    });
  };

  const addForm = (e) => {
    e.preventDefault();
    setFormId((prev) => [...prev, prev.length]);

    setFormData((prevForms) => [
      ...prevForms,
      {
        client: formData[0].client,
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
    ]);
  };

  console.log("formdata ",formData);

  const removeForm = (index) => {
    if (formId.length === 1) {
      return navigate("/dashboard");
    }

    setFormId((prev) => prev.filter((_, i) => i !== index));

    setFormData((prevFormData) => {
      const updatedFormData = [...prevFormData]; // Create a copy of the formData array
      updatedFormData.splice(index, 1); // Remove the form data at the specified index
      return updatedFormData;
    });
  };

  const [allType, setAllType] = useState([]);

  const [allIronQuality, setAllIronQuality] = useState([]);

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

  const submitHandler = async (index) => {
    const resp = await createIronOrder(formData[index]);
    console.log("Res", resp);
    if (resp.status) {
      notify("success", "successfully created the order");
      navigate("/dashboard");
      setFormData([
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
      ]);
    } else {
      notify("error", "something went wrong please try again");
    }
  };

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

      setFormData([
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
      ]);

      navigate("/dashboard");
    } else {
      notify("error", "something went wrong");
    }
  };

  const getRoundCutting = async () => {
    const resp = await getRoundCuttingPrice({
      type: formData[currentIndex].type,
      Diameter: formData[currentIndex].Diameter,
      Length: formData[currentIndex].Length,
      quantity: formData[currentIndex].quantity,
      ironQuality: formData[currentIndex].ironQuality,
    });

    console.log("resp", resp);
    if (resp.status) {
      setFormData((prevForms) => {
        const updatedForms = [...prevForms];
        updatedForms[currentIndex] = {
          ...updatedForms[currentIndex],
          CuttingPrice: resp?.CuttingPrice,
        };
        return updatedForms;
      });
    }
  };

  const getFlatCuttingPrice = async () => {
    const resp = await getFlatIronCutting({
      type: formData[currentIndex].type,
      Height: formData[currentIndex].Height,
      Width: formData[currentIndex].Width,
      quantity: formData[currentIndex].quantity,
      ironQuality: formData[currentIndex].ironQuality,
    });
    console.log("rflat", resp);
    if (resp.status) {
      setFormData((prevForms) => {
        const updatedForms = [...prevForms];
        updatedForms[currentIndex] = {
          ...updatedForms[currentIndex],
          CuttingPrice: resp?.CuttingPrice,
        };
        return updatedForms;
      });
    }
  };

  const getRoundweight = async () => {
    const resp = await getRoundWeight({
      type: formData[currentIndex].type,
      Length: formData[currentIndex].Length,
      Diameter: formData[currentIndex].Diameter,
    });
    if (resp.status) {
      setFormData((prevForms) => {
        const updatedForms = [...prevForms];
        updatedForms[currentIndex] = {
          ...updatedForms[currentIndex],
          Weight: resp?.Weight,
        };
        return updatedForms;
      });
    }
  };

  const getFlatweight = async () => {
    const resp = await getFlatWeight({
      type: formData[currentIndex].type,
      Length: formData[currentIndex].Length,
      Height: formData[currentIndex].Height,
      Width: formData[currentIndex].Width,
    });
    if (resp.status) {
      setFormData((prevForms) => {
        const updatedForms = [...prevForms];
        updatedForms[currentIndex] = {
          ...updatedForms[currentIndex],
          Weight: resp?.Weight,
        };
        return updatedForms;
      });
    }
  };

  useEffect(() => {
    if (formData[currentIndex].type === "Flat") {
      if (
        formData[currentIndex].Length !== "" &&
        formData[currentIndex].Height !== "" &&
        formData[currentIndex].Width !== ""
      ) {
        getFlatweight();
      } else {
        setFormData((prevForms) => {
          const updatedForms = [...prevForms];
          updatedForms[currentIndex] = {
            ...updatedForms[currentIndex],
            Weight: "",
          };
          return updatedForms;
        });
      }
    } else if (formData[currentIndex].type === "Round") {
      if (
        formData[currentIndex].Diameter !== "" &&
        formData[currentIndex].Length
      ) {
        getRoundweight();
      } else {
        setFormData((prevForms) => {
          const updatedForms = [...prevForms];
          updatedForms[currentIndex] = {
            ...updatedForms[currentIndex],
            Weight: "",
          };
          return updatedForms;
        });
      }
    }
  }, [
    formData[currentIndex].type,
    formData[currentIndex].Length,
    formData[currentIndex].Height,
    formData[currentIndex].Width,
    formData[currentIndex].Diameter,
  ]);

  useEffect(() => {
    if (formData[currentIndex].type === "Flat") {
      if (
        formData[currentIndex].Height !== "" &&
        formData[currentIndex].Width !== "" &&
        formData[currentIndex].quantity !== ""
      ) {
        getFlatCuttingPrice();
      } else {
        setFormData((prevForms) => {
          const updatedForms = [...prevForms];
          updatedForms[currentIndex] = {
            ...updatedForms[currentIndex],
            CuttingPrice: "",
          };
          return updatedForms;
        });
      }
    } else if (formData[currentIndex].type === "Round") {
      if (
        formData[currentIndex].Diameter !== "" &&
        formData[currentIndex].Length &&
        formData[currentIndex].quantity
      ) {
        getRoundCutting();
      } else {
        setFormData((prevForms) => {
          const updatedForms = [...prevForms];
          updatedForms[currentIndex] = {
            ...updatedForms[currentIndex],
            CuttingPrice: "",
          };
          return updatedForms;
        });
      }
    }
  }, [
    formData[currentIndex].type,
    formData[currentIndex].Length,
    formData[currentIndex].Weight,
    formData[currentIndex].quantity,
    formData[currentIndex].Diameter,
    formData[currentIndex].Width,
    formData[currentIndex].Height,
  ]);

  useEffect(() => {
    getTypeFuntion();
    getqualityFunction();
  }, []);

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

  return (
    <div className="cretOrdrWrap">
      <Navbar hideCreateOrder={true} />

      <div className="CrtOrCont">
        <Sidebar notify={notify} />

        <main className="mainOrdCon">
          <div className="mainRcc">
            {formId.map((id, index) => (
              <form
                onSubmit={
                  order
                    ? projectUpdateHandler
                    : (e) => {
                        e.preventDefault();
                        submitHandler(index);
                      }
                }
                key={index}
                className="ordForm"
              >
                <nav className="orFiNa">
                  <p>Create Order</p>
                  <img
                    onClick={() => {
                      removeForm(index);
                    }}
                    src={cross}
                    alt=""
                  />
                </nav>

                <hr />

                <div className="allFields">
                  
                  <label className={`${index > 0 && "hh"}`} htmlFor="client">
                    <p>CLIENT NAME</p>
                    <input
                      id="client"
                      onChange={(e) => {
                        const clientValue = e.target.value;
                        setFormData(prevFormData => {
                          return prevFormData.map(form => ({
                            ...form,
                            client: clientValue
                          }));
                        });
                      }}
                      name="client"
                      value={formData[currentIndex]?.client}
                      type="text"
                      required
                    />
                  </label>

                  <label>
                    <p>TYPE</p>
                    <select
                      value={formData[index].type}
                      onChange={(e) =>
                        handleFormDataChange(index, "type", e.target.value)
                      }
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
                      value={formData[index]?.ironQuality}
                      onChange={(e) =>
                        handleFormDataChange(
                          index,
                          "ironQuality",
                          e.target.value
                        )
                      }
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
                        onChange={(e) =>
                          handleFormDataChange(
                            index,
                            "Diameter",
                            e.target.value
                          )
                        }
                        value={formData[index].Diameter}
                        name="Diameter"
                        type="number"
                        maxLength="4"
                        required
                      />
                    </label>
                  )}

                  {formData.type !== "Round" && (
                    <label htmlFor="">
                      <p>HEIGHT</p>
                      <input
                        onChange={(e) =>
                          handleFormDataChange(index, "Height", e.target.value)
                        }
                        value={formData[index].Height}
                        name="Height"
                        type="number"
                        maxLength="4"
                        required
                      />
                    </label>
                  )}

                  {formData.type !== "Round" && (
                    <label htmlFor="">
                      <p>WIDTH</p>
                      <input
                        onChange={(e) =>
                          handleFormDataChange(index, "Width", e.target.value)
                        }
                        value={formData[index].Width}
                        name="Width"
                        type="number"
                        maxLength="4"
                        required
                      />
                    </label>
                  )}

                  <label>
                    <p>LENGTH</p>
                    <input
                      onChange={(e) =>
                        handleFormDataChange(index, "Length", e.target.value)
                      }
                      value={formData[index].Length}
                      name="Length"
                      type="number"
                      maxLength={4}
                      required
                    />
                  </label>

                  <label>
                    <p>QUANTITY</p>
                    <input
                      onChange={(e) =>
                        handleFormDataChange(index, "quantity", e.target.value)
                      }
                      value={formData[index].quantity}
                      name="quantity"
                      type="number"
                      maxLength="4"
                      required
                    />
                  </label>

                  <label>
                    <p>WEIGHT</p>
                    <input
                      onChange={(e) =>
                        handleFormDataChange(index, "Weight", e.target.value)
                      }
                      value={formData[index].Weight}
                      name="Weight"
                      type="number"
                      // maxLength="4"
                      required
                    />
                  </label>

                  <label>
                    <p>CUTTING PRICE</p>
                    <input
                      onChange={(e) =>
                        handleFormDataChange(
                          index,
                          "CuttingPrice",
                          e.target.value
                        )
                      }
                      value={formData[index].CuttingPrice}
                      name="CuttingPrice"
                      type="number"
                      required
                    />
                  </label>
                </div>

                <div className="btnSec">
                  <button type="submit" className="submitBtn">
                    Submit
                  </button>
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
