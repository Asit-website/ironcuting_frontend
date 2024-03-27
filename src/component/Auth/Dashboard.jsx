import React, { useEffect, useState} from 'react'
import "./dashboard.css"
import Navbar from '../../Common/Navbar'
import Sidebar from '../../Common/Sidebar'
import search from "../../image/search.png"
import { useMain } from '../../hooks/useMain';
import { useNavigate } from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import alas from '../../image/alas.png';
// import sdfg from '../../image/sdfg.svg'
import fg from '../../image/fg.svg';
import das1 from '../../image/das1.svg';
import das2 from '../../image/das2.svg';
import das4 from '../../image/das4.svg';
import OutsideClickHandler from 'react-outside-click-handler';

function Dashboard({ notify }) {
  const navigate = useNavigate();
  const { getOrders, deleteOrders , fetchOrderDetails } = useMain();
  const [order, setOrder] = useState([]);
  const [order1, setOrder1] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState(false);

   const [primarydata , setPrimaryData] = useState({
    completeOrder:"0",
    todayOrder:0 , 
    totalOrder:0
   });

  const [value, setValue] = useState({
    query: ""
  });
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(4);
  const [total, setTotal] = useState(0);

  const user = JSON.parse(localStorage.getItem("iron_user"));

  const [Filter, setFilter] = useState("Select");

  const fetchPrimaryData = async()=>{
    const data = await fetchOrderDetails();

     setPrimaryData({
      completeOrder: data?.completeOrder , 
      todayOrder: data?.todayOrder ,
      totalOrder : data?.totalOrder
     })
  }

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    getData();
  };

  const getData = async () => {
    const ans = await getOrders("", value.query, page, perPage);
    console.log("orders",ans);
    setOrder(ans?.data);
    setTotal(ans?.count);
    // setPage(page);
  }

  const getData1 = async () => {
    const ans = await getOrders("", value.query, "", "");
    setOrder1(ans?.data);
  }

  const deleteOrders1 = async (id) => {
    confirmAlert({
      title: 'Are you sure to delete this data?',
      message: 'All related data to this will be deleted',
      buttons: [
        {
          label: 'Yes, Go Ahead!',
          style: {
            background: "#FF5449"
          },
          onClick: async () => {
            const ans = await deleteOrders(id);
            console.log(ans);
            if (ans.status) {
              notify("error", "deleted successfully");
              setRefreshFlag(!refreshFlag);
            }
            else {
              alert('Something went wrong! ');
            }
          }
        },
        {
          label: 'Cancel',

          onClick: () => null
        }
      ]
    });
  };

  const completeOrder = async(id) =>{
    const ans = await deleteOrders(id);
    if (ans.status) {
      notify("success", "order completed successfully");
      setRefreshFlag(!refreshFlag);
      fetchPrimaryData();
    }
    else {
      alert('Something went wrong! ');
    }
  }

  const adjustFilterData = async () => {

    let dummyArray = [...order1];

    if (Filter === "This Week") {


      // filter with week
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      const filteredData = dummyArray.filter(item => {
        return new Date(item.Date) >= oneWeekAgo;
      });

      setOrder(filteredData);

    }
    else if (Filter === "This Month") {

      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      const filteredData = dummyArray.filter(item => {
        const itemDate = new Date(item.Date);
        return itemDate >= oneMonthAgo;
      });

      setOrder(filteredData);

    }
    else if (Filter === "Per Day") {
      const targetDate = new Date(); // Get the current date
      const targetYear = targetDate.getFullYear();
      const targetMonth = targetDate.getMonth();
      const targetDay = targetDate.getDate();

      const filteredData = dummyArray.filter(item => {
        const itemDate = new Date(item.Date);
        const itemYear = itemDate.getFullYear();
        const itemMonth = itemDate.getMonth();
        const itemDay = itemDate.getDate();

        return itemYear === targetYear && itemMonth === targetMonth && itemDay === targetDay;
      });

      setOrder(filteredData);

    }

  }

  useEffect(()=>{
    fetchPrimaryData();
  },[])

  useEffect(() => {

    if (Filter !== 'Select') {
      adjustFilterData();
    }
    else {
      getData();
    }
  }, [Filter])

  useEffect(() => {
    getData();
  }, [refreshFlag, page, perPage]);

  useEffect(() => {
    getData1();
    // console.log(refreshFlag)
  }, [refreshFlag])




  return (

    <div className='dashWrap'>

      <Navbar />

      <div className="dashCont">

        <Sidebar notify={notify} />

        {/* right side */}
        <div className="dashRight">


          <div className='cli'>
            {/* first  */}
            <div className='dRFirs'>
              <div className="hi">
                <h2 className='flex items-center'>Hi, {user.name} <img className='ml-2 yr' src={alas} alt="alas" /></h2>
              </div>
              {/* <select name="" id="">
                <option value="">This Week</option>
              </select> */}
            </div>

            {/* seconnd  */}
            <div className="drSec">

              {/* first  */}
              <div className='siDrSec'>

                <img src={das1} alt="" />
                <h2>Orders In Queve</h2>
                <p>{primarydata?.totalOrder}</p>


              </div>

              {/* second  */}
              <div className='siDrSec'>

                <img src={das2} alt="" />
                <h2>Today Orders</h2>
                <p>{primarydata.todayOrder}</p>


              </div>

              {/* third  */}
              {/* <div className='siDrSec'>

                <img src={das3} alt="" />
                <h2>Cancel Orders</h2>
                <p>05</p>


              </div> */}

              {/* fourth  */}
              <div className='siDrSec'>

                <img src={das4} alt="" />
                <h2>Complete Orders </h2>
                <p>{primarydata?.completeOrder}</p>


              </div>

            </div>


            {/* table  */}
            <div className='tableStart'>

              <div className='tabSec1'>

                {/* left side */}
                <div className='tabS1Lef'>
                  <select name="page" id="page">
                    <option onClick={() => {
                      if ((page * perPage) < total) {
                        setPage(page + 1);
                      }
                    }} value={page}>3</option>
                    <option value={page}>6</option>
                  </select>

                  <span>Entries per page</span>

                </div>

                {/* right side */}
                <div className='tabS1Rig'>
                  <div className='sara'>
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 5.49864L0 0.501358H10L5 5.49864Z" fill="#293240" />
                    </svg>

                    <select onChange={(e) => setFilter(e.target.value)} value={Filter} name="thisFilter" id="">
                      <option value="Select" disabled selected > Select</option>
                      <option value="Per Day">Per Day</option>
                      <option value="This Week"> This Week</option>
                      <option value="This Month">This Month</option>
                    </select>

                  </div>

                  <div className='srch'>
                    <img src={search} alt="" />

                    <input onKeyUp={handleSearch} onChange={handleChange} name='query' value={value.query} type="search" placeholder='Search..' />

                  </div>

                </div>

              </div>

              <div class="relative overflow-x-auto px-[10px] ">

                <table class="w-full text-sm text-left rtl:text-right text-gray-500  dark:text-gray-400">

                  <thead class="gg">
                    <tr>
                      <th scope="col" class="px-3 py-3 text-[#060606]">
                        order id
                      </th>
                      <th scope="col" class="px-3 py-3 text-[#060606]">
                        client
                      </th>
                      <th scope="col" class="px-3 py-3 text-[#060606]">
                        Date
                      </th>
                      {/* <th scope="col" class="px-3 py-3 text-[#060606]">
                        Type
                      </th> */}
                      {/* <th scope="col" class="px-3 py-3 text-[#060606]">
                        iron quality
                      </th> */}
                      <th scope="col" class="px-3 py-3 text-[#060606]">
                        quantity
                      </th>

                      {/* <th scope="col" class="px-3 py-3 text-[#060606]">
                        diameter
                      </th>
                      <th scope="col" class="px-3 py-3 text-[#060606]">
                        length
                      </th>
                      <th scope="col" class="px-3 py-3 text-[#060606]">
                        height
                      </th>
                      <th scope="col" class="px-3 py-3 text-[#060606]">
                        width
                      </th> */}
                      <th scope="col" class="px-3 py-3 text-[#060606]">
                        weight
                      </th>
                      <th scope="col" class="px-3 py-3 text-[#060606]">
                        Cutting Price
                      </th>
                      <th scope="col" class="px-3 py-3 text-[#060606]">
                        action
                      </th>
                      <th scope="col" class="px-3 py-3 text-[#060606]">
                        Mark Complete
                      </th>
                    </tr>
                  </thead>

                  <tbody className='sss'>

                    {
                      order.map((item, index) => (
                        <tr key={index} class="bg-white border-b border-[#CED4DA]">
                          <td class="px-3 py-4 text-[#293240] ansDataItem ">
                            {/* {(item._id).slice(4, 6)} */}
                            {index+1}
                          </td>
                          <td class="px-3 py-4 text-[#293240] ansDataItem ">
                            {item.client}
                          </td>
                          <td class="px-3 py-4 text-[#293240] ansDataItem">
                            {new Date(item?.Date).getDate()}/{new Date(item?.Date).getMonth() + 1}/{new Date(item?.Date).getFullYear()}
                          </td>
                          {/* <td class="px-3 py-4 text-[#293240] ansDataItem">
                            {item.type}
                          </td>
                          <td class="px-3 py-4 text-[#293240] ansDataItem">
                            {item.ironQuality}
                          </td> */}
                          <td class="px-3 py-4 text-[#293240] ansDataItem">
                            {item.quantity}
                          </td>
                          {/* <td class="px-3 py-4 text-[#293240] ansDataItem">
                            {item.Diameter}
                          </td>
                          <td class="px-3 py-4 text-[#293240] ansDataItem">
                            {item.Length}
                          </td>
                          <td class="px-3 py-4 text-[#293240] ansDataItem">
                            {item.Height}
                          </td>
                          <td class="px-3 py-4 text-[#293240] ansDataItem">
                            {item.Width}
                          </td> */}
                          <td class="px-3 py-4 text-[#293240] ansDataItem">
                            {Number(item.Weight).toFixed(2)}
                          </td>
                          <td class="px-3 py-4 text-[#293240] ansDataItem">
                            {item.CuttingPrice}
                          </td>

                          <td class="px-3 py-4 text-[#293240] ansDataItem">
                            <OutsideClickHandler
                              onOutsideClick={() => {
                                if (!document.getElementById(`action_box${index}`).classList.contains('d-none')) {
                                  document.getElementById(`action_box${index}`).classList.add('d-none');
                                }
                              }}
                            >
                              <img onClick={() => {
                                document.getElementById(`action_box${index}`).classList.toggle('hidden');
                              }} src={fg} alt="sdfg" />
                              <div id={`action_box${index}`} className='hidden action_box'>
                                <p className='cursor-pointer' onClick={() => {
                                  navigate(`/createOrder`, { state: { item } })
                                }}>Edit</p>
                                <p className='cursor-pointer' onClick={() => {
                                  deleteOrders1(item._id)
                                }}>Delete</p>
                                <p className='cursor-pointer' onClick={() => {
                                  navigate(`/selectRound/${item._id}`)
                                }}>View Details</p>
                              </div>
                            </OutsideClickHandler>
                          </td>

                          <td class="px-3 py-4 text-[#293240] ansDataItem">
                            <button onClick={()=>{
                               completeOrder(item?._id)
                            }} type="button" class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Complete</button>
                          </td>

                        </tr>
                      ))
                    }


                  </tbody>
                </table>
                <div style={{ width: 'fit-content', margin: '20px auto' }} className="view_all">
                  <button disabled={page === 1} className='focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 sist' onClick={() => {
                    if (page > 1) {
                      setPage(page - 1);
                    }
                  }}>Previous</button>
                  <span className='btn222'>Page {page}</span>
                  <button disabled={(page * perPage) >= total} className='focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 sist' onClick={() => {
                    if ((page * perPage) < total) {
                      setPage(page + 1);
                    }
                  }}>Next</button>
                </div>

                {/* <button onClick={generatePdf}>pdf</button> */}

              </div>


            </div>
          </div>


        </div>


      </div>


    </div>
  )
}

export default Dashboard
