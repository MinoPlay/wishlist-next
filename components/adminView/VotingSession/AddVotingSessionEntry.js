import React from 'react';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import fetch from 'isomorphic-unfetch';

async function ValidateGameDoesNotExists(baseUrl, sessionId, gameId) {
	var buildUrl = `${baseUrl}/GetVotingSessionEntries?votingSessionId=${sessionId}`;
	const response = await fetch(buildUrl);
	const data = await response.json();

	const result = data.map((x) => ({
		GameId: x.gameId
	}));

	const filterResult = result.filter((x) => x.GameId === gameId);
	return filterResult.length;
}

function AddVotingSessionEntry(props) {
	const [ gameId, setGameId ] = useState('');

	function GetGameIdFromTitle(title) {
		const match = props.games.filter((x) => x.gameTitle === title);
		console.log(match);
		return match[0].gameId;
	}

	const onClickLogin = () => {
		ValidateGameDoesNotExists(props.baseUrl, props.sessionId, gameId).then((x) => {
			console.log(x);
			if (x === 0) {
				setGameId(gameId);
				// add new member
				fetch(`${props.baseUrl}/AddVotingSessionEntry?votingSessionId=${props.sessionId}&gameId=${gameId}`);
				props.success(true);
				props.successMessage(`Successfully added game to the voting session '${gameId}'`);
				props.setShow(false);
				props.setRefresh();
			} else {
				alert(`${gameId} already exists in voting session.`);
			}
		});
	};

	return (
		<div>
			<Modal show={props.show} onHide={() => props.setShow(false)} centered>
				<Modal.Header closeButton>
					<Modal.Title>Add game</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group controlId="formBasicId">
							<Form.Control as="select" onChange={(e) => setGameId(GetGameIdFromTitle(e.target.value))}>
								{props.games.map((g) => {
									return <option>{g.gameTitle}</option>;
								})}
							</Form.Control>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant="primary"
						onClick={(x) => onClickLogin()}
						disabled={gameId === '' ? 'disabled' : ''}
					>
						Add
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default AddVotingSessionEntry;
