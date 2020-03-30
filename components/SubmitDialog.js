import PropTypes from "prop-types";
import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import fetch from "isomorphic-unfetch";

async function submitWishlistSelection(userName, selectedGames) {
  var buildUrl = "http://localhost:7071/api/AddWishlistSelection?";
  var userSelection = "UserId=" + userName;
  var gamesSelection = "&GameSelections=" + selectedGames.join(",");
  var combinedUrl = buildUrl + userSelection + gamesSelection;
  console.log(combinedUrl);
  const response = fetch(new Request(combinedUrl), { mode: "no-cors" });
  console.log(response);
}

function SubmitDialog(props) {
  const onClickSubmit = () => {
    console.log("enter onClickSubmit");
    console.log("props.loginId:   " + props.loginId);
    console.log("props.selection: " + props.selectedGames);
    submitWishlistSelection(props.loginId, props.selectedGames);
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
