import React from 'react';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import fetch from 'isomorphic-unfetch';

async function ValidateLoginId(baseUrl, loginId) {
	var buildUrl = `${baseUrl}/GetMember?initials=${loginId}`;
	const result = await fetch(buildUrl);
	console.log(result);
	const status = result.status;

	return status;
}

function AddMember(props) {
	const [ loginId, setLoginId ] = useState('');

	const onClickLogin = () => {
		console.log('onClickLogin handler');

		ValidateLoginId(props.baseUrl, loginId).then((x) => {
			if (x != 200) {
				setLoginId(loginId);
				// add new member
				fetch(`${props.baseUrl}/AddMember?initials=${loginId}`);
				props.success(true);
				props.successMessage(`Successfully added new member '${loginId}'`);
				props.setShow(false);
			} else {
				alert(`${loginId} is already added.`);
			}
		});
	};

	return (
		<div>
			<Modal show={props.show} onHide={() => props.setShow(false)} centered>
				<Modal.Header closeButton>
					<Modal.Title>Add new member</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group controlId="formBasicId">
							<Form.Label>Enter new member initials</Form.Label>
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
						Add
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default AddMember;
