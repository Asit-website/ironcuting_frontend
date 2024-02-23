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
      body: JSON.stringify({ email, password})
    });
    const data = await resp.json();
    // setUser(data);
    return data;
  };

  const getAllType = async()=>{
    const token = localStorage.getItem('b2b_token');
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

  const createType = async({Name})=>{

    const token = localStorage.getItem('b2b_token');

    const resp = await fetch(`${baseUrl}/type/createType`, {
      method: 'POST',
       headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${token}`
          }
            , body: JSON.stringify({Name})
    });
    const data = await resp.json();
    return data;
  }

  const DeleteType = async({id})=>{
    const token = localStorage.getItem('b2b_token');

    const resp = await fetch(`${baseUrl}/type/deleteType/${id}`, {
      method: 'DELETE',
       headers: {
        'Authorization': `Bearer ${token}`
          }
    });
    const data = await resp.json();
    return data;
  }

  const createIronOrder = async(formdata)=>{
    const { 
      clientName,
    type,
    ironQuality,
    diameter,
    quantity,
    length,
    height,
    width,
  weight,
  cuttingPrice} = formdata;

    const token = localStorage.getItem('b2b_token');

    const resp = await fetch(`${baseUrl}/order/createOrder`, {
      method: 'POST',
       headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${token}`
          } , 
          body: JSON.stringify({clientName,
            type,
            ironQuality,
            diameter,
            quantity,
            length,
            height,
            width,
          weight,
          cuttingPrice
        })
    });
    const data = await resp.json();
    return data;
  }

 const getRoundCuttingPrice = async({Type , diameter , length , quantity})=>{

 
  const token = localStorage.getItem('b2b_token');

  const resp = await fetch(`${baseUrl}/order/getCuttingPrice`, {
    method: 'POST',
     headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${token}`
        } , 
        body: JSON.stringify({
        Type , diameter , length , quantity
      })
  });
  const data = await resp.json();
  return data;
 }

  
 const getFlatIronCutting = async({Type , height , weight , quantity})=>{

 
  const token = localStorage.getItem('b2b_token');

  const resp = await fetch(`${baseUrl}/order/getCuttingPrice`, {
    method: 'POST',
     headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${token}`
        } , 
        body: JSON.stringify({
         Type , height , weight ,quantity
      })
  });
  const data = await resp.json();
  return data;
 }
  
  return (
  
      <MainContext.Provider value={{ login,setUser ,getAllType ,createType , DeleteType , createIronOrder ,getRoundCuttingPrice ,getFlatIronCutting}}>
      {props.children}
    </MainContext.Provider>
  );
};

export default MainState;
