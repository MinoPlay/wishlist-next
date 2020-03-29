import React from "react";
import PropTypes from "react";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { connect } from "react-redux";
import { loginAction } from "../redux/actions";

function LoginDialog(props) {
  //const [currentId, setCurrentId] = useState("");

  // function handleClose() {
  //   console.log("enter HandleClose");
  //   console.log("show start: " + show);
  //   () => loginAction(currentId);
  //   console.log("passed loginAction: " + currentId);
  //   console.log("show end: " + show);
  // }

  return (
    <>
      <Modal show={props.show} onHide={props.setShow}>
        <Modal.Header closeButton>
          <Modal.Title>Login dialog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicId">
              <Form.Label>Id</Form.Label>
              <Form.Control
                type="id"
                placeholder="Enter id"
                //onChange={e => setCurrentId(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.setShow}>
            Close
          </Button>
          <Button variant="primary" onClick={props.setShow}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

LoginDialog.propTypes = {
  setShow: PropTypes.func,
  show: PropTypes.bool
};

// const mapStateToProps = state => {
//   return { loginId: state.loginReducer };
// };
export default LoginDialog;
