import PropTypes from "prop-types";
import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

// async function submitWishlistSelection() {
//   const response = await fetch(
//     "http://localhost:7071/api/AddWishlistSelection?UserId=BOB&GameSelections=selec1,selec2,selec3"
//   );

function SubmitDialog(props) {
  const onClickSubmit = () => {
    console.log("enter onClickSubmit");
    props.onSubmitDialog();
  };

  return (
    <>
      <Modal show={props.show} onHide={props.setShow}>
        <Modal.Header closeButton>
          <Modal.Title>Submit selection?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You're about to submit ({props.selectedGames.join(",")}) games!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.setShow}>
            Close
          </Button>
          <Button variant="primary" onClick={() => onClickSubmit()}>
            Submit selection
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

SubmitDialog.propTypes = {
  setShow: PropTypes.func,
  show: PropTypes.bool,
  selectedGames: PropTypes.array,
  onSubmitDialog: PropTypes.func
};

export default SubmitDialog;
