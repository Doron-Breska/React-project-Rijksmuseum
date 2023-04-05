import React from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
// import { getAuth } from "firebase/auth";
import Table from "react-bootstrap/Table";

function UsersDetailsTable() {
  const { isUserLogged } = useContext(AuthContext);
  console.log("manage log info", isUserLogged);
  return (
    <div className="user-info-table">
      <Table striped bordered hover>
        <thead className="rounded">
          <tr>
            <th>UserName</th>
            <th>Email</th>
            <th>Photo</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{isUserLogged && isUserLogged.displayName}</td>
            <td>{isUserLogged && isUserLogged.email}</td>
            <td>
              {isUserLogged.photoURL ? (
                <img
                  style={{ width: "200px" }}
                  src={isUserLogged.photoURL}
                  alt="profile pic"
                ></img>
              ) : (
                "you didn't set a pic yet"
              )}
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default UsersDetailsTable;
