import React, { createContext, useEffect } from "react";
import { useState } from "react";
import { auth } from "../components/FbConfig";
import "firebase/auth";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [isUserLogged, setIsUserLogged] = useState(false);

  const checkForCurrentUser = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsUserLogged(user);
        console.log(
          "this is a test for seeing the user after refreshing the page",
          user
        );
      } else {
        setIsUserLogged(null);
      }
    });
  };
  useEffect(() => {
    checkForCurrentUser();
  }, []);

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
