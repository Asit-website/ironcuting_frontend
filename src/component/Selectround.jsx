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
  const navigate = useNavigate()
  const contonentPDF = useRef()
  const generatePdf = useReactToPrint({
    content: () => contonentPDF.current,
    documentTitle: "Order",
    onAfterPrint: () => alert("item saved in PDF")
  })

  useEffect(() => {
    getitem();
  }, [id])

  const getitem = async () => {
    let ans = await getOrders(id, '', '', '');
    setItem(ans.data[0]);
  };


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
          <div className="select-1st-row">
            <div className="select-1st-row-text">
              <h2>Orders Details #{(item?._id)?.slice(0, 5)}</h2>
            </div>
          </div>
          <div ref={contonentPDF} class="relative overflow-x-auto lt  sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="pk">
                <tr>
                  <th scope="col" class="px-10 py-3">
                    client
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Type
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" class="px-6 py-3">
                    iron quality
                  </th>
                  <th scope="col" class="px-6 py-3">
                    quantity
                  </th>
                </tr>
              </thead>
              <tbody className='pk1'>
                <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 pk1 ">
                  <td class="px-10 py-3">
                    {item?.client}
                  </td>
                  <td class="px-6 py-3">
                    {item?.type}
                  </td>
                  <td class="px-6 py-3">
                    {new Date(item?.Date).getDate()}/{new Date(item?.Date).getMonth() + 1}/{new Date(item?.Date).getFullYear()}
                  </td>
                  <td class="px-6 py-3">
                    {item?.ironQuality}
                  </td>
                  <td class="px-6 py-3">
                    {item?.quantity}
                  </td>
                </tr>
              </tbody>
            </table>
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="pk">
                <tr>
                  <th scope="col" class="px-10 py-3">
                    length
                  </th>
                  <th scope="col" class="px-6 py-3">
                    height
                  </th>
                  <th scope="col" class="px-6 py-3">
                    width
                  </th>
                  <th scope="col" class="px-6 py-3">
                    weight
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Cutting Price
                  </th>
                </tr>
              </thead>
              <tbody className='pk1'>
                <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 pk1 ">
                  <td class="px-10 py-3">
                    {item?.Length}
                  </td>
                  <td class="px-6 py-3">
                    {item?.Height}
                  </td>
                  <td class="px-6 py-3">
                    {item?.Width}
                  </td>
                  <td class="px-6 py-3">
                    {item?.Weight}
                  </td>
                  <td class="px-6 py-3">
                    {item?.CuttingPrice}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
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