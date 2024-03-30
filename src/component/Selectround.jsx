import React, { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useMain } from '../hooks/useMain';
import { useReactToPrint } from 'react-to-print'
import Navbar from '../Common/Navbar';
import Sidebar from '../Common/Sidebar';
function Selectround({ notify }) {
  const { getOrders } = useMain();
  const { id } = useParams();
  const [item, setItem] = useState({});

  const location = useLocation();
  const product = location?.state?.item;

  const [allQuality, setAllQuality] = useState([]);

  const navigate = useNavigate()
  const contonentPDF = useRef()
  const generatePdf = useReactToPrint({
    content: () => contonentPDF.current,
    documentTitle: "Order",
    parentContainer: {
      '@media print': {
        display: 'block'
      },
    },
    onAfterPrint: () => notify("success", "item saved")
  })



  const getitem = async () => {
    let ans = await getOrders(id, '', '', '');
    setItem(ans.data[0]);

    const uniqueQualities = new Set();

    ans?.data[0]?.form?.forEach(obj => {
      const ironQuality = obj.ironQuality;
      if (!uniqueQualities.has(ironQuality)) {
        uniqueQualities.add(ironQuality);
      }
    });

    setAllQuality(Array.from(uniqueQualities));

  };


  useEffect(() => {
    getitem();
  }, [id])

  //   {item?.form?.filter(x => x.ironQuality !== item.quantity)?.map((val, index) => {
  //     let s = val?.ironQuality
  //     console.log(s);
  //   return (

  //     <>
  //       <div key={index}>
  //         {s.split(',')}
  //       </div>
  //     </>
  //   )
  // })}



  return (
    <div className='dashWrap'>

      <Navbar />

      <div className="dashCont">

        <Sidebar notify={notify} />

        {/* right side */}
        <div className="dashRight">

          <div className="cli1">
            <div className="row-section-heading">
              <h1>Orders Details</h1>
            </div>
            {/* <div className="select-1st-row">
            <div className="select-1st-row-text">
              <h2>Orders Details #{(item?._id)?.slice(0, 5)}</h2>
            </div>
          </div> */}
            <div className='sara11' ref={contonentPDF}>

              <div className="party_name">
                <div className="party1">
                  <h2><span>PARTY NAME : </span> {item?.client}</h2>
                </div>
                <div className="party1">
                  <h2><span>ORDER NO : </span>{(item._id)?.slice(22,24)}</h2>
                </div>
                <div className="party1">
                  <h2><span>DATE : </span> {new Date(item?.Date).getDate()}/{new Date(item?.Date).getMonth() + 1}/{new Date(item?.Date).getFullYear()}</h2>
                </div>
              </div>
              <div  class="relative overflow-x-auto lt sing  sm:rounded-lg">


                <div className='overflow-x-auto'>
                  <table class="w-full  sall1 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="pk pko">
                      <tr>
                        {/* <th scope="col" class="px-10 py-3">
                            ORDER NO.
                          </th> */}
                        <th scope="col" class="px-6 py-3">
                          IRON QUALITY
                        </th>
                        <th scope="col" class="px-6 py-3">
                          TYPE
                        </th>
                        <th scope="col" class="px-6 py-3">
                          SIZE
                        </th>
                        <th scope="col" class="px-6 py-3">
                          QUANTITY
                        </th>
                      </tr>
                    </thead>
                    <tbody className='pk1 polor'>
                      {
                        item?.form?.map((val, index) => {
                          return (
                            <tr style={{ background: "white" }} key={index} class="odd:bg-white  odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 pk1 ">
                              {/* <td class="px-10 py-3">
                                #{index+1}
                              </td> */}
                              <td class="px-6 py-3">
                                {val?.ironQuality}
                              </td>
                              <td class="px-6 py-3">
                                {/* {new Date(item?.Date).getDate()}/{new Date(item?.Date).getMonth() + 1}/{new Date(item?.Date).getFullYear()} */}
                                {val?.type}
                              </td>
                              <td class="px-6 py-3">
                                {val.type === "Flat" ? `${(val?.Height)} X ${(val?.Width)} X ${(val?.Length)} ` : `${(val?.Diameter)} Ø  X ${(val?.Length)}`}
                              </td>
                              <td class="px-6 py-3 sitsd">
                                {val?.quantity}
                              </td>
                            </tr>
                          )
                        })
                      }

                    </tbody>
                  </table>

                  {/* <table class="w-full sall2 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <thead class="pk pko">
                        <tr>
                          <th  scope="col" class="px-10 py-3 lpo">
                          APPROX WEIGHT
                          </th>
                          <th scope="col" class="px-6 py-3">
                          CUTTING PRICE
                          </th>
                        
                         
                        </tr>
                      </thead>
                      <tbody className='pk1'>
                        <tr class="odd:bg-white soik odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 pk1 ">
                         
                          <td class="px-10 py-3">
                            {val?.Weight}KG
                          </td>
                          <td class="px-6 py-3">
                            {val?.CuttingPrice}
                          </td>
                        
                        </tr>
                        <div className='lokiu'></div>
                      </tbody>
                    </table> */}
                </div>

                {/* // <div className='sent1'>
                    // <table class="w-full sall1 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    //   <thead class="pk pko">
                    //     <tr>
                    //       <th scope="col" class="px-10 py-3">
                    //         ORDER NO.
                    //       </th>
                    //       <th scope="col" class="px-6 py-3">
                    //         TYPE
                    //       </th>
                         
                    //       <th scope="col" class="px-6 py-3">
                    //         LENGTH
                    //       </th>
                    //       <th scope="col" class="px-6 py-3">
                    //         QUANTITY
                    //       </th>
                    //     </tr>
                    //   </thead>
                    //   <tbody className='pk1'>
                    //     <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 pk1 ">
                    //       <td class="px-10 py-3">
                    //         #{index+1}
                    //       </td>
                    //       <td class="px-6 py-3">
                    //         {val?.type}
                    //       </td>
                       
                    //       <td class="px-6 py-3">
                    //         {val?.Length}
                    //       </td>
                    //       <td class="px-6 py-3">
                    //         {val?.quantity}
                    //       </td>
                    //     </tr>
                    //   </tbody>
                    // </table>
                    // <table class="w-full sall2 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    //   <thead class="pk pko">
                    //     <tr>
                    //       <th  scope="col" class="px-10 py-3 lpo">
                    //       APPROX WEIGHT
                    //       </th>
                    //       <th scope="col" class="px-6 py-3">
                    //       CUTTING PRICE
                    //       </th>
                       
                         
                    //     </tr>
                    //   </thead>
                    //   <tbody className='pk1'>
                    //     <tr class="odd:bg-white soik odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 pk1 ">
                    //       <td class="px-10 py-3">
                    //         {val?.Weight}KG
                    //       </td>
                    //       <td class="px-6 py-3">
                    //         {val?.CuttingPrice}
                    //       </td>
                         
                    //     </tr>

                    //     <div className='lokiu'></div>
                    //   </tbody>
                    // </table>
                    // </div> */}





                <div class="relative overflow-x-auto">
                  <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr className='ooo'>
                        <th scope="col" class="px-6 py-3">
                          APPROX WEIGHT
                        </th>
                        <th scope="col" class="px-6 py-3 sonm">
                          CUTTING PRICE
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 oo1">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {Number(item.Weight).toFixed(2)}KG
                        </th>
                        <td class="px-6 py-4 sonm">
                          {item?.CuttingPrice}
                        </td>
                      </tr>

                    </tbody>
                  </table>
                </div>


              </div>
            </div>
            {/* <div className="ordery">
              
              <div ref={contonentPDF} className="order_de">
                {
                  item?.form?.map((val,index)=>{
                    return (
                      <div className='hinh' key={index}>
                      <div className="order_head">
                        <h2>Orders Details #{(val?._id)?.slice(0, 4)}</h2>
                      </div>
                      <div className="order_head1">
                        <div className="party1">
                          <p>Party Name: <span>{val?.client}</span></p>
                        </div>
                        <div className="party2">
                          <p>Date: <span> {new Date(item?.Date).getDate()}/{new Date(item?.Date).getMonth() + 1}/{new Date(item?.Date).getFullYear()}</span></p>
                        </div>
                      </div>
                      <div className="order_body">
                        <div className="typed">
                          <p>Quality: <span className='sites'>{val?.ironQuality}</span></p>
                        </div>
                        <div className="typed1">
                          <p>Size: <span>100x25x1005-1pc</span></p>
                        </div>
                        <div className="typed2">
                          <p>Quantity: <span>{val?.quantity}</span></p>
                        </div>
                      </div>
                      <div className="order_footer">
                        <div className="order_footer1">
                          <p>Cutting price total: <span>{val?.CuttingPrice}</span></p>
                        </div>
                        <div className="order_footer2">
                          <p>Approx Weight: <span>{val?.Weight}Kg</span></p>
                        </div>
                      </div>
                      </div>
                    )
                  })
                }
               
                </div>

              </div> */}
            <div className="select-row-btn">
              <div className="select-row-btn-flex">
                <button onClick={() => {
                  navigate(`/createOrder`, { state: { item } })
                }} type="button" id="edit">Edit</button>
                <button onClick={generatePdf} type="button" id="print">Print</button>
              </div>
            </div>
          </div>

        </div>


      </div>


    </div>






  )
}

export default Selectround