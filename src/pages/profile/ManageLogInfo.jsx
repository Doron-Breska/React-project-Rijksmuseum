import React from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import { getAuth } from "firebase/auth";
import Table from "react-bootstrap/Table";

function ManageLogInfo() {
  const { isUserLogged } = useContext(AuthContext);
  console.log("manage log info", isUserLogged);

  const auth = getAuth();
  const user = auth.currentUser;

  if (user !== false) {
    user.providerData.forEach((profile) => {
      console.log("Sign-in provider: " + profile.providerId);
      console.log("  Provider-specific UID: " + profile.uid);
      console.log("  Name: " + profile.displayName);
      console.log("  Email: " + profile.email);
      console.log("  Photo URL: " + profile.photoURL);
    });
  }

  return (
    <div>
      <h1>manage your account info here</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>displayName</th>
            <th>email</th>
            <th>phoneNumber</th>
            <th>photoURL</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{user.displayName}</td>
            <td>{user.email}</td>
            <td>{user.phoneNumber}</td>
            <td>{user.photoURL}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default ManageLogInfo;
