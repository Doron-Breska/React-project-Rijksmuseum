import React from "react";
import ManageComments from "../../components/ManageComments";
import ManageLikes from "../../components/ManageLikes";
import { faSmileWink } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ManageHistory() {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>
        Indecisive ? <br /> No problem <FontAwesomeIcon icon={faSmileWink} />
      </h1>
      <ManageComments />
      <ManageLikes />
    </div>
  );
}

export default ManageHistory;
