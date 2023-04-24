import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { updateProfile } from "firebase/auth";
import { auth } from "../components/FBconfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

function Registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  const db = getFirestore();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(user);

      //// wait for updateProfile + addDoc
      await Promise.all([
        updateProfile(user, { displayName }),
        addDoc(collection(db, "users"), {
          userId: user.uid,
          emailAdress: user.email,
        }),
      ]);

      console.log("Profile updated and document created successfully!");
      alert("Registration has been successfully completed");
      setEmail("");
      setPassword("");
      setDisplayName("");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage, errorCode);
      alert(errorMessage);
    }
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }
  function handleDisplayNameChange(event) {
    setDisplayName(event.target.value);
  }

  return (
    <div className="registration-container text-center p-3">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            id="rsgistration-email-input"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Chose a password"
            value={password}
            onChange={handlePasswordChange}
            id="rsgistration-password-input"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>User name</Form.Label>
          <Form.Control
            type="test"
            placeholder="Chose a user name"
            value={displayName}
            onChange={handleDisplayNameChange}
            id="rsgistration-username-input"
          />
        </Form.Group>
        <Button variant="secondary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Registration;
