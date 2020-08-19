import React from 'react';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import fetch from 'isomorphic-unfetch';

async function ValidateVotingSessionId(baseUrl, votingSessionId) {
	var buildUrl = `${baseUrl}/GetVotingSession?sessionId=${votingSessionId}`;
	const result = await fetch(buildUrl);
	console.log(result);
	const status = result.status;

	return status;
}

function DeleteVotingSession(props) {
	const [ votingSessionId, setVotingSessionId ] = useState('');

	const onClick = () => {
		ValidateVotingSessionId(props.baseUrl, votingSessionId).then((x) => {
			if (x == 200) {
				setVotingSessionId(votingSessionId);
				fetch(`${props.baseUrl}/DeleteVotingSession?sessionId=${votingSessionId}`);
				props.setShow(false);
			} else {
				alert(`${votingSessionId} doesn't exists.`);
			}
		});
	};

	return (
		<div>
			<Modal show={props.show} onHide={() => props.setShow(false)} centered>
				<Modal.Header closeButton>
					<Modal.Title>Delete voting session</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group controlId="formBasicId">
							<Form.Control as="select" onChange={(e) => setVotingSessionId(e.target.value)}>
								{props.votingSessions.map((g) => {
									return <option>{g}</option>;
								})}
							</Form.Control>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant="primary"
						onClick={() => onClick()}
						disabled={votingSessionId === '' ? 'disabled' : ''}
					>
						Delete
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default DeleteVotingSession;
