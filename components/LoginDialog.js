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

  const [loginId, setLoginId] = useState("");

  const onClickLogin = () => {
    console.log("inside onClickLogin");
    props.setLoginId(loginId);
    props.setShow();
  };

  return (
    <>
      <Modal
        show={props.show}
        onHide={() => alert("OH NO YOU DIDN'T!!!!")}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicId">
              <Form.Label>Who are you? Enter your initials</Form.Label>
              <Form.Control
                type="id"
                placeholder="initials"
                onChange={e => setLoginId(e.target.value)}
                onKeyPress={e => {
                  if (event.charCode == 13) {
                    e.preventDefault();
                    e.stopPropagation();
                    onClickLogin();
                  }
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={x => onClickLogin()}
            disabled={loginId === "" ? "disabled" : ""}
          >
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

// LoginDialog.propTypes = {
//   setShow: PropTypes.func,
//   show: PropTypes.bool,
//   setLoginId: PropTypes.func
// };

// const mapStateToProps = state => {
//   return { loginId: state.loginReducer };
// };
export default LoginDialog;
