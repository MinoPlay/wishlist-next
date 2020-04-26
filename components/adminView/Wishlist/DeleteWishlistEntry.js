import React from 'react';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import fetch from 'isomorphic-unfetch';

async function ValidateGameExists(baseUrl, gameId) {
	var buildUrl = `${baseUrl}/GetGame?gameId=${gameId}`;
	const result = await fetch(buildUrl);
	console.log(result);
	const status = result.status;

	return status;
}

function DeleteWishlistEntry(props) {
	const [ gameId, setGameId ] = useState('');

	function GetGameIdFromTitle(title) {
		const match = props.games.filter((x) => x.gameTitle === title);
		console.log(match);
		return match[0].gameId;
	}

	const onClickLogin = () => {
		ValidateGameExists(props.baseUrl, gameId).then((x) => {
			if (x != 200) {
				setGameId(gameId);
				// add new member
				fetch(`${props.baseUrl}/DeleteGame?gameId=${gameId}`);
				props.success(true);
				props.successMessage(`Successfully deleted game from the wishlist '${gameId}'`);
				props.setShow(false);
			} else {
				alert(`${gameId} is not present.`);
			}
		});
	};

	return (
		<div>
			<Modal show={props.show} onHide={() => props.setShow(false)} centered>
				<Modal.Header closeButton>
					<Modal.Title>Delete game</Modal.Title>
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

export default DeleteWishlistEntry;
