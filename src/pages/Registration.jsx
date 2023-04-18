import React, { useContext, useState } from "react";
// import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { updateProfile } from "firebase/auth";
import { auth } from "../components/FbConfig";
// import { AuthContext } from "../contexts/AuthContext.jsx";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

function Registration() {
  // const { isUserLogged } = useContext(AuthContext);
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

      // Wait for both updateProfile and addDoc to complete
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
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={handleEmailChange}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>displayName</Form.Label>
        <Form.Control
          type="test"
          placeholder="displayName"
          value={displayName}
          onChange={handleDisplayNameChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default Registration;
