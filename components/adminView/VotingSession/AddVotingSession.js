import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import fetch from 'isomorphic-unfetch';

async function CreateVotingSession(baseUrl) {
	// get total number of sessions and create ID count++
	var getAllSessionsUrl = `${baseUrl}/GetAllVotingSessions`;
	var allSessions = await fetch(getAllSessionsUrl);
	var allSessionsData = await allSessions.json();
	console.log('allSessionsData:');
	console.log(allSessionsData);
	var newSessionId = `VotingSession_${allSessionsData.length + 1}`;

	var newSessionUrl = `${baseUrl}/AddVotingSession?sessionId=${newSessionId}`;
	await fetch(newSessionUrl);

	return newSessionId;
}

function AddVotingSession(props) {
	return (
		<div>
			<Modal show={props.show} onHide={() => props.setShow(false)} centered>
				<Modal.Header closeButton>
					<Modal.Title>Create new session</Modal.Title>
				</Modal.Header>
				<Modal.Footer>
					<Button
						variant="primary"
						onClick={() => {
							CreateVotingSession(props.baseUrl).then((x) => {
								props.setShow(false);
								props.setCurrentVotingSession(x);
							});
						}}
					>
						Create
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default AddVotingSession;
