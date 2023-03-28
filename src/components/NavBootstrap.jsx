import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function NavBootstrap() {
  const { isUserLogged, logOut } = useContext(AuthContext);
  const location = useLocation();
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
            <Nav.Link as={Link} to="/registration">
              Registration
            </Nav.Link>
            {isUserLogged && (
              <>
                <Nav.Link as={Link} to="/profile">
                  Profile
                </Nav.Link>
                {location.pathname.includes("profile") && (
                  <>
                    <Nav.Link as={Link} to="profile/manageHistory">
                      manageHistory
                    </Nav.Link>
                    <Nav.Link as={Link} to="profile/manageLogInfo">
                      manageLogInfo
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
              variant="outline-success"
            >
              Log-Out
            </Button>
          ) : (
            <Form className="d-flex">
              <Form.Control
                type="text"
                placeholder="User Name"
                className="me-2"
                aria-label="user name"
              />
              <Form.Control
                type="password"
                placeholder="password"
                className="me-2"
                aria-label="password"
              />
              <Button style={{ width: "10rem" }} variant="outline-success">
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
