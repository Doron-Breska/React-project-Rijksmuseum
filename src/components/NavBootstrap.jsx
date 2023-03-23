import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import React from "react";
import { Link } from "react-router-dom";

function NavBootstrap() {
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
            <Nav.Link as={Link} to="/About">
              About
            </Nav.Link>
          </Nav>
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBootstrap;
