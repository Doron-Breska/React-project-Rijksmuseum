import React from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import { FiCameraOff } from "react-icons/fi";

function UsersDetailsTable() {
  const { isUserLogged } = useContext(AuthContext);
  console.log("manage log info", isUserLogged);
  return (
    <div className="test-profile">
      <div className="test-user-name">
        <p className="user-text">
          Username:
          <br />
          {isUserLogged && isUserLogged.displayName}
        </p>
      </div>
      <div className="test-user-email">
        <p className="email-text">
          Email:
          <br />
          {isUserLogged && isUserLogged.email}
        </p>
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
          <p className="pic-text">
            You didn't set a pic yet
            <br />
            <FiCameraOff />
          </p>
        )}
      </div>
    </div>
  );
}

export default UsersDetailsTable;
