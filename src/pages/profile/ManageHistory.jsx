import React from "react";
import ManageComments from "../../components/ManageComments";
import ManageLikes from "../../components/ManageLikes";

function ManageHistory() {
  return (
    <div>
      <div className="manage-history-header">
        <h1 className="history-header-style" style={{ textAlign: "left" }}>
          Indecisive ?
        </h1>
        <h1 className="history-header-style" style={{ textAlign: "right" }}>
          No problem ^^
        </h1>
      </div>
      <div className="manage-history-header-2">
        <h1 className="history-header-style" style={{ textAlign: "left" }}>
          Comments first,
        </h1>
        <h1 className="history-header-style" style={{ textAlign: "right" }}>
          Likes below.
        </h1>
      </div>
      <ManageComments />
      <ManageLikes />
    </div>
  );
}
export default ManageHistory;
