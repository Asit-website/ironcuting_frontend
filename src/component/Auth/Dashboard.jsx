import React, { useEffect, useState, useRef } from 'react'
import "./dashboard.css"
import Navbar from '../../Common/Navbar'
import Sidebar from '../../Common/Sidebar'
import order1 from "../../image/order1.png"
import order2 from "../../image/order2.png"
import order3 from "../../image/order3.png"
import order4 from "../../image/order4.png"
import search from "../../image/search.png"
import eye from "../../image/eye.png"
import { useMain } from '../../hooks/useMain';
import { useNavigate } from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { useReactToPrint } from 'react-to-print'
import alas from '../../image/alas.png';

function Dashboard() {
  const navigate = useNavigate();
  const { getOrders, deleteOrders } = useMain();
  const [order, setOrder] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [open, setOpen] = useState(false);

  const [value, setValue] = useState({
    query: ""
  });
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(4);
  const [total, setTotal] = useState(0);

  const user = JSON.parse(localStorage.getItem("iron_user"));


  const contonentPDF = useRef();

  useEffect(() => {
    getData();
  }, [refreshFlag, page, perPage]);

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    getData();
    setPage(page)
  };

  const getData = async () => {
    const ans = await getOrders("", value.query, page, perPage);
    console.log("ans", ans);
    setOrder(ans?.data);
    setTotal(ans?.count);
    console.log(ans?.data);
    setPage(page)
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
              alert('delete');
              // notify(ans.status, ans.message);
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

  const generatePdf = useReactToPrint({
    content: () => contonentPDF.current,
    documentTitle: "Order",
    onAfterPrint: () => alert("Data saved in PDF")
  })
  return (

    <div className='dashWrap'>

      <Navbar />

      <div className="dashCont">

        <Sidebar />

        {/* right side */}
        <div className="dashRight">

          {/* first  */}
          <div className='dRFirs'>
            <div className="hi">
              <h2 className='flex items-center'>Hi, {user.name} <img className='ml-2 yr' src={alas} alt="alas" /></h2>
            </div>
            <select name="" id="">
              <option value="">This Week</option>
            </select>
          </div>

          {/* seconnd  */}
          <div className="drSec">

            {/* first  */}
            <div className='siDrSec'>

              <img src={order1} alt="" />
              <h2>Orders In Queve</h2>
              <p>50</p>


            </div>

            {/* second  */}
            <div className='siDrSec'>

              <img src={order2} alt="" />
              <h2>Today Orders</h2>
              <p>{order.length}</p>


            </div>

            {/* third  */}
            <div className='siDrSec'>

              <img src={order3} alt="" />
              <h2>Cancel Orders</h2>
              <p>05</p>


            </div>

            {/* fourth  */}
            <div className='siDrSec'>

              <img src={order4} alt="" />
              <h2>Complete Orders </h2>
              <p>30</p>


            </div>

          </div>


          {/* table  */}
          <div className='tableStart'>

            <div className='tabSec1'>

              {/* left side */}
              <div className='tabS1Lef'>
                <select name="" id="">
                  <option value="">10</option>
                </select>

                <span>Entries per page</span>

              </div>

              {/* right side */}
              <div className='tabS1Rig'>
                <select name="" id="">
                  <option value=""> This Week</option>
                </select>

                <div className='srch'>
                  <img src={search} alt="" />

                  <input onKeyUp={handleSearch} onChange={handleChange} name='query' value={value.query} type="search" placeholder='Search..' />

                </div>

              </div>

            </div>

            <div class="relative overflow-x-auto px-[10px] ">

              <table class="w-full text-sm text-left rtl:text-right text-gray-500  dark:text-gray-400">

                <thead class="text-xs text-gray-700 uppercase  dark:text-gray-400">
                  <tr>
                    <th scope="col" class="px-3 py-3 text-[#060606]">
                      client
                    </th>
                    <th scope="col" class="px-3 py-3 text-[#060606]">
                      Date
                    </th>
                    <th scope="col" class="px-3 py-3 text-[#060606]">
                      Type
                    </th>
                    <th scope="col" class="px-3 py-3 text-[#060606]">
                      iron quality
                    </th>
                    <th scope="col" class="px-3 py-3 text-[#060606]">
                      quantity
                    </th>
                    <th scope="col" class="px-3 py-3 text-[#060606]">
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
                    </th>
                    <th scope="col" class="px-3 py-3 text-[#060606]">
                      weight
                    </th>
                    <th scope="col" class="px-3 py-3 text-[#060606]">
                      Cutting Price
                    </th>
                    <th scope="col" class="px-3 py-3 text-[#060606]">
                      action
                    </th>
                  </tr>
                </thead>

                <tbody>

                  {
                    order.map((item, index) => (
                      <tr key={index} class="bg-white border-b border-[#CED4DA]">

                        <td class="px-3 py-4 text-[#293240] ansDataItem ">
                          {item.client}
                        </td>
                        <td class="px-3 py-4 text-[#293240] ansDataItem">
                          {new Date(item?.Date).getDate()}/{new Date(item?.Date).getMonth() + 1}/{new Date(item?.Date).getFullYear()}
                        </td>
                        <td class="px-3 py-4 text-[#293240] ansDataItem">
                          {item.type}
                        </td>
                        <td class="px-3 py-4 text-[#293240] ansDataItem">
                          {item.ironQuality}
                        </td>
                        <td class="px-3 py-4 text-[#293240] ansDataItem">
                          {item.quantity}
                        </td>
                        <td class="px-3 py-4 text-[#293240] ansDataItem">
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
                        </td>
                        <td class="px-3 py-4 text-[#293240] ansDataItem">
                          {item.Weight}
                        </td>
                        <td class="px-3 py-4 text-[#293240] ansDataItem">
                          {item.CuttingPrice}
                        </td>
                        <td onClick={() => {
                          document.getElementById(`action_box${index}`).classList.toggle('hidden');
                        }} class="px-3 py-4 text-[#293240] ansDataItem">
                          <img src={eye} alt="" />
                          <div id={`action_box${index}`} className='hidden action_box'>
                            <p onClick={() => {
                              navigate(`/createOrder`, { state: { item } })
                            }}>Edit</p>
                            <p onClick={() => {
                              deleteOrders1(item._id)
                            }}>Delete</p>
                            <p onClick={() => {
                              navigate(`/selectRound/${item._id}`)
                            }}>View Details</p>
                          </div>
                        </td>
                      </tr>
                    ))
                  }


                </tbody>
              </table>
              <div style={{ width: 'fit-content', margin: '20px auto' }} className="view_all">
                <button disabled={page === 1} className='focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900' onClick={() => {
                  if (page > 1) {
                    setPage(page - 1);
                  }
                }}>Previous</button>
                <span className='btn222'>Page {page}</span>
                <button disabled={(page * perPage) >= total} className='focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900' onClick={() => {
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
  )
}

export default Dashboard
