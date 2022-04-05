import React from 'react';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import fetch from 'isomorphic-unfetch';

async function ValidateLoginId(baseUrl, loginId) {
	var buildUrl = `${baseUrl}/GetMember?initials=${loginId}`;
	console.log(buildUrl);
	const result = await fetch(buildUrl);
	console.log(result);
	const status = result.status;

	return status;
}

function LoginDialog(props) {
	const [ loginId, setLoginId ] = useState('');

	const onClickLogin = () => {
		console.log('onClickLogin handler');

		ValidateLoginId(props.baseUrl, loginId).then((x) => {
			if (x == 200) {
				props.setLoginId(loginId);
				props.setShow();
			} else {
				alert(`${loginId} is not a valid id.`);
			}
		});
	};

	return (
		<div>
			<Modal show={props.show} onHide={() => alert("OH NO YOU DIDN'T!!!!")} centered>
				<Modal.Header closeButton>
					<Modal.Title>Login</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group controlId="formBasicId">
							<Form.Label>Who are you? Enter your initials</Form.Label>
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
						Login
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default LoginDialog;
