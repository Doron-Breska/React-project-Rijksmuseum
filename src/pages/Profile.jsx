import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import UsersDetailsTable from "../components/UsersDetailsTable";

function Profile() {
  const location = useLocation();

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>General info about the user</h1>
      <UsersDetailsTable />
      <Outlet />
    </div>
    // <>
    //   {(location.pathname.includes("manageHistory") ||
    //     location.pathname.includes("manageLogInfo")) && <Outlet />}
    //   <h1>General info about the user </h1>
    // </>
  );
}

export default Profile;
