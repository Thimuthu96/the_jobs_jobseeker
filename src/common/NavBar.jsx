import React from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { MdWork } from "react-icons/md";

const NavBar = () => {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-transparent">
      <Container>
        <Navbar.Brand href="#home">
          {/* <MdWork /> */}
          <h4 className="nav-logo">The Jobs</h4>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="m-auto justify-content-center">
            <Nav.Link href="#features">Home</Nav.Link>
            <Nav.Link href="#pricing">Company</Nav.Link>
            <Nav.Link href="#pricing">Jobs</Nav.Link>
            <Nav.Link href="#pricing">Community</Nav.Link>
            <Nav.Link href="#pricing">Contact</Nav.Link>
            {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          <Nav>
            {/* <Nav.Link href="#deets">More deets</Nav.Link> */}
            {/* <Nav.Link eventKey={2} href="#memes">
              SignIn
            </Nav.Link> */}
            <Button variant="outline-dark">SignIn</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
