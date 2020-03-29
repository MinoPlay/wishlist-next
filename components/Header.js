import PropTypes from "prop-types";
import React from "react";
import { useState } from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import SubmitDialog from "./SubmitDialog";
import LoginDialog from "./LoginDialog";

function Header(props) {
  const [show, setShow] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const onSubmitDialog = () => {
    console.log("list: " + props.selectedGames);
    props.clearEverything();
    console.log("clearred? : " + props.selectedGames);
    setShow(false);
  };
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="#home">Oticon Board Games Club</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link onClick={e => setShowLogin(true)}>Login</Nav.Link>
          <Nav.Link onClick={e => setShow(true)}>Submit</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button
            variant="outline-success"
            onClick={e => console.log(props.selectedGames)}
          >
            Search
          </Button>
        </Form>
      </Navbar>
      <SubmitDialog
        show={show ? true : false}
        setShow={x => setShow(false)}
        selectedGames={props.selectedGames}
        onSubmitDialog={x => onSubmitDialog()}
      />
      <LoginDialog
        show={showLogin ? true : false}
        setShow={x => setShowLogin(false)}
      />
    </div>
  );
}

Header.propTypes = {
  selectedGames: PropTypes.array,
  clearEverything: PropTypes.func
};

export default Header;
