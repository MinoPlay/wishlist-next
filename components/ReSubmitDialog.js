import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function ReSubmitDialog(props) {
	const onYes = () => {
		console.log('enter onYes');
		props.setShow();
		props.resubmitSelection();
	};

	return (
		<div>
			<Modal show={props.show} onHide={props.setShow}>
				<Modal.Header closeButton>
					<Modal.Title>WARNING!!!</Modal.Title>
				</Modal.Header>
				<Modal.Body>You're sure you want to overwrite your previous selection, are you sure?</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={props.setShow}>
						No
					</Button>
					<Button variant="primary" onClick={() => onYes()}>
						Yes
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default ReSubmitDialog;
