import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

async function Response() {
	// var buildUrl = `https://bgg-api.azurewebsites.net/api/GetWishlistSelections`;
	var buildUrl = `http://localhost:7071/api/SyncWishlistAgainstBGG`;
	const result = await fetch(buildUrl);
	const data = await result.json();
	console.log('SyncAgainstBgg');
	console.log(data);
	return data;
}

function SyncAgainstBgg(props) {
	const [ response, setResponse ] = useState([]);

	Response.then((x) => setResponse(x));
	console.log('response');
	console.log(response);

	return (
		<Modal show={props.showSuccess} onHide={props.setShowSuccess}>
			<Modal.Header closeButton>
				<Modal.Title>Sync boardGameGeek against local database</Modal.Title>
			</Modal.Header>

			<Modal.Footer>
				<Button variant="primary" onClick={props.setShowSuccess}>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default SyncAgainstBgg;
