import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useMain } from '../hooks/useMain';
import { useReactToPrint } from 'react-to-print'
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
    getitem();
  }, [id])

  const getitem = async () => {
    let ans = await getOrders(id, '', '', '');
    setItem(ans.data[0]);
  };


  return (
    <div className="selectround-man">
      <div className="selectround-main">
        <div className="selectround-flex">
          <>
            <button
              item-drawer-target="sidebar-multi-level-sidebar"
              item-drawer-toggle="sidebar-multi-level-sidebar"
              aria-controls="sidebar-multi-level-sidebar"
              type="button"
              className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
              <span className="sr-only">Open sidebar</span><svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z" />
              </svg>
            </button>
            <aside
              id="sidebar-multi-level-sidebar"
              className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
              aria-label="Sidebar">
              <div className="h-full px-4 py-4 overflow-y-auto dark:bg-gray-800">
                <ul className="space-y-2 font-medium">
                  <li>
                    <a
                      href="#"
                      className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                    >
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 10H8V0H0V10ZM0 18H8V12H0V18ZM10 18H18V8H10V18ZM10 0V6H18V0H10Z" fill="#464E59" />
                      </svg>
                      <div id="select-dash"><span className="ms-3">Dashboard</span>
                        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10.59 0.294998L6 4.875L1.41 0.294998L0 1.705L6 7.705L12 1.705L10.59 0.294998Z" fill="#7E8299" />
                        </svg>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                    >
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="4" cy="4" r="3.625" fill="white" stroke="#464E59" stroke-width="0.75" />
                      </svg>
                      <span className="flex-1 ms-3 whitespace-nowrap">Order</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                    >
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="4" cy="4" r="3.625" fill="white" stroke="#464E59" stroke-width="0.75" />
                      </svg>
                      <span className="flex-1 ms-3 whitespace-nowrap">Billing</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_49_1673)">
                          <path d="M10.931 2.74992C10.7164 1.96019 10.2478 1.26303 9.59767 0.765992C8.94752 0.268955 8.15188 -0.000335693 7.3335 -0.000335693C6.51512 -0.000335693 5.71948 0.268955 5.06933 0.765992C4.41917 1.26303 3.95064 1.96019 3.736 2.74992H0V4.74992H3.736C3.95064 5.53965 4.41917 6.23682 5.06933 6.73385C5.71948 7.23089 6.51512 7.50018 7.3335 7.50018C8.15188 7.50018 8.94752 7.23089 9.59767 6.73385C10.2478 6.23682 10.7164 5.53965 10.931 4.74992H24V2.74992H10.931ZM7.333 5.49992C6.98688 5.49992 6.64854 5.39729 6.36075 5.205C6.07297 5.0127 5.84866 4.73939 5.71621 4.41962C5.58376 4.09985 5.5491 3.74798 5.61663 3.40852C5.68415 3.06905 5.85082 2.75723 6.09556 2.51249C6.3403 2.26774 6.65213 2.10107 6.99159 2.03355C7.33106 1.96602 7.68293 2.00068 8.0027 2.13313C8.32247 2.26559 8.59578 2.48989 8.78807 2.77768C8.98036 3.06546 9.083 3.40381 9.083 3.74992C9.08221 4.21381 8.89758 4.65847 8.56956 4.98648C8.24154 5.3145 7.79689 5.49913 7.333 5.49992Z" fill="#464E59" />
                          <path d="M16.667 8.25C15.8495 8.25293 15.0553 8.5233 14.4058 9.01985C13.7564 9.51639 13.2872 10.2118 13.07 11H0V13H13.07C13.2843 13.7899 13.7526 14.4873 14.4027 14.9846C15.0528 15.4818 15.8485 15.7512 16.667 15.7512C17.4855 15.7512 18.2812 15.4818 18.9313 14.9846C19.5814 14.4873 20.0497 13.7899 20.264 13H24V11H20.264C20.0468 10.2118 19.5776 9.51639 18.9282 9.01985C18.2787 8.5233 17.4845 8.25293 16.667 8.25ZM16.667 13.75C16.3209 13.75 15.9825 13.6474 15.6948 13.4551C15.407 13.2628 15.1827 12.9895 15.0502 12.6697C14.9178 12.3499 14.8831 11.9981 14.9506 11.6586C15.0181 11.3191 15.1848 11.0073 15.4296 10.7626C15.6743 10.5178 15.9861 10.3512 16.3256 10.2836C16.6651 10.2161 17.0169 10.2508 17.3367 10.3832C17.6565 10.5157 17.9298 10.74 18.1221 11.0278C18.3144 11.3155 18.417 11.6539 18.417 12C18.4165 12.464 18.2319 12.9088 17.9039 13.2369C17.5758 13.5649 17.131 13.7495 16.667 13.75Z" fill="#464E59" />
                          <path d="M7.333 16.5C6.51494 16.5023 5.72013 16.7723 5.07004 17.2689C4.41995 17.7655 3.95035 18.4613 3.733 19.25H0V21.25H3.736C3.95064 22.0397 4.41917 22.7369 5.06933 23.2339C5.71948 23.731 6.51512 24.0003 7.3335 24.0003C8.15188 24.0003 8.94752 23.731 9.59767 23.2339C10.2478 22.7369 10.7164 22.0397 10.931 21.25H24V19.25H10.931C10.7137 18.4617 10.2444 17.7661 9.59476 17.2695C8.94507 16.773 8.15072 16.5027 7.333 16.5ZM7.333 22C6.98688 22 6.64854 21.8974 6.36075 21.7051C6.07297 21.5128 5.84866 21.2395 5.71621 20.9197C5.58376 20.5999 5.5491 20.2481 5.61663 19.9086C5.68415 19.5691 5.85082 19.2573 6.09556 19.0126C6.3403 18.7678 6.65213 18.6011 6.99159 18.5336C7.33106 18.4661 7.68293 18.5008 8.0027 18.6332C8.32247 18.7657 8.59578 18.99 8.78807 19.2778C8.98036 19.5655 9.083 19.9039 9.083 20.25C9.08221 20.7139 8.89758 21.1585 8.56956 21.4866C8.24154 21.8146 7.79689 21.9992 7.333 22Z" fill="#464E59" />
                        </g>
                        <defs>
                          <clipPath id="clip0_49_1673">
                            <rect width="24" height="24" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                      <span className="flex-1 ms-3 whitespace-nowrap">System Setting</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24 12.0059C24.0012 13.5857 23.6902 15.1502 23.0849 16.6094C22.4796 18.0686 21.592 19.3938 20.473 20.5087C19.3536 21.6237 18.0248 22.5064 16.5632 23.1059C15.1015 23.7054 13.5357 24.0098 11.956 24.0018C10.3798 23.9979 8.81976 23.683 7.36532 23.0752C5.91089 22.4674 4.59058 21.5786 3.48 20.4596C2.3696 19.3408 1.49066 18.014 0.893518 16.5549C0.296374 15.0959 -0.00725566 13.5334 5.13856e-06 11.9569C0.00953911 8.78066 1.27844 5.738 3.52822 3.49668C5.778 1.25536 8.82483 -0.00149658 12 0.00196237C13.5761 3.87523e-06 15.1372 0.30912 16.5937 0.911623C18.0502 1.51413 19.3736 2.39817 20.488 3.51311C21.6025 4.62809 22.4862 5.95209 23.0883 7.40926C23.6904 8.86643 23.9992 10.4281 23.997 12.0049L24 12.0059ZM15.448 5.60379C15.448 6.22199 15.437 6.82218 15.457 7.42138C15.4832 7.55481 15.5558 7.67462 15.662 7.75949C16.2903 8.303 16.7888 8.98058 17.1208 9.7423C17.4527 10.504 17.6096 11.3305 17.58 12.1609C17.555 13.0161 17.3341 13.8541 16.9342 14.6104C16.5342 15.3666 15.966 16.0209 15.2733 16.5227C14.5806 17.0246 13.782 17.3605 12.939 17.5048C12.0959 17.649 11.231 17.5976 10.411 17.3546C9.44003 17.0916 8.56252 16.5609 7.87859 15.8229C7.19466 15.085 6.73187 14.1696 6.543 13.1813C6.30905 12.2101 6.34833 11.1931 6.65649 10.2429C6.96465 9.29269 7.52968 8.44633 8.28901 7.79751C8.38901 7.70648 8.531 7.59043 8.536 7.4814C8.56 6.85919 8.54701 6.236 8.54701 5.58078C7.14307 6.31916 6.0199 7.49767 5.34962 8.9357C4.67933 10.3737 4.49891 11.992 4.836 13.5424C5.18658 15.2019 6.10601 16.6866 7.43523 17.7397C8.76445 18.7928 10.4198 19.348 12.115 19.3093C13.8387 19.2879 15.4994 18.6581 16.8039 17.531C18.1085 16.4039 18.9731 14.852 19.245 13.1493C19.4834 11.6527 19.2456 10.119 18.5652 8.76495C17.8847 7.41093 16.796 6.3051 15.453 5.60379H15.448ZM12.826 9.20497V3.69116H11.177V9.20497H12.826Z" fill="#464E59" />
                      </svg>
                      <span className="flex-1 ms-3 whitespace-nowrap">Logout</span>
                    </a>
                  </li>
                </ul>
              </div>
            </aside>
            <div className="p-4 sm:ml-64 table-section">
              <div className="row-section-heading">
                <h1>Orders Details</h1>
              </div>
              <div className="select-1st-row">
                <div className="select-1st-row-text">
                  <h2>Orders Details#1</h2>
                </div>
              </div>
              <div ref={contonentPDF} class="relative overflow-x-auto  sm:rounded-lg">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                  <tbody>
                    <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 ">
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
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                  <tbody>
                    <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 ">
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
          </>
        </div>
      </div>
    </div>
  )
}

export default Selectround
