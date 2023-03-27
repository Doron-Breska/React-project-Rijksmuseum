import React, { createContext } from "react";
import { useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [isUserLogged, setIsUserLogged] = useState(false);

  const fakeAccount = {
    email: "doron@email.com",
    userName: "doron",
  };

  const logIn = () => {
    setIsUserLogged(fakeAccount);
    console.log("user logged in");
  };

  const logOut = () => {
    setIsUserLogged(false);
    console.log("user logged out");
  };

  console.log("current user", isUserLogged);
  return (
    <AuthContext.Provider value={{ isUserLogged, logIn, logOut }}>
      {props.children}
    </AuthContext.Provider>
  );
};
