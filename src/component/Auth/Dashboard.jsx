import React, { useEffect, useState } from 'react'
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


function Dashboard() {
  const {getOrders} = useMain();
  const [order,setOrder] = useState([]);
  useEffect(()=>{
      getData();
  },[]);

  const getData = async () =>{
    const ans = await getOrders("","","","");
    setOrder(ans?.data);
    console.log(ans?.data)
  }

  console.log("order" , order);
    return (
    
  <div className='dashWrap'>

    <Navbar />

     <div className="dashCont">
        
        <Sidebar />

        {/* right side */}
        <div className="dashRight">

          {/* first  */}
          <div className='dRFirs'>
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
            <p>15</p>


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
    <input type="text" placeholder='Search..' />
    
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
                order.map((item ,index)=>(
                  <tr key={index} class="bg-white border-b border-[#CED4DA]">
          
                  <td class="px-3 py-4 text-[#293240] ansDataItem ">
                      {item.client}
                  </td>
                  <td class="px-3 py-4 text-[#293240] ansDataItem">
                  {new Date(item?.Date).getDate()}/{new Date(item?.Date).getMonth()+1}/{new Date(item?.Date).getFullYear()}
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
                  <td class="px-3 py-4 text-[#293240] ansDataItem">
                      <img src={eye} alt="" />
                  </td>
              </tr>
                ))
              }
               
       
        </tbody>
    </table>

</div>


          </div>
          

        </div>
        

     </div>
     

  </div>
  )
}

export default Dashboard
