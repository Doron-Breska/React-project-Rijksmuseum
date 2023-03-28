import React, { createContext } from "react";
import { useState } from "react";
// import { auth } from "../components/FbConfig";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [isUserLogged, setIsUserLogged] = useState(false);

  // auth.onAuthStateChanged((user) => {
  //   setIsUserLogged(user);
  // });

  const setUserOnLogin = (user) => {
    if (user) {
      setIsUserLogged(user);
    }
  };

  const logOut = () => {
    setIsUserLogged(false);
    console.log("user logged out");
  };

  return (
    <AuthContext.Provider value={{ isUserLogged, logOut, setUserOnLogin }}>
      {props.children}
    </AuthContext.Provider>
  );
};
