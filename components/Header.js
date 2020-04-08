import PropTypes from 'prop-types';
import React from 'react';
import { useState } from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import SubmitDialog from './SubmitDialog';
import SuccessSubmit from './SuccessSubmit';

function Header(props) {
	const [ show, setShow ] = useState(false);
	const [ showSuccess, setShowSuccess ] = useState(false);

	const onSubmitDialog = () => {
		console.log('list: ' + props.gameSelections);
		props.clearEverything();
		setShow(false);
		setShowSuccess(true);
	};
	return (
		<div>
			<Navbar bg="dark" variant="dark" expand="lg">
				<Navbar.Brand href="#home">Oticon Board Games Club</Navbar.Brand>
				<Nav className="mr-auto">
					<Button variant="outline-success" onClick={() => setShow(true)}>
						Submit
					</Button>
				</Nav>
				<Navbar.Text>{props.loginId !== '' ? 'Logged in as: ' + props.loginId : ''}</Navbar.Text>
				{/* <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button
            variant="outline-success"
            onClick={e => console.log(props.selectedGames)}
          >
            Search
          </Button>
        </Form> */}
			</Navbar>
			<SubmitDialog
				show={show ? true : false}
				setShow={() => setShow(false)}
				gameSelections={props.gameSelections}
				onSubmitDialog={() => onSubmitDialog()}
				loginId={props.loginId}
			/>
			<SuccessSubmit showSuccess={showSuccess ? true : false} setShowSuccess={() => setShowSuccess(false)} />
		</div>
	);
}

Header.propTypes = {
	gameSelections: PropTypes.array,
	clearEverything: PropTypes.func,
	loginId: PropTypes.string
};

export default Header;
