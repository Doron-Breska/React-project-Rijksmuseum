import React from "react";
import { Outlet } from "react-router-dom";
import UsersDetailsTable from "../components/UsersDetailsTable";
import { useLocation } from "react-router-dom";
import ManageLogInfo from "./profile/ManageLogInfo";

function Profile() {
  const location = useLocation();

  return (
    // <div>
    //   <h1 style={{ textAlign: "center" }}>General info about the user</h1>
    //
    //   <Outlet />
    // </div>
    <>
      {location.pathname.includes("manageHistory") ||
      location.pathname.includes("manageLogInfo") ||
      location.pathname.includes("memoryGame") ? (
        <Outlet />
      ) : (
        <>
          <UsersDetailsTable />
          <ManageLogInfo />
        </>
      )}
    </>
  );
}

export default Profile;
