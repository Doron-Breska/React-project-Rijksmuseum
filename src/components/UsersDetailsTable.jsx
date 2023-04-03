import React from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
// import { getAuth } from "firebase/auth";
import Table from "react-bootstrap/Table";

function UsersDetailsTable() {
  const { isUserLogged } = useContext(AuthContext);
  console.log("manage log info", isUserLogged);
  /// showing user's info inside the table
  // const auth = getAuth();
  // const user = auth.currentUser;

  // if (user !== false) {
  //   user.providerData.forEach((profile) => {
  //     console.log("Sign-in provider: " + profile.providerId);
  //     console.log("  Provider-specific UID: " + profile.uid);
  //     console.log("  Name: " + profile.displayName);
  //     console.log("  Email: " + profile.email);
  //     console.log("  Photo URL: " + profile.photoURL);
  //   });
  // }
  ///////
  return (
    <Table striped bordered hover>
      <thead>
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
  );
}

export default UsersDetailsTable;
