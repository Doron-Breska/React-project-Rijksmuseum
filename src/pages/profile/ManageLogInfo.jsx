import React from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useState } from "react";
import { updateEmail, updatePassword, updateProfile } from "firebase/auth";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Reauthenticate from "../../components/Reauthenticate";

function ManageLogInfo() {
  const { isUserLogged } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = isUserLogged;

    try {
      if (email !== "") {
        await updateEmail(user, email);
        console.log("Email updated successfully");
        setEmail("");
      }

      if (password !== "") {
        await updatePassword(user, password);
        console.log("Password updated successfully");
        setPassword("");
      }

      if (displayName !== "") {
        await updateProfile(user, {
          displayName: displayName,
        });
        console.log("displayName updated successfully");
        setDisplayName("");
      }
      if (photoURL !== "") {
        await updateProfile(user, {
          photoURL: photoURL,
        });
        console.log("photoURL updated successfully");
        setPhotoURL("");
      }

      // Show success message to user here
    } catch (error) {
      console.log(error.message);
      // Show error message to user here
    }
  };

  return (
    <div>
      <h1>manage your account info here</h1>
      <Reauthenticate />
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Enter a new email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter a new email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Enter a new Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter a new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Enter a new username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter a new username"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Photo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter a photoURL"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default ManageLogInfo;
