import React from "react";

import { Navbar, Nav, Form, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './navbar.css';

function NavbarComponent() {
  return (
    <Navbar bg="light" variant="dark" expand="lg" className="navbar">
      <Navbar.Brand href="/">Financial Manager</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <LinkContainer to="/app/expense-tracker"><Nav.Link>Expense Tracker</Nav.Link></LinkContainer>
          <LinkContainer to="/app/crypto-tracker"><Nav.Link>Crypto Tracker</Nav.Link></LinkContainer>
        </Nav>
        <Form inline className="logout">
          <Button variant="outline" href="/" style={{color: "#fff"}}>Logout</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarComponent;