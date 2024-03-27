import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useMain } from '../hooks/useMain';
import { useReactToPrint } from 'react-to-print'
import Navbar from '../Common/Navbar';
import Sidebar from '../Common/Sidebar';
function Selectround({ notify }) {
  const { getOrders } = useMain();
  const { id } = useParams();
  const [item, setItem] = useState({});

   const [allQuality , setAllQuality] = useState([]);

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
              <h1>VIEW</h1>
            </div>
            {/* <div className="select-1st-row">
            <div className="select-1st-row-text">
              <h2>Orders Details #{(item?._id)?.slice(0, 5)}</h2>
            </div>
          </div> */}
          <div className='suing'>
            <div className="parties">
                <div className="parties1">
                    <h2>PARTY NAME : <span>{item?.client}</span></h2>
                </div>
                <div className="parties1">
                   <h2>DATE : <span> {new Date(item?.Date).getDate()}/{new Date(item?.Date).getMonth() + 1}/{new Date(item?.Date).getFullYear()}</span></h2>
                </div>
            </div>
            <div ref={contonentPDF} class="relative overflow-x-auto lt  sm:rounded-lg">
              {
                item?.form?.map((val,index)=>{
                  return (
                    <div className='overflow-x-auto mt-4'  key={index}>
                      {
                           val.type === "Round" ? <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                           <thead class="pk lob">
                             <tr>
                               <th scope="col" class="px-10 py-3">
                                 ORDER NO.
                               </th>
                               <th scope="col" class="px-6 py-3">
                                 TYPE
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
                                 APPROX WEIGHT
                               </th>
                               <th scope="col" class="px-6 py-3">
                                 CUTTING PRICE
                               </th>
                             </tr>
                           </thead>
                           <tbody className='pk1'>
                             <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 pk1 ">
                               <td class="px-10 py-3">
                                 {index+1}
                               </td>
                               <td class="px-6 py-3">
                                 {val?.type}
                               </td>
                               <td class="px-6 py-3">
                                 {
                                   val?.Diameter
                                 }
                               </td>
                               <td class="px-6 py-3">
                                 {val?.Length}
                               </td>
                               <td class="px-6 py-3">
                                 {val?.quantity}
                               </td>
                               <td class="px-6 py-3">
                               {Number(val?.Weight).toFixed(2)}
                               </td>
                               <td class="px-6 py-3">
                                 {val?.CuttingPrice}
                               </td>
                             </tr>
                           </tbody>
                         </table>
                         : 
                         <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                         <thead class="pk lob">
                           <tr>
                             <th scope="col" class="px-10 py-3">
                               ORDER NO.
                             </th>
                             <th scope="col" class="px-6 py-3">
                               TYPE
                             </th>
                             <th scope="col" class="px-6 py-3">
                               LENGTH
                             </th>
                             <th scope="col" class="px-6 py-3">
                               QUANTITY
                             </th>
                             <th scope="col" class="px-6 py-3">
                               APPROX WEIGHT
                             </th>
                             <th scope="col" class="px-6 py-3">
                               CUTTING PRICE
                             </th>
                             <th style={{visibility:"hidden"}} scope="col" class="px-6 py-3">
                               CUTTING PRICE
                             </th>
                           </tr>
                         </thead>
                         <tbody className='pk1'>
                           <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 pk1 ">
                             <td class="px-10 py-3">
                               {index+1}
                             </td>
                             <td class="px-6 py-3">
                               {val?.type}
                             </td>
                             <td class="px-6 py-3">
                               {val?.Length}
                             </td>
                             <td class="px-6 py-3">
                               {val?.quantity}
                             </td>
                             <td class="px-6 py-3">
                             {Number(val?.Weight).toFixed(2)}
                             </td>
                             <td class="px-6 py-3">
                               {val?.CuttingPrice}
                             </td>
                             <td style={{visibility:"hidden"}} class="px-6 py-3">
                               {val?.CuttingPrice}
                             </td>
                           </tr>
                         </tbody>
                       </table>
                      }
                   
                </div>
                  )
                })
              }
            
          
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