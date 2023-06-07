import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import UsersDetailsTable from "../components/UsersDetailsTable";
import { useLocation } from "react-router-dom";
import ManageLogInfo from "./profile/ManageLogInfo";

function Profile() {
  const [refreshKey, setRefreshKey] = useState(0);

  const location = useLocation();

  const refresh = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

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
          <div className="profile-frame">
            <UsersDetailsTable />
            <ManageLogInfo onRefresh={refresh} />
          </div>
        </>
      )}
    </>
  );
}

export default Profile;
