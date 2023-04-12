import React from "react";
import ManageComments from "../../components/ManageComments";
import ManageLikes from "../../components/ManageLikes";
import { faSmileWink } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ManageHistory() {
  return (
    <div>
      <div className="manage-history-header">
        <h1 style={{ textAlign: "left" }}>Indecisive ?</h1>
        <h1 style={{ textAlign: "right" }}>No problem ^^</h1>
      </div>
      <ManageComments />
      <ManageLikes />
    </div>
  );
}
//<FontAwesomeIcon icon={faSmileWink} />
export default ManageHistory;
