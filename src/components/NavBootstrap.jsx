import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { auth } from "../components/FbConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

function NavBootstrap() {
  const { isUserLogged, logOut, setUserOnLogin } = useContext(AuthContext);
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      setUserOnLogin(user);
      console.log(user);
      setEmail("");
      setPassword("");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      alert(errorMessage);
    }
  };

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  return (
    <Navbar bg="light" expand="md">
      <Container fluid>
        <Navbar.Brand>rijksmuseum</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>
            {!isUserLogged && (
              <Nav.Link as={Link} to="/registration">
                Registration
              </Nav.Link>
            )}
            {isUserLogged && (
              <>
                <Nav.Link as={Link} to="/profile">
                  Profile
                </Nav.Link>
                {location.pathname.includes("profile") && (
                  <>
                    <Nav.Link as={Link} to="profile/manageHistory">
                      History
                    </Nav.Link>
                    <Nav.Link as={Link} to="profile/memoryGame">
                      Memory Game
                    </Nav.Link>
                  </>
                )}
              </>
            )}
          </Nav>
          {isUserLogged ? (
            <Button
              onClick={logOut}
              style={{ width: "10rem" }}
              variant="secondary"
            >
              Log-Out
            </Button>
          ) : (
            <Form className="d-flex" onSubmit={handleSubmit}>
              <Form.Group controlId="email">
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </Form.Group>

              <Button
                style={{ width: "10rem" }}
                variant="secondary"
                type="submit"
              >
                log-In
              </Button>
            </Form>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBootstrap;
