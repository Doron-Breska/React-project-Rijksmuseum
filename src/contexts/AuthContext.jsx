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
        console.log("test for seeing the user after refreshing the page", user);
      } else {
        setIsUserLogged(false);
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
  console.log("test-test", isUserLogged);

  return (
    <AuthContext.Provider value={{ logOut, setUserOnLogin, isUserLogged }}>
      {props.children}
    </AuthContext.Provider>
  );
};
