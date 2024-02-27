import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useMain } from '../hooks/useMain';
import { useReactToPrint } from 'react-to-print'
import "./selectround.css"
import Sidebar from '../Common/Sidebar';
import Navbar from '../Common/Navbar';
function Selectround() {
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
    // getitem();
  }, [id])

  const getitem = async () => {
    let ans = await getOrders(id, '', '', '');
    setItem(ans.data[0]);
  };


  return (
    <div className="selectround-man1">

      <Navbar hideCreateOrder={true} />

      <div className="selectround-main1">

           <Sidebar />

           <div className="selectround-flex1">


   <div className="mainSelectr">

   
   <h2 className='orderDET'>Orders Details</h2>


   <div className='singleOSle'>

<p className='had'>Orders Details #1</p>
  
           <div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left rtl:text-right  ">
        <thead class="text-xs uppercase">
            <tr>
               
                <th scope="col" class="px-6 py-3">
                    Color
                </th>
                <th scope="col" class="px-6 py-3">
                    Category
                </th>
                <th scope="col" class="px-6 py-3">
                    Price
                </th>
                <th scope="col" class="px-6 py-3">
                    Price
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="bg-white border-b  ">
                <th scope="row" class="px-6 py-4">
                    Apple 
                </th>
                <td class="px-6 py-4">
                    Silver
                </td>
                <td class="px-6 py-4">
                    Laptop
                </td>
                <td class="px-6 py-4">
                    $2999
                </td>
            </tr>
        
     
        </tbody>
    </table>
</div>

<div className="selBtn">
  <button className='edit'><span>Edit</span></button>
  <button className='print'><span>Print</span></button>
</div>


</div>

</div>

           </div>

      </div>

    </div>
  )
}

export default Selectround
