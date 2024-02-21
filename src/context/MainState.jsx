import React, { useState } from "react";
import MainContext from "./MainContext";

// const baseUrl = 'http://localhost:5000';
const baseUrl = 'https://backend.bln.obtechenterprise.com';



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

  






  return (
    <MainContext.Provider value={{ login }}>
      {props.children}
    </MainContext.Provider>
  );
};

export default MainState;
