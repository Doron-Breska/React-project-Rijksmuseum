import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { reauthenticateWithCredential } from "firebase/auth";
import Button from "react-bootstrap/Button";
import { EmailAuthProvider } from "firebase/auth";
import Form from "react-bootstrap/Form";

function Reauthenticate() {
  const { isUserLogged } = useContext(AuthContext);
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleReauthenticate = async (e) => {
    e.preventDefault();
    const user = isUserLogged;

    try {
      const credential = EmailAuthProvider.credential(email, password);
      await reauthenticateWithCredential(user, credential);
      console.log("Reauthentication successful");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="text-center reauthenticate-form">
      <h4>
        *To change your password/email you'll need to reauthenticate first
      </h4>
      <Button variant="secondary" onClick={() => setShowForm(!showForm)}>
        Reauthenticate
      </Button>
      {showForm && (
        <Form className="reauthenticate-form" onSubmit={handleReauthenticate}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="secondary" type="submit">
            Submit
          </Button>
        </Form>
      )}
    </div>
  );
}

export default Reauthenticate;
