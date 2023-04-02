import React from "react";
import ManageComments from "../../components/ManageComments";
import ManageLikes from "../../components/ManageLikes";

function ManageHistory() {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>manage ur likes / comments etc.. </h1>
      <ManageComments />
      <ManageLikes />
    </div>
  );
}

export default ManageHistory;
