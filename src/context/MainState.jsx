import React, { useState } from "react";
import MainContext from "./MainContext";

const baseUrl = 'http://localhost:5000';
// const baseUrl = 'https://backend.bln.obtechenterprise.com';



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

  const getRoundCuttingPrice = async ({ type, Diameter, Length, quantity }) => {


    const token = localStorage.getItem('iron_token');

    const resp = await fetch(`${baseUrl}/order/getCuttingPrice`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        type, Diameter, Length, quantity
      })
    });
    const data = await resp.json();
    return data;
  }


  const getFlatIronCutting = async ({ type, Height, Weight, quantity }) => {


    const token = localStorage.getItem('iron_token');

    const resp = await fetch(`${baseUrl}/order/getCuttingPrice`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        type, Height, Weight, quantity
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

  return (

    <MainContext.Provider value={{ login, setUser, getAllType, createType, DeleteType, createIronOrder, getRoundCuttingPrice, getFlatIronCutting, getOrders, updateOrders,deleteOrders,updateType }}>
      {props.children}
    </MainContext.Provider>
  );
};

export default MainState;
