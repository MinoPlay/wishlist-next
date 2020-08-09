import React from "react";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function SelectVotingSession(props) {
  const [currentSession, setCurrentSession] = useState("");

  return (
    <div>
      <Modal show={props.show} onHide={() => props.setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>select voting session</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicId">
              <Form.Control
                as="select"
                defaultValue="Choose..."
                onChange={(e) => setCurrentSession(e.target.value)}
              >
                <option disabled>Choose...</option>
                {props.votingSessions.map((g) => {
                  console.log(g);
                  return <option>{g}</option>;
                })}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={(x) => {
              props.setCurrentVotingSession(currentSession);
              props.setShow(false);
            }}
            disabled={currentSession === "" ? "disabled" : ""}
          >
            Select
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default SelectVotingSession;