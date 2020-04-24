import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function GetWishlistGameId(props) {
	function GetGameIdFromTitle(title) {
		const match = props.games.filter((x) => x.gameTitle === title);
		console.log(match);
		return match[0].gameId;
	}

	return (
		<Modal show={props.show} onHide={() => props.setShow(false)} centered>
			<Modal.Header closeButton>
				<Modal.Title>Select game</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group controlId="formBasicId">
						<Form.Control as="select" onChange={(e) => props.setGameId(GetGameIdFromTitle(e.target.value))}>
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
					onClick={() => {
						props.setGameId(props.gameId);
						props.showModifyWishlistEntry(true);
						props.setShow(false);
					}}
					disabled={props.gameId === '' ? 'disabled' : ''}
				>
					Select
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default GetWishlistGameId;
