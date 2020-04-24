import React from 'react';
import { useState } from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import SubmitDialog from './SubmitDialog';
import SuccessSubmit from './SuccessSubmit';
import ReSubmitDialog from './ReSubmitDialog';
import fetch from 'isomorphic-unfetch';

async function CheckWishlistAlreadySubmitted(baseUrl, userName) {
	// var buildUrl = `https://bgg-api.azurewebsites.net/api/WishlistSelectionExists?initials=${userName}`;
	var buildUrl = `${baseUrl}/WishlistSelectionExists?initials=${userName}`;
	const response = fetch(buildUrl);

	return await response;
}

function Header(props) {
	const [ show, setShow ] = useState(false);
	const [ showSuccess, setShowSuccess ] = useState(false);
	const [ showResubmitDialog, setShowResubmitDialog ] = useState(false);
	const [ resubmitSelection, setShowResubmitSelection ] = useState(false);

	const onSubmitDialog = () => {
		console.log('list: ' + props.gameSelections);
		props.clearEverything();
		setShow(false);
		setShowSuccess(true);
	};

	const onResubmitDialog = () => {
		console.log('onResubmitDialog');
		CheckWishlistAlreadySubmitted(props.baseUrl, props.loginId).then((x) => {
			if (x.status == 200) {
				console.log('status: 200');
				setShowResubmitDialog(true);
			} else {
				console.log('status not 200');
				setShow(true);
			}
		});
	};

	const onDoResubmit = () => {
		setShowResubmitDialog(false);
		setShow(true);
		setShowResubmitSelection(true);
	};

	return (
		<div>
			<Navbar bg="dark" variant="dark" expand="lg">
				<Navbar.Brand href="#home">Oticon Board Games Club</Navbar.Brand>
				<Nav className="mr-auto">
					<Button variant="outline-success" onClick={() => onResubmitDialog()}>
						Submit
					</Button>
					<Button variant="outline-success" href="/adminWindow">
						Admin view
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
			<ReSubmitDialog
				show={showResubmitDialog}
				setShow={() => setShowResubmitDialog(false)}
				resubmitSelection={() => onDoResubmit()}
			/>
			<SubmitDialog
				baseUrl={props.baseUrl}
				show={show}
				setShow={() => setShow(false)}
				gameSelections={props.gameSelections}
				onSubmitDialog={() => onSubmitDialog()}
				loginId={props.loginId}
				resubmitSelection={resubmitSelection}
			/>
			<SuccessSubmit
				showSuccess={showSuccess}
				setShowSuccess={() => setShowSuccess(false)}
				message="Wishlist selection submitted!"
			/>
		</div>
	);
}

export default Header;
