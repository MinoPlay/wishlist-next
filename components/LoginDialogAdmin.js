import React from 'react';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import fetch from 'isomorphic-unfetch';

async function ValidateLoginId(baseUrl, loginId, password) {
	var checkUrl = `${baseUrl}/CheckAccess?initials=${loginId}&pass=${password}`;
	var checkPass = await fetch(checkUrl);
	if (checkPass.status !== 200) {
		return 404;
	}

	var buildUrl = `${baseUrl}/GetMember?initials=${loginId}`;
	const result = await fetch(buildUrl);
	const data = await result.json();
	console.log(data);

	if (checkPass.status == 200 && result.status == 200) {
		if (data.role === 1) {
			return 200;
		}
	}

	return 404;
}

function LoginDialogAdmin(props) {
	const [ loginId, setLoginId ] = useState('');
	const [ password, setPassword ] = useState('');

	const onClickLogin = () => {
		ValidateLoginId(props.baseUrl, loginId, password).then((x) => {
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
							<Form.Control
								type="password"
								placeholder="magic word?"
								onChange={(e) => setPassword(e.target.value)}
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

export default LoginDialogAdmin;
