import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import fetch from 'isomorphic-unfetch';

async function submitWishlistSelection(userName, gameSelections, resubmitSelection) {
	console.log('enter submitWishlistSelection');
	if (resubmitSelection) {
		// delete preexisting entries:
		fetch(`http://localhost:7071/api/DeleteMemberWishlist?initials=${userName}`);
		console.log('done deleting entries');
	}

	console.log('PAST resubmit check');
	// var buildUrl =
	//   `https://bgg-api.azurewebsites.net/api/AddWishlistSelection?code=EZ0cxdMhUvuXav1fgaSFmqxCxaQ8hSlRFWo4RCOyFU3Q95v2pLMJVQ==&UserId=${userName}`;
	var buildUrl = `http://localhost:7071/api/AddWishlistSelection?UserId=${userName}`;

	for (var i = 0; i < gameSelections.length; i++) {
		var combinedUrl = `${buildUrl}&GameSelection=${gameSelections[i].gameId}&GameWeight=${gameSelections[i]
			.weight}`;
		console.log(combinedUrl);
		const response = fetch(combinedUrl);
		console.log(response);
	}
	console.log('done submitWishlistSelection!!!');
}

function SubmitDialog(props) {
	const onClickSubmit = () => {
		console.log('enter onClickSubmit');
		console.log('props.loginId:   ' + props.loginId);
		console.log('props.gameSelections: ' + props.gameSelections);

		submitWishlistSelection(props.loginId, props.gameSelections, props.resubmitSelection);
		props.onSubmitDialog();
	};

	return (
		<div>
			<Modal show={props.show} onHide={props.setShow}>
				<Modal.Header closeButton>
					<Modal.Title>Submit selection?</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					You're about to submit (
					{props.gameSelections.map((gs) => gs.gameTitle).join(', ')}) games!
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={props.setShow}>
						Close
					</Button>
					<Button variant="primary" onClick={() => onClickSubmit()}>
						Submit selection
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default SubmitDialog;
