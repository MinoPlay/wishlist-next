import React from 'react';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import fetch from 'isomorphic-unfetch';

async function ValidateGameExists(gameId) {
	console.log(`ValidateGameExists ${gameId}`);
	// var buildUrl = `https://bgg-api.azurewebsites.net/api/GetMember?initials=${loginId}`;
	var buildUrl = `http://localhost:7071/api/GetGame?gameId=${gameId}`;
	const result = await fetch(buildUrl);
	console.log(result);
	const status = result.status;

	return status;
}

function AddWishlistEntry(props) {
	const [ gameId, setGameId ] = useState('');

	const onClickLogin = () => {
		console.log('onClickLogin handler');

		ValidateGameExists(gameId).then((x) => {
			if (x != 200) {
				setGameId(gameId);
				// add new member
				fetch(`http://localhost:7071/api/AddGame?gameId=${gameId}`);
				props.success(true);
				props.successMessage(`Successfully added new game to the wishlist '${gameId}'`);
				props.setShow(false);
			} else {
				alert(`${gameId} is already added.`);
			}
		});
	};

	return (
		<div>
			<Modal show={props.show} onHide={() => props.setShow(false)} centered>
				<Modal.Header closeButton>
					<Modal.Title>Add new game</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group controlId="formBasicId">
							<Form.Label>Enter new game id</Form.Label>
							<Form.Control
								type="id"
								placeholder="game id"
								onChange={(e) => setGameId(e.target.value)}
								onKeyPress={(e) => {
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

export default AddWishlistEntry;
