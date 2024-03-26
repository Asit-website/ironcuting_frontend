import React, { useState } from "react";
import MainContext from "./MainContext";

const baseUrl = 'http://localhost:5000';
// const baseUrl = 'https://ironcut-backend.onrender.com';

const MainState = (props) => {

  const [user, setUser] = useState({})

  const login = async ({ email, password }) => {
    const resp = await fetch(`${baseUrl}/user/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    const data = await resp.json();
    // setUser(data);
    return data;
  };

  const getAllType = async () => {
    const token = localStorage.getItem('iron_token');
    const resp = await fetch(`${baseUrl}/type/getAllType`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await resp.json();
    return data;
  }

  const createType = async ({ Name }) => {

    const token = localStorage.getItem('iron_token');

    const resp = await fetch(`${baseUrl}/type/createType`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
      , body: JSON.stringify({ Name })
    });
    const data = await resp.json();
    return data;
  }

  const DeleteType = async ({ id }) => {
    const token = localStorage.getItem('iron_token');

    const resp = await fetch(`${baseUrl}/type/deleteType/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await resp.json();
    return data;
  }

  const updateType = async ({ id, Name }) => {

    const token = localStorage.getItem('iron_token');

    const data = {
       Name
    };


    try {
      const resp = await fetch(`${baseUrl}/type/updateType/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      if (!resp.ok) {
        throw new Error('Network response was not ok');
      }

      return await resp.json();
    } catch (error) {
      console.error('There was an error!', error);
      throw error;
    }

  }

  const fetchIronQuality = async () => {
    const token = localStorage.getItem('iron_token');
    const resp = await fetch(`${baseUrl}/quality/getAllQuality`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await resp.json();
    return data;
  }

  const createQuality = async ({ Name , CuttingPrice }) => {

    const token = localStorage.getItem('iron_token');

    const resp = await fetch(`${baseUrl}/quality/createQuality`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
      , body: JSON.stringify({ Name , CuttingPrice })
    });
    const data = await resp.json();
    return data;
  }

  const deleteQuality = async ({ id }) => {
    const token = localStorage.getItem('iron_token');

    const resp = await fetch(`${baseUrl}/quality/deleteQuality/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await resp.json();
    return data;
  }

  const updateQuality = async ({ id, Name,CuttingPrice }) => {

    const token = localStorage.getItem('iron_token');

    const data = {
       Name,
       CuttingPrice
    };


    try {
      const resp = await fetch(`${baseUrl}/quality/updateQuality/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      if (!resp.ok) {
        throw new Error('Network response was not ok');
      }

      return await resp.json();
    } catch (error) {
      console.error('There was an error!', error);
      throw error;
    }

  }



  const getRoundCuttingPrice = async ({ type, Diameter, quantity , ironQuality }) => {


    const token = localStorage.getItem('iron_token');

    const resp = await fetch(`${baseUrl}/order/getCuttingPrice`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        type, Diameter, quantity , ironQuality
      })
    });
    const data = await resp.json();
    return data;
  }

  const getRoundWeight = async ({type, Length,Diameter}) =>{
    const token = localStorage.getItem('iron_token');
    const resp = await fetch(`${baseUrl}/order/getWeight`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        type, Length ,Diameter
      })
    });
    const data = await resp.json();
    return data;
  }

  const getFlatWeight = async ({type, Length,Height,Width}) =>{
    const token = localStorage.getItem('iron_token');
    const resp = await fetch(`${baseUrl}/order/getWeight`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        type, Length ,Height, Width
      })
    });
    const data = await resp.json();
    return data;
  }

  const getFlatIronCutting = async ({ type, Height, Width, quantity , ironQuality }) => {


    const token = localStorage.getItem('iron_token');

    const resp = await fetch(`${baseUrl}/order/getCuttingPrice`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        type, Height, Width, quantity , ironQuality
      })
    });
    const data = await resp.json();
    return data;
  }

  const getOrders = async (id, query, page, perPage) => {
    const resp = await fetch(`${baseUrl}/order/getOrders?id=${id}&query=${query}&page=${page}&perPage=${perPage}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'token': localStorage.getItem('iron_token')
      }
    });
    const data = await resp.json();
    return data;
  };

  const createIronOrder = async (formdata) => {
  
    const token = localStorage.getItem('iron_token');

    console.log("form ",formdata);

    const resp = await fetch(`${baseUrl}/order/createOrder`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        formdata
      })
    });

    const data = await resp.json();
    console.log("data",data);
    return data;
  }

  const createIronOrder2 = async (formdata , id) => {
  
    const token = localStorage.getItem('iron_token');

    const resp = await fetch(`${baseUrl}/order/createOrder/${id}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        formdata
      })
    });

    const data = await resp.json();
    console.log("data",data);
    return data;
  }
  const updateOrders = async (formdata , orderId) => {

console.log("update form ",formdata);

    try {
      const resp = await fetch(`${baseUrl}/order/updateOrders/${orderId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': localStorage.getItem('iron_token')
        },
        body: JSON.stringify({
          formdata
        })
      });

      if (!resp.ok) {
        throw new Error('Network response was not ok');
      }

      return await resp.json();
    } catch (error) {
      console.error('There was an error!', error);
      throw error;
    }

  }

  const deleteOrders = async (id) => {

    const user = JSON.parse(localStorage.getItem("iron_user"));

    const {_id} = user;

    const resp = await fetch(`${baseUrl}/order/deleteOrders/${id}/${_id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      }
    });
    const data = await resp.json();
    return data;
  };

  const sendOtp = async ({ email }) => {
    const resp = await fetch(`${baseUrl}/user/sendOtp`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'token': localStorage.getItem('iron_token')
      },
      body: JSON.stringify({ email })
    });
    const data = await resp.json();
    // console.log(data);
    return data;
  };

  const submitOtp = async ({ otp, otp1 }) => {
    const resp = await fetch(`${baseUrl}/user/submitOtp`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'token': localStorage.getItem('iron_token')
      },
      body: JSON.stringify({ otp, otp1 })
    });
    const data = await resp.json();
    return data;
  };

  const changePassword = async ({ email, password }) => {
    const resp = await fetch(`${baseUrl}/user/changePassword`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'token': localStorage.getItem('iron_token')
      },
      body: JSON.stringify({ email, password })
    });
    const data = await resp.json();
    return data;
  };

  const resetPassword = async ({ userId, password }) => {
    const resp = await fetch(`${baseUrl}/user/resetPassword/${userId}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        'token': localStorage.getItem('iron_token')
      },
      body: JSON.stringify({ password })
    });
    const data = await resp.json();
    return data;
  };

  const resp1 = async ({id,link}) =>{
    const country = resp1(id);
    const resp = await fetch(`${baseUrl}/user/link/${id}/${country}`,{
        method:"GET",
        headers:{
          'content-type': 'application/json',
          'token': localStorage.getItem('iron_token')
        },
        body:JSON.stringify({link})
    })
    const data = await resp.json();
    console.log(data?.resp)
    return data;
  }

  const fetchOrderDetails = async()=>{

    const user = JSON.parse(localStorage.getItem("iron_user"));

    const {_id} = user;
    
    const resp = await fetch(`${baseUrl}/order/getOrderPrimaryDetail/${_id}`,{
      method:"GET",
      headers:{
        'content-type': 'application/json',
      },

    
  })

  const data = await resp.json();
  return data;

  }


 

  return (

    <MainContext.Provider value={{ login, setUser, getAllType, createType, DeleteType, createIronOrder,createIronOrder2, getRoundCuttingPrice, getFlatIronCutting, getOrders, updateOrders,deleteOrders,updateType ,fetchIronQuality , createQuality , deleteQuality , updateQuality,getRoundWeight,getFlatWeight,sendOtp,submitOtp,changePassword,resetPassword,resp1 , fetchOrderDetails }}>
      {props.children}
    </MainContext.Provider>
  );
};

export default MainState;
