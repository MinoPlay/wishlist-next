import React from 'react';
import { useState } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import LoginDialog from '../components/LoginDialog';
import AddMember from '../components/adminView/Members/AddMember';
import DeleteMember from '../components/adminView/Members/DeleteMember';
import GetAllMembers from '../components/adminView/Members/GetAllMembers';
import AddWishlistEntry from '../components/adminView/Wishlist/AddWishlistEntry';
import DeleteWishlistEntry from '../components/adminView/Wishlist/DeleteWishlistEntry';
import GetWishlistSelections from '../components/adminView/WishlistSelection/GetWishlistSelections';
import ModifyWishlistEntry from '../components/adminView/Wishlist/ModifyWishlistEntry';
import GetWishlistGameId from '../components/adminView/Wishlist/GetWishlistGameId';
import SuccessSubmit from '../components/SuccessSubmit';

//const baseUrl = 'http://localhost:7071/api';
const baseUrl = 'https://bgg-api.azurewebsites.net/api';

function adminWindow(props) {
	const [ games, setGames ] = useState([]);
	const [ showLoginDialog, setShowLoginDialog ] = useState(true);
	const [ loginId, setLoginId ] = useState('');

	const [ showAddMember, setShowAddMember ] = useState(false);
	const [ showDeleteMember, setShowDeleteMember ] = useState(false);
	const [ showAllMembers, setShowAllMembers ] = useState(false);
	const [ showAllMembersRefresh, setShowAllMembersRefresh ] = useState(false);

	const [ showAddWishlistEntry, setShowAddWishlistEntry ] = useState(false);
	const [ showDeleteWishlistEntry, setShowDeleteWishlistEntry ] = useState(false);

	const [ showWishlistSelections, setShowWishlistSelections ] = useState(false);
	const [ showWishlistSelectionsRefresh, setShowWishlistSelectionsRefresh ] = useState(false);

	const [ showGetWishlistGameId, setShowGetWishlistGameId ] = useState(false);
	const [ showGameIdToModify, setShowGameIdToModify ] = useState('');
	const [ showModifyWishlistEntry, setShowModifyWishlistEntry ] = useState(false);
	const [ showModifyWishlistEntryRefresh, setShowModifyWishlistEntryRefresh ] = useState(true);

	const [ showSuccess, setShowSuccess ] = useState(false);
	const [ successMessage, setSuccessMessage ] = useState('');

	if (games.length === 0) {
		console.log('populating games...');
		const getGamesIds = props.games.map((x) => ({
			gameTitle: x.gameTitle,
			gameId: x.gameId
		}));
		setGames(getGamesIds);
		console.log(getGamesIds);
	}

	function resetAllViews() {
		setShowAllMembers(false);
		setShowWishlistSelections(false);
		setShowModifyWishlistEntry(false);
	}

	return (
		<div>
			<link
				rel="stylesheet"
				href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
				integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
				crossOrigin="anonymous"
			/>
			<Navbar bg="dark" variant="dark" expand="lg">
				<Navbar.Brand href="#home">Oticon Board Games Club (Admin view)</Navbar.Brand>
				<Nav className="mr-auto">
					<Button variant="outline-success" onClick={() => setShowAddMember(true)}>
						Add member
					</Button>
					<Button variant="outline-success" onClick={() => setShowDeleteMember(true)}>
						Delete member
					</Button>
					<Button
						variant="outline-success"
						onClick={() => {
							resetAllViews();
							setShowAllMembers(true);
							setShowAllMembersRefresh(true);
						}}
					>
						Get all members
					</Button>

					<Button variant="outline-success" onClick={() => setShowAddWishlistEntry(true)}>
						Add wishlist
					</Button>
					<Button variant="outline-success" onClick={() => setShowDeleteWishlistEntry(true)}>
						Delete wishlist
					</Button>
					<Button
						variant="outline-success"
						onClick={() => {
							resetAllViews();
							setShowWishlistSelections(true);
							setShowWishlistSelectionsRefresh(true);
						}}
					>
						Wishlist Selections
					</Button>
					<Button variant="outline-success" onClick={() => alert('Not supported YET!')} disabled>
						Sync with BGG
					</Button>
					<Button
						variant="outline-success"
						onClick={() => {
							resetAllViews();
							setShowGetWishlistGameId(true);
							setShowModifyWishlistEntryRefresh(true);
						}}
					>
						Modify Game
					</Button>
					<Button variant="outline-success" href="/">
						Wishlist
					</Button>
				</Nav>
				<Navbar.Text>{loginId !== '' ? 'Logged in as: ' + loginId : ''}</Navbar.Text>
			</Navbar>

			<LoginDialog
				baseUrl={baseUrl}
				show={showLoginDialog ? true : false}
				setShow={() => setShowLoginDialog(false)}
				setLoginId={(x) => setLoginId(x)}
			/>

			<GetWishlistGameId
				show={showGetWishlistGameId}
				games={games}
				setShow={(x) => setShowGetWishlistGameId(x)}
				gameId={showGameIdToModify}
				setGameId={(x) => setShowGameIdToModify(x)}
				showModifyWishlistEntry={(x) => setShowModifyWishlistEntry(x)}
			/>

			{showModifyWishlistEntry ? (
				<ModifyWishlistEntry
					baseUrl={baseUrl}
					gameId={showGameIdToModify}
					refresh={showModifyWishlistEntryRefresh}
					setRefresh={() => setShowModifyWishlistEntryRefresh(false)}
				/>
			) : null}

			<AddMember
				baseUrl={baseUrl}
				show={showAddMember}
				setShow={(x) => setShowAddMember(x)}
				success={(x) => setShowSuccess(x)}
				successMessage={(x) => setSuccessMessage(x)}
			/>

			<DeleteMember
				baseUrl={baseUrl}
				show={showDeleteMember}
				setShow={(x) => setShowDeleteMember(x)}
				success={(x) => setShowSuccess(x)}
				successMessage={(x) => setSuccessMessage(x)}
			/>

			{showAllMembers ? (
				<GetAllMembers
					baseUrl={baseUrl}
					refresh={showAllMembersRefresh}
					setRefresh={() => setShowAllMembersRefresh(false)}
				/>
			) : null}

			<AddWishlistEntry
				baseUrl={baseUrl}
				show={showAddWishlistEntry}
				setShow={(x) => setShowAddWishlistEntry(x)}
				success={(x) => setShowSuccess(x)}
				successMessage={(x) => setSuccessMessage(x)}
			/>

			<DeleteWishlistEntry
				baseUrl={baseUrl}
				show={showDeleteWishlistEntry}
				setShow={(x) => setShowDeleteWishlistEntry(x)}
				success={(x) => setShowSuccess(x)}
				successMessage={(x) => setSuccessMessage(x)}
			/>

			{showWishlistSelections ? (
				<GetWishlistSelections
					baseUrl={baseUrl}
					refresh={showWishlistSelectionsRefresh}
					setRefresh={() => setShowWishlistSelectionsRefresh(false)}
				/>
			) : null}

			<SuccessSubmit
				showSuccess={showSuccess}
				setShowSuccess={() => setShowSuccess(false)}
				message={successMessage}
			/>
		</div>
	);
}

adminWindow.getInitialProps = async function() {
	const response = await fetch(`${baseUrl}/GetWishlist`);
	const data = await response.json();
	return { games: data.map((entry) => entry) };
};

export default adminWindow;
