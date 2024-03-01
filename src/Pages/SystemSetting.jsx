import Navbar from "../Common/Navbar";
import Sidebar from "../Common/Sidebar";
import "./systemSetting.css";
import plusSet from "../image/plusSet.png";
import rightSign from "../image/RightSign.png";
import { useEffect, useState } from "react";
import rightBlack from "../image/blackRight.png";
import sR1 from "../image/searchRi.png";
import deleteS from "../image/deleteS.png";
import editS from "../image/editS.png";
import { useMain } from "../hooks/useMain";

const leftData = [
  {
    title: "Type",
  },
  {
    title: "Iron Quality",
  },
];

function SystemSetting() {
  const [onEdit, setOnEdit] = useState(false);
  const [editData, setEditData] = useState({});

  const [currentSystem, setCurrentSystem] = useState("Type");

  const [openPopup, setOpenPopup] = useState(false);

  const {
    getAllType,
    createType,
    DeleteType,
    updateType,
    fetchIronQuality,
    createQuality,
    deleteQuality,
    updateQuality,
  } = useMain();

  
  const [loading , setLoading] = useState(false);
  
  const [allType, setAllType] = useState([]);
  
  const [allDummyData , setAllDummyData] = useState(allType);

  const [refreshFlag, setRefreshFlag] = useState(false);

  const [searchBar, setSearchBar] = useState("");

  useEffect(() => {
    getTypeFuntion();
  }, [refreshFlag]);

  const getTypeFuntion = async () => {
    setLoading(true);
    setSearchBar("");
    const resp = await getAllType();
    if (resp.status) {
      setAllType(resp?.allType);
      setAllDummyData(resp?.allType);

    }
    else {
      setAllType([]);
    }
    setLoading(false);
  };

  // const [Name, setName] = useState("");
  const [value, setValue] = useState({
    Name: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (onEdit) {
      setValue({
        id: editData._id,
        Name: editData.Name,
      });
    }
  }, [editData]);

  const createHandler = async () => {
    if (onEdit) {
      const ans = await updateType({
        ...value,
      });
      console.log(editData._id);
      console.log(ans.data);

      if (ans?.status) {
        console.log("hi");
        // notify("success", "successfully Updated");
        alert("successfully updated");
        setRefreshFlag(!refreshFlag);
        setValue({
          Name: "",
        });
      } else {
        alert("Something went wrong");
      }
    } else {
      const resp = await createType({ ...value });
      if (resp.status) {
        alert("Succesfuly Created");
        setRefreshFlag(!refreshFlag);
        setValue({
          Name: "",
        });
      } else {
        alert("Something went wrong");
      }
    }
    setOpenPopup(false);
  };

  const createIronHandler = async () => {
    if (onEdit) {
      const ans = await updateQuality({
        ...value,
      });

      if (ans?.status) {
        alert("successfully updated iron");
        // setRefreshFlag(!refreshFlag)
        fetchAllIronQuality();
        setValue({
          Name: "",
        });
      } else {
        alert("Something went wrong");
      }
    } else {
      const resp = await createQuality({ ...value });
      console.log("rs", resp);
      if (resp.status) {
        alert("Succesfuly Created");
        fetchAllIronQuality();
        setValue({
          Name: "",
        });
      } else {
        alert("Something went wrong");
      }
    }
    setOpenPopup(false);
  };

  const deleteTypeHandler = async (id) => {
    const resp = await DeleteType({ id });
    if (resp.status) {
      alert("Successfuly deleted");
      setRefreshFlag(!refreshFlag);
    } else {
      alert("Something went wrong");
    }
  };

  const deleteIronHandler = async (id) => {
    const resp = await deleteQuality({ id });
    if (resp.status) {
      alert("Successfuly deleted Quality");
      fetchAllIronQuality();
    } else {
      alert("Something went wrong");
    }
  };

  const fetchAllIronQuality = async () => {
    setLoading(true);
    setSearchBar("");

    const resp = await fetchIronQuality();
    if (resp.status) {
      setAllType(resp?.allIronQuality);
      setAllDummyData(resp?.allIronQuality);
    }
    else {
      setAllType([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (currentSystem === leftData[1].title) {
      fetchAllIronQuality();
    } else if (currentSystem === leftData[0].title) {
      getTypeFuntion();
    }
  }, [currentSystem]);


  useEffect(()=>{

     if(searchBar === ""){
            if(currentSystem === leftData[0].title){
              getTypeFuntion();
            }
            else{
              fetchAllIronQuality();
            }
     }
    
      else {
  
         let dummy = [...allDummyData];
       
         const filter = dummy.filter((data) => {
      
          return data?.Name?.toLowerCase().includes(searchBar.toLowerCase());
        });

         setAllType(filter);

      }
     
  },[searchBar])

  // console.log("allTy",allType);

  return (
    <div className={`sysSetWrap  ${openPopup && "openPopup"}`}>
      <Navbar hideCreateOrder={true} />

      <div className="sySeCont">
        <Sidebar />

        <div className="sySrIGHT">
          <div className="sSetRCon">
            <nav>
              <img
                onClick={() => {
                  if (currentSystem === leftData[1].title) {
                    setOpenPopup(true);
                  } else {
                    setOpenPopup(true);
                    setEditData({});
                    setOnEdit(false);
                  }
                }}
                src={plusSet}
                alt=""
              />
            </nav>

            <div className="VirstMRiFir">
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

                <input
                  value={searchBar}
                  onChange={(e)=>setSearchBar(e.target.value)}
                  type="text"
                  placeholder="Search"
                />
              </div>
            </div>

            <main className="syMain">
              {/* left side */}
              <div className="stMaLe">
                {leftData.map((item, index) => (
                  <>
                    <div
                      key={index}
                      onClick={() => setCurrentSystem(item.title)}
                      className={`siStMale ${
                        currentSystem === item.title ? "currentSym" : "otherStm"
                      }`}
                    >
                      <p>{item.title}</p>
                      {currentSystem === item.title ? (
                        <img src={rightSign} alt="" />
                      ) : (
                        <img src={rightBlack} alt="" />
                      )}
                    </div>

                    {currentSystem === item.title && (
                      <>
                        {/* second  */}
                        <div className="VirstMrSec">
                          <p>{currentSystem}</p>
                          <p>ACTION</p>
                        </div>

                        {/* third  */}
                        <div className="VirstmRtHIR">
                          {allType.map((item) => (
                            <div key={item?._id} className="singTtpe">
                              {/* left */}
                              <h2 className="STpeLi">{item?.Name}</h2>

                              {/* right */}
                              <div className="STpeRi">
                                <img
                                  onClick={() => {
                                    if (currentSystem === leftData[0].title) {
                                      setOnEdit(true);
                                      setEditData(item);
                                      setOpenPopup(true);
                                    } else if (
                                      currentSystem === leftData[1].title
                                    ) {
                                      setOnEdit(true);
                                      setEditData(item);
                                      setOpenPopup(true);
                                    }
                                  }}
                                  src={editS}
                                  alt=""
                                />

                                <img
                                  onClick={() => {
                                    if (currentSystem === leftData[1].title) {
                                      deleteIronHandler(item?._id);
                                    } else if (
                                      currentSystem === leftData[0].title
                                    ) {
                                      deleteTypeHandler(item?._id);
                                    }
                                  }}
                                  src={deleteS}
                                  alt=""
                                />
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="virNav">
                          <img
                            onClick={() => {
                              if (currentSystem === leftData[1].title) {
                                setOpenPopup(true);
                              } else {
                                setOpenPopup(true);
                                setEditData({});
                                setOnEdit(false);
                              }
                            }}
                            src={plusSet}
                            alt=""
                          />
                        </div>
                      </>
                    )}
                  </>
                ))}
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

                    <input
                      value={searchBar}
                      onChange={(e)=>setSearchBar(e.target.value)}
                      type="text"
                      placeholder="Search"
                    />
                  </div>
                </div>

                {/* second  */}
                <div className="stMrSec">
                  <p>{currentSystem}</p>
                  <p>ACTION</p>
                </div>

                {/* third  */}
                <div className="stmRtHIR">


 {
  loading ?
  <span class="loader"></span>
  :

  allType.length >  0 ?
  allType.map((item) => (
    <div key={item?._id} className="singTtpe">
      {/* left */}
      <h2 className="STpeLi">{item?.Name}</h2>

      {/* right */}
      <div className="STpeRi">
        <img
          onClick={() => {
            if (currentSystem === leftData[0].title) {
              setOnEdit(true);
              setEditData(item);
              setOpenPopup(true);
            } else if (currentSystem === leftData[1].title) {
              setOnEdit(true);
              setEditData(item);
              setOpenPopup(true);
            }
          }}
          src={editS}
          alt=""
        />

        <img
          onClick={() => {
            if (currentSystem === leftData[1].title) {
              deleteIronHandler(item?._id);
            } else if (currentSystem === leftData[0].title) {
              deleteTypeHandler(item?._id);
            }
          }}
          src={deleteS}
          alt=""
        />
      </div>
    </div>
  ))
  :
  <span className="notDtafound"> No Data Found</span>
 }
                  
                  
                </div>

              </div>
            </main>
          </div>
        </div>
      </div>

      {openPopup && (
        <div className="creNoWrap">
          <div className="cretNPoup">
            <h2>{onEdit ? "Update" : "Create new"}</h2>

            <hr />

            <label className="enteNa">
              <p>Name</p>
              <input
                name="Name"
                value={value.Name}
                onChange={handleChange}
                type="text"
                placeholder="Enter Name"
              />
            </label>

            <hr />

            <div className="crCBtn">
              <button
                onClick={() => {
                  setOpenPopup(false);
                  setOnEdit(false);
                  setEditData({});
                  setValue({
                    Name: "",
                  });
                }}
                className="canceBtn"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (currentSystem === leftData[1].title) {
                    createIronHandler();
                  } else {
                    createHandler();
                    setOpenPopup(false);
                    // setOnEdit(true)
                  }
                }}
                className="createBtn"
              >
                {onEdit ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SystemSetting;
