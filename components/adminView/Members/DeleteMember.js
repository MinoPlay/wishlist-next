import React from 'react';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import fetch from 'isomorphic-unfetch';

async function ValidateLoginId(loginId) {
	console.log(`Validating login ID ${loginId}`);
	// var buildUrl = `https://bgg-api.azurewebsites.net/api/GetMember?initials=${loginId}`;
	var buildUrl = `http://localhost:7071/api/GetMember?initials=${loginId}`;
	const result = await fetch(buildUrl);
	console.log(result);
	const status = result.status;

	return status;
}

function DeleteMember(props) {
	const [ loginId, setLoginId ] = useState('');

	const onClickLogin = () => {
		console.log('onClickLogin handler');

		ValidateLoginId(loginId).then((x) => {
			if (x == 200) {
				setLoginId(loginId);
				// add new member
				fetch(`http://localhost:7071/api/DeleteMember?initials=${loginId}`);
				props.success(true);
				props.successMessage(`Successfully deleted member '${loginId}'`);
				props.setShow(false);
			} else {
				alert(`${loginId} doesn't exists.`);
			}
		});
	};

	return (
		<div>
			<Modal show={props.show} onHide={() => props.setShow(false)} centered>
				<Modal.Header closeButton>
					<Modal.Title>Delete member</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group controlId="formBasicId">
							<Form.Label>Enter member initials</Form.Label>
							<Form.Control
								type="id"
								placeholder="initials"
								onChange={(e) => setLoginId(e.target.value)}
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
						disabled={loginId === '' ? 'disabled' : ''}
					>
						Delete
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default DeleteMember;
