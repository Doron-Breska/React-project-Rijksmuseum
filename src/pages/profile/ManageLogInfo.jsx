import React from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useState } from "react";
import { updateEmail, updatePassword, updateProfile } from "firebase/auth";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Reauthenticate from "../../components/Reauthenticate";
import { FiEdit } from "react-icons/fi";

function ManageLogInfo({ onRefresh }) {
  const { isUserLogged, checkForCurrentUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [showDisplayNameInput, setShowDisplayNameInput] = useState(false);
  const [showPhotoURLInput, setShowPhotoURLInput] = useState(false);

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
      alert("Profile updated successfully");
      // window.location.reload();
      checkForCurrentUser();
      onRefresh();
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  return (
    <div>
      <h3 className="text-center manage-profile-headrer mx-5">
        Manage your profile
      </h3>
      <Reauthenticate />
      <Form className="edit-profile-form" onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>
            Click to change your email{" "}
            <FiEdit
              className="pencil-edit"
              style={{ cursor: "pointer" }}
              onClick={() => setShowEmailInput(!showEmailInput)}
            />
          </Form.Label>
          {showEmailInput && (
            <Form.Control
              type="email"
              id="manage-profile-email-input"
              placeholder="Enter a new email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>
            Click to change your password{" "}
            <FiEdit
              className="pencil-edit"
              style={{ cursor: "pointer" }}
              onClick={() => setShowPasswordInput(!showPasswordInput)}
            />
          </Form.Label>
          {showPasswordInput && (
            <Form.Control
              type="password"
              id="manage-profile-password-input"
              placeholder="Enter a new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>
            Click to change yourusername{" "}
            <FiEdit
              className="pencil-edit"
              style={{ cursor: "pointer" }}
              onClick={() => setShowDisplayNameInput(!showDisplayNameInput)}
            />
          </Form.Label>
          {showDisplayNameInput && (
            <Form.Control
              type="text"
              id="manage-profile-username-input"
              placeholder="Enter a new username"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>
            Click to change photo-url{" "}
            <FiEdit
              className="pencil-edit"
              style={{ cursor: "pointer" }}
              onClick={() => setShowPhotoURLInput(!showPhotoURLInput)}
            />
          </Form.Label>
          {showPhotoURLInput && (
            <Form.Control
              type="url"
              id="manage-profile-photo-input"
              placeholder="Enter a photoURL"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
            />
          )}
        </Form.Group>

        <Button variant="secondary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default ManageLogInfo;
