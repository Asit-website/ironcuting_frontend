import React, { useEffect, useState } from 'react'
import DataTable from 'datatables.net-dt';
import { useMain } from '../hooks/useMain';
const Table = () => {
    const [order, setOrder] = useState([]);
    const { getOrders } = useMain();
    
    let table = new DataTable('#myTable', {
        // config options...
        responsive: true
    });

    useEffect(() => {
        getData();
    }, [])

   

    const getData = async () => {
        const ans = await getOrders("", "", "", "");
        setOrder(ans?.data);
    }

    return (
        <table   class="display">
            <thead>
                <tr>
                    <th>Column 1</th>
                    <th>Column 2</th>
                </tr>
            </thead>
            <tbody>
                {
                    order?.map((val, index) => {
                        <>
                            <tr key={index}>
                                <td><p>{val?.client}</p></td>
                                <td><p>{val?.ironQuality}</p></td>

                            </tr>
                            
                        </>
                    })
                }


            </tbody>
        </table>
    )
}

export default Table
