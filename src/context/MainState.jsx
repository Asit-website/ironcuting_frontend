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

  const createIronOrder = async (formdata) => {
    const {
      client,
      type,
      ironQuality,
      Diameter,
      quantity,
      Length,
      Height,
      Width,
      Weight,
      CuttingPrice } = formdata;

    const token = localStorage.getItem('iron_token');

    const resp = await fetch(`${baseUrl}/order/createOrder`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        client,
        type,
        ironQuality,
        Diameter,
        quantity,
        Length,
        Height,
        Width,
        Weight,
        CuttingPrice
      })
    });
    const data = await resp.json();
    return data;
  }

  const getRoundCuttingPrice = async ({ type, Diameter, Length, quantity , ironQuality }) => {


    const token = localStorage.getItem('iron_token');

    const resp = await fetch(`${baseUrl}/order/getCuttingPrice`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        type, Diameter, Length, quantity , ironQuality
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

  const updateOrders = async ({ id, client,
    type,
    ironQuality,
    Diameter,
    quantity,
    Length,
    Height,
    Width,
    Weight,
    CuttingPrice }) => {

    const token = localStorage.getItem('iron_token');

    const data = {
      client,
            type,
            ironQuality,
            Diameter,
            quantity,
            Length,
            Height,
            Width,
            Weight,
            CuttingPrice
    };


    try {
      const resp = await fetch(`${baseUrl}/order/updateOrders/${id}`, {
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

  const deleteOrders = async (id) => {
    const resp = await fetch(`${baseUrl}/order/deleteOrders/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'token': localStorage.getItem('iron_token')
      }
    });
    const data = await resp.json();
    return data;
  };

 

  return (

    <MainContext.Provider value={{ login, setUser, getAllType, createType, DeleteType, createIronOrder, getRoundCuttingPrice, getFlatIronCutting, getOrders, updateOrders,deleteOrders,updateType ,fetchIronQuality , createQuality , deleteQuality , updateQuality,getRoundWeight,getFlatWeight }}>
      {props.children}
    </MainContext.Provider>
  );
};

export default MainState;
