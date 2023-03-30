import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { getAuth, reauthenticateWithCredential } from "firebase/auth";
import Button from "react-bootstrap/Button";
import { EmailAuthProvider } from "firebase/auth";

function Reauthenticate() {
  const { isUserLogged } = useContext(AuthContext);

  const handleReauthenticate = async () => {
    const auth = getAuth();
    const user = isUserLogged;

    try {
      const email = prompt("Enter your email:");
      const password = prompt("Enter your password:");

      const credential = EmailAuthProvider.credential(email, password);

      await reauthenticateWithCredential(user, credential);

      console.log("Reauthentication successful");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <h1>Reauthenticate</h1>
      <Button variant="primary" onClick={handleReauthenticate}>
        Reauthenticate
      </Button>
    </div>
  );
}

export default Reauthenticate;
