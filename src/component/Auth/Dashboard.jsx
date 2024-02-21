import React from 'react'
import "./dashboard.css"
import Navbar from '../../Common/Navbar'
import Sidebar from '../../Common/Sidebar'
import order1 from "../../image/order1.png"
import order2 from "../../image/order2.png"
import order3 from "../../image/order3.png"
import order4 from "../../image/order4.png"
import search from "../../image/search.png"
import eye from "../../image/eye.png"


const ansData = [
  {
    client:"Akash Negi" , 
    date:"18 Feb 2024" ,
    type:"Flat" , 
    iron:"EN31" , 
    quality:"16 piece" , 
    diameter:`~` ,
    length:"42”" , 
     height:"30”" , 
     width:"16”",
     weight:"161 kg" , 
     cutting:"210" , 
     action:eye
  },
  {
    client:"Akash Negi" , 
    date:"18 Feb 2024" ,
    type:"Flat" , 
    iron:"EN31" , 
    quality:"16 piece" , 
    diameter:`~` ,
    length:"42”" , 
     height:"30”" , 
     width:"16”",
     weight:"161 kg" , 
     cutting:"210" , 
     action:eye
  },
  {
    client:"Akash Negi" , 
    date:"18 Feb 2024" ,
    type:"Flat" , 
    iron:"EN31" , 
    quality:"16 piece" , 
    diameter:`~` ,
    length:"42”" , 
     height:"30”" , 
     width:"16”",
     weight:"161 kg" , 
     cutting:"210" , 
     action:eye
  },
  {
    client:"Akash Negi" , 
    date:"18 Feb 2024" ,
    type:"Flat" , 
    iron:"EN31" , 
    quality:"16 piece" , 
    diameter:`~` ,
    length:"42”" , 
     height:"30”" , 
     width:"16”",
     weight:"161 kg" , 
     cutting:"210" , 
     action:eye
  },
]

function Dashboard() {
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

            

<div class="relative overflow-x-auto">
  
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">

        <thead class="text-xs text-gray-700 uppercase  dark:text-gray-400">
            <tr>
                <th scope="col" class="px-3 py-3">
                client
                </th>
                <th scope="col" class="px-3 py-3">
                Date
                </th>
                <th scope="col" class="px-3 py-3">
                Type
                </th>
                <th scope="col" class="px-3 py-3">
                iron quality
                </th>
                <th scope="col" class="px-3 py-3">
                quantity
                </th>
                <th scope="col" class="px-3 py-3">
                diameter
                </th>
                <th scope="col" class="px-3 py-3">
                length
                </th>
                <th scope="col" class="px-3 py-3">
                height
                </th>
                <th scope="col" class="px-3 py-3">
                width
                </th>
                <th scope="col" class="px-3 py-3">
                weight
                </th>
                <th scope="col" class="px-3 py-3">
                Cutting Price
                </th>
                <th scope="col" class="px-3 py-3">
                action
                </th>
            </tr>
        </thead>

        <tbody>
              
              {
                ansData.map((item ,index)=>(
                  <tr key={index} class="bg-white  dark:border-gray-700 border-b border-gray-300">
          
                  <td class="px-3 py-4 ">
                      {item.client}
                  </td>
                  <td class="px-3 py-4">
                      {item.date}
                  </td>
                  <td class="px-3 py-4">
                      {item.type}
                  </td>
                  <td class="px-3 py-4">
                      {item.iron}
                  </td>
                  <td class="px-3 py-4">
                      {item.quality}
                  </td>
                  <td class="px-3 py-4">
                      {item.diameter}
                  </td>
                  <td class="px-3 py-4">
                      {item.length}
                  </td>
                  <td class="px-3 py-4">
                      {item.height}
                  </td>
                  <td class="px-3 py-4">
                      {item.width}
                  </td>
                  <td class="px-3 py-4">
                      {item.weight}
                  </td>
                  <td class="px-3 py-4">
                      {item.cutting}
                  </td>
                  <td class="px-3 py-4">
                      <img src={item.action} alt="" />
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
