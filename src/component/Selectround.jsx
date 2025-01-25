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

  const [item1,setItem1] = useState({});

  const location = useLocation();
  const product = location?.state?.item;

  const orderNumber = location?.state?.orderNumber;

  console.log("produtc ", orderNumber);

  const [allQuality, setAllQuality] = useState([]);

  const navigate = useNavigate()
  const contonentPDF = useRef()
  const contonentPDF1 = useRef()
  const generatePdf = useReactToPrint({
    content: () => contonentPDF.current,
    documentTitle: "Order",
    parentContainer: {
      '@media print': {
        display: 'block',
      },
    },
    onAfterPrint: () => notify("success", "item saved")
    
  })

  const generatePdf1 = useReactToPrint({
    content: () => contonentPDF1.current,
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
    console.log(ans)
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


  const [selectedItems, setSelectedItems] = useState([]);
  const [splitItems, setSplitItems] = useState([]);
  const [splitTriggered, setSplitTriggered] = useState(false);

  const handleCheckboxChange = (item) => {
    setSelectedItems((prevSelected) => {
      if (prevSelected.includes(item)) {
        return prevSelected.filter((selected) => selected !== item);
      } else {
        return [...prevSelected, item];
      }
    });
  };

  const handleSplit = () => {
    setSplitItems(selectedItems);
    setSplitTriggered(true);
  };

  console.log(splitItems);

  const totalSplitPrice = splitItems?.map((price) => price.CuttingPrice)?.reduce((acc,curr) => acc + curr,0);
  console.log("total",totalSplitPrice);

  const totalSplitWeight = splitItems?.map((weight) => weight.Weight)?.reduce((acc,curr)=> acc + curr,0);
  console.log(totalSplitWeight);

  // const unselectedItems = item.filter(
  //   (item) =>
  //     !selectedItems.some(
  //       (selected) =>
  //         selected.ironQuality === item.ironQuality &&
  //         selected.size === item.size &&
  //         selected.quantity === item.quantity
  //     )
  // );

  // console.log("unselected",unselectedItems);


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
                  <h2><span>ORDER NO : </span>{orderNumber}</h2>
                </div>
                <div className="party1">
                  <h2><span>DATE : </span> {new Date(item?.Date).getDate()}/{new Date(item?.Date).getMonth() + 1}/{new Date(item?.Date).getFullYear()}</h2>
                </div>
              </div>
              <div class="relative overflow-x-auto lt sing  sm:rounded-lg">


                <div className='overflow-x-auto'>
                  <table class="w-full  sall1 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="pk pko">
                      <tr>
                        {/* <th scope="col" class="px-10 py-3">
                            ORDER NO.
                          </th> */}
                        <th  scope="col" class="px-6 py-3 sizied quat selected_print">
                          SELECT
                        </th>
                        <th scope="col" class="px-6 py-3 sizied quat">
                          IRON QUALITY
                        </th>
                        {/* <th scope="col" class="px-6 py-3">
                          TYPE
                        </th> */}
                        <th scope="col" class="px-6 py-3 sizied quat1">
                          SIZE
                        </th>
                        <th scope="col" class="px-6 py-3 sizied quat">
                          QUANTITY
                        </th>
                        <th scope="col" class="px-6 py-3 sizied quat">
                          WEIGHT
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
                              <td  className='selected_print'>
                                <input
                                  type="checkbox"
                                  onChange={() => handleCheckboxChange(val)}
                                  checked={selectedItems.some(
                                    (selected) =>
                                      selected.ironQuality === val.ironQuality &&
                                      selected.size === val.size &&
                                      selected.quantity === val.quantity &&
                                      selected.Weight === val.Weight
                                  )}
                                  
                                />
                              </td>
                              <td class="px-6 py-3 sizied1">
                                {val?.ironQuality}
                              </td>
                              {/* <td class="px-6 py-3">
                                
                                {val?.type}
                              </td> */}
                              <td class="px-6 py-3 sizied1">
                                {val.type === "Flat" ? `${(val?.Height)} X ${(val?.Width)} X ${(val?.Length)} ` : `${(val?.Diameter)} Ø  X ${(val?.Length)}`}
                              </td>
                              <td class="px-6 py-3 sitsd sizied1">
                                {val?.quantity}
                              </td>
                              <td class="px-6 py-3 sizied1">

                              </td>
                            </tr>
                          )
                        })
                      }

                    </tbody>
                  </table>

                  {/* ============dusra----------------- */}


                </div>






                <div class="relative overflow-x-auto olol opming">
                  <table class="w-full soko text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      {/* <tr className='ooo'>
                        <th scope="col" class="px-6 py-3">
                          APPROX WEIGHT
                        </th>
                        <th scope="col" class="px-6 py-3 sonm">
                          CUTTING PRICE
                        </th>
                      </tr> */}
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

            <div className="select-row-btn">
              <div className="select-row-btn-flex">
                <button onClick={() => {
                  navigate(`/createOrder`, { state: { item } })
                }} type="button" id="edit">Edit</button>
                <button onClick={generatePdf} type="button" id="print">Print</button>
                <button
              onClick={handleSplit}
              style={{
               
                padding: "10px 20px",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Split
            </button>
              </div>
            </div>



          

            {splitItems.length > 0 && (
              <>
              <div style={{marginTop:"30px"}} ref={contonentPDF1} className='sara11 mt-2'>
                <div className="party_name">
                  <div className="party1">
                    <h2><span>PARTY NAME : </span> {item?.client}</h2>
                  </div>
                  <div className="party1">
                    <h2><span>ORDER NO : </span>{orderNumber}</h2>
                  </div>
                  <div className="party1">
                    <h2><span>DATE : </span> {new Date(item?.Date).getDate()}/{new Date(item?.Date).getMonth() + 1}/{new Date(item?.Date).getFullYear()}</h2>
                  </div>
                </div>
                <div class="relative overflow-x-auto lt sing  sm:rounded-lg">


                  <div className='overflow-x-auto'>
                    <table class="w-full  sall1 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <thead class="pk pko">
                        <tr>
                          {/* <th scope="col" class="px-10 py-3">
            ORDER NO.
          </th> */}

                          <th scope="col" class="px-6 py-3 sizied quat">
                            IRON QUALITY
                          </th>
                          {/* <th scope="col" class="px-6 py-3">
          TYPE
        </th> */}
                          <th scope="col" class="px-6 py-3 sizied quat1">
                            SIZE
                          </th>
                          <th scope="col" class="px-6 py-3 sizied quat">
                            QUANTITY
                          </th>
                          <th scope="col" class="px-6 py-3 sizied quat">
                            WEIGHT
                          </th>
                        </tr>
                      </thead>
                      <tbody className='pk1 polor'>
                        {
                          splitItems?.map((val, index) => {
                            return (
                              <tr style={{ background: "white" }} key={index} class="odd:bg-white  odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 pk1 ">
                                {/* <td class="px-10 py-3">
                #{index+1}
              </td> */}

                                <td class="px-6 py-3 sizied1">
                                  {val?.ironQuality}
                                </td>
                                {/* <td class="px-6 py-3">
                
                {val?.type}
              </td> */}
                                <td class="px-6 py-3 sizied1">
                                  {val.type === "Flat" ? `${(val?.Height)} X ${(val?.Width)} X ${(val?.Length)} ` : `${(val?.Diameter)} Ø  X ${(val?.Length)}`}
                                </td>
                                <td class="px-6 py-3 sitsd sizied1">
                                  {val?.quantity}
                                </td>
                                <td class="px-6 py-3 sizied1">

                                </td>
                              </tr>
                            )
                          })
                        }

                      </tbody>
                    </table>

                    {/* ============dusra----------------- */}


                  </div>






                  <div class="relative overflow-x-auto olol opming">
                    <table class="w-full soko text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        {/* <tr className='ooo'>
        <th scope="col" class="px-6 py-3">
          APPROX WEIGHT
        </th>
        <th scope="col" class="px-6 py-3 sonm">
          CUTTING PRICE
        </th>
      </tr> */}
                      </thead>
                      <tbody>
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 oo1">
                          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {Number(totalSplitWeight).toFixed(2)}KG
                          </th>
                          <td class="px-6 py-4 sonm">
                            {totalSplitPrice}
                          </td>
                        </tr>

                      </tbody>
                    </table>
                  </div>





                </div>

               
              </div>
               <div className="select-row-btn">
               <div className="select-row-btn-flex">
                 <button onClick={generatePdf1} type="button" id="print">Print</button>
               </div>
             </div>
             </>
            )}



          </div>

        </div>


      </div>


    </div>






  )
}

export default Selectround