import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function GetWishlistGameId(props) {
	return (
		<Modal show={props.show} onHide={() => props.setShow(false)} centered>
			<Modal.Header closeButton>
				<Modal.Title>Enter game id</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group controlId="formBasicId">
						<Form.Label>Enter game id</Form.Label>
						<Form.Control
							type="id"
							placeholder="gameId"
							onChange={(e) => props.setGameId(e.target.value)}
							onKeyPress={(e) => {
								if (event.charCode == 13) {
									e.preventDefault();
									e.stopPropagation();
									props.showModifyWishlistEntry(true);
									props.setShow(false);
								}
							}}
						/>
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
					Add
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default GetWishlistGameId;
