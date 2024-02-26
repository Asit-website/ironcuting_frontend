import Navbar from "../Common/Navbar";
import Sidebar from "../Common/Sidebar";
import "./systemSetting.css"
import plusSet from "../image/plusSet.png"
import rightSign from "../image/RightSign.png"
import { useEffect, useState } from "react";
import rightBlack from "../image/blackRight.png"
import sR1 from "../image/searchRi.png"
import deleteS from "../image/deleteS.png"
import editS from "../image/editS.png"
import { useMain } from "../hooks/useMain"
import { useLocation } from "react-router-dom";

const leftData = [
    {
        title: "Type"
    },
    {
        title: "Iron Quality"
    },
    {
        title: "Cutting Price"
    }
]

function SystemSetting() {

    const location = useLocation();

    const [onEdit,setOnEdit] = useState(false);
    const [editData, setEditData] = useState({});

    const [currentSystem, setCurrentSystem] = useState(0);

    const [openPopup, setOpenPopup] = useState(false);

    const { getAllType, createType, DeleteType, updateType } = useMain();

    const [allType, setAllType] = useState([]);

    const [refreshFlag, setRefreshFlag] = useState(false);

    useEffect(() => {
        getTypeFuntion();
    }, [refreshFlag])


    const getTypeFuntion = async () => {
        const resp = await getAllType();
        if (resp.status) {
            setAllType(resp?.allType);
        }
    }



    // const [Name, setName] = useState("");
    const [value,setValue] = useState({
        Name:"",
    })

    const handleChange = (e) =>{
        e.preventDefault();
        const { name, value } = e.target;
        setValue((prev) => ({
          ...prev,
          [name]: value
        }))
    }

    useEffect(() => {
        if (onEdit) {
            console.log(editData);
            setValue({
                id: editData._id,
                Name: editData.Name
            })
        }
    }, [editData])

    const createHandler = async () => {
        if(onEdit){
              const ans = await updateType({
                 ...value
              });
              console.log(editData._id)
              console.log(ans.data)
          
              if (ans?.status) {
                console.log("hi")
                // notify("success", "successfully Updated");
                alert("successfully updated")
                setRefreshFlag(!refreshFlag)
                setValue({
                    Name:""
                })
              } else {
                alert("Something went wrong");
              }
        } else{
            const resp = await createType({ ...value });
            if (resp.status) {
                alert("Succesfuly Created");
                setRefreshFlag(!refreshFlag);
                setValue({
                    Name:""
                })
            }
            else {
                alert("Something went wrong");
            }
        }
        setOpenPopup(false);
    }
   
    

    
    const deleteTypeHandler = async (id) => {
        const resp = await DeleteType({ id });
        if (resp.status) {
            alert("Successfuly deleted");
            setRefreshFlag(!refreshFlag);
        }
        else {
            alert("Something went wrong");
        }
    }

    return (
        <div className={`sysSetWrap  ${openPopup && "openPopup"}`}>

            <Navbar />


            <div className="sySeCont">

                <Sidebar />

                <div className="sySrIGHT">

                    <div className="sSetRCon">


                        <nav>
                            <img onClick={() =>{ setOpenPopup(true); setEditData({}); setOnEdit(false)}} src={plusSet} alt="" />
                        </nav>

                        <main className="syMain">

                            {/* left side */}
                            <div className="stMaLe">

                                {
                                    leftData.map((item, index) => (
                                        <div key={index} onClick={() => setCurrentSystem(index)} className={`siStMale ${currentSystem === index ? "currentSym" : "otherStm"}`}>
                                            <p>{item.title}</p>
                                            {
                                                currentSystem === index ?
                                                    <img src={rightSign} alt="" />
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
                                        allType.map((item) => (
                                            <div key={item?._id} className="singTtpe">
                                                {/* left */}
                                                <h2 className="STpeLi">{item?.Name}</h2>

                                                {/* right */}
                                                <div className="STpeRi">

                                                    <img onClick={() => {
                                                        
                                                        setOnEdit(true);
                                                         setEditData(item)
                                                        setOpenPopup(true);
                                                      
                                                    }} src={editS} alt="" />
                                                    <img onClick={() => deleteTypeHandler(item?._id)} src={deleteS} alt="" />

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

                        <h2>{onEdit ? "Update" : "Create new"}</h2>

                        <hr />

                        <label className="enteNa" >
                            <p>Name</p>
                            <input name="Name"  value={value.Name} onChange={handleChange} type="text" placeholder="Enter Name" />
                        </label>

                        <hr />

                        <div className="crCBtn">
                            <button onClick={() => {
                                setOpenPopup(false);
                                setOnEdit(false);
                                setEditData({});
                                setValue({
                                    Name:""
                                })
                            } } className="canceBtn">
                                Cancel
                            </button>
                            <button
                                onClick={()=>{
                                    createHandler();
                                    setOpenPopup(false);
                                    // setOnEdit(true)
                                }}
                                className="createBtn">
                                {onEdit ? "Update" : "Create"}
                            </button>
                        </div>

                    </div>
                </div>
            }

        </div>
    )
}

export default SystemSetting;