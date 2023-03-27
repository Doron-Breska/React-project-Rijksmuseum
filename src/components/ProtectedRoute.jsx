import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

function ProtectdedRoute(props) {
  const { isUserLogged } = useContext(AuthContext);
  return (
    <>{isUserLogged ? props.children : <h1>This page is restricted.</h1>}</>
  );
}

export default ProtectdedRoute;
