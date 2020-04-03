import PropTypes from "prop-types";
import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function SuccessSubmit(props) {
  return (
    <Modal show={props.showSuccess} onHide={props.setShowSuccess}>
      <Modal.Header closeButton>
        <Modal.Title>Wishlist selection submitted!</Modal.Title>
      </Modal.Header>

      <Modal.Footer>
        <Button variant="primary" onClick={props.setShowSuccess}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

SuccessSubmit.propTypes = {
  setShowSuccess: PropTypes.func,
  showSuccess: PropTypes.bool
};

export default SuccessSubmit;
