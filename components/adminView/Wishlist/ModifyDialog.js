import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function ModifyDialog(props) {
	return (
		<Modal show={props.show} onHide={() => props.setShow(false)} centered>
			<Modal.Header closeButton>
				<Modal.Title>{props.rowName}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group controlId="formBasicId">
						<Form.Control
							type="id"
							onChange={(e) => props.setCurrentValue(e.target.value)}
							onKeyPress={(e) => {
								if (event.charCode == 13) {
									e.preventDefault();
									e.stopPropagation();
									props.setShow(false);
								}
							}}
						>
							{props.currentValue}
						</Form.Control>
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="primary" onClick={() => props.setShow(false)}>
					Update
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ModifyDialog;
