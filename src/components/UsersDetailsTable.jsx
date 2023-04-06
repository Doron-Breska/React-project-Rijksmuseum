import React from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";

function UsersDetailsTable() {
  const { isUserLogged } = useContext(AuthContext);
  console.log("manage log info", isUserLogged);
  return (
    <div className="test-profile">
      <div className="test-user-name">
        Username:
        <br />
        {isUserLogged && isUserLogged.displayName}
      </div>
      <div className="test-user-email">
        Email:
        <br />
        {isUserLogged && isUserLogged.email}
      </div>
      <div className="test-user-pic" style={{ textAlign: "right" }}>
        {isUserLogged.photoURL ? (
          <img
            className="profile-pic"
            style={{ width: "200px", borderRadius: "50%" }}
            src={isUserLogged.photoURL}
            alt="profile pic"
          ></img>
        ) : (
          "you didn't set a pic yet"
        )}
      </div>
    </div>
  );
}

export default UsersDetailsTable;
