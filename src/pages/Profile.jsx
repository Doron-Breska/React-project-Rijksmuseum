import React from "react";
import { Outlet, useLocation } from "react-router-dom";

function Profile() {
  const location = useLocation();

  return (
    // <div>
    //   <h2>you have X loved items and Y comments</h2>
    //   <Outlet />
    // </div>
    <>
      {/* {location.pathname.includes("manageHistory") ||
      location.pathname.includes("manageLogInfo") ? (
        <Outlet />
      ) : null} */}
      {(location.pathname.includes("manageHistory") ||
        location.pathname.includes("manageLogInfo")) && <Outlet />}
      <h1>General info about the user </h1>
    </>
  );
}

export default Profile;
