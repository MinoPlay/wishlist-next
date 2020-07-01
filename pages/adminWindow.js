import React from 'react';
import { useState } from 'react';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
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

const devMode = true;
const baseUrl = devMode ? 'http://localhost:7071/api' : 'https://bgg-api.azurewebsites.net/api';

function adminWindow(props) {
	const [ games, setGames ] = useState([]);
	const [ members, setMembers ] = useState([]);
	const [ showLoginDialog, setShowLoginDialog ] = useState(devMode ? false : true);
	const [ loginId, setLoginId ] = useState('unknown');

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

	function resetAllViews() {
		setShowAllMembers(false);
		setShowWishlistSelections(false);
		setShowModifyWishlistEntry(false);
	}

	function populateGames() {
		console.log('populating games...');
		const getGamesIds = props.games.map((x) => ({
			gameTitle: x.gameTitle,
			gameId: x.gameId
		}));
		console.log(getGamesIds);
		setGames(getGamesIds);
	}

	function populateMembers() {
		console.log('populating members...');
		console.log(props.members);
		setMembers(props.members);
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
					<NavDropdown title="Members" id="basic-nav-dropdown">
						<NavDropdown.Item onClick={() => setShowAddMember(true)}>Add member</NavDropdown.Item>
						<NavDropdown.Divider />
						<NavDropdown.Item
							onClick={() => {
								setShowDeleteMember(true);
								populateMembers();
							}}
						>
							Delete member
						</NavDropdown.Item>
						<NavDropdown.Divider />
						<NavDropdown.Item
							onClick={() => {
								resetAllViews();
								setShowAllMembers(true);
								setShowAllMembersRefresh(true);
							}}
						>
							Get all members
						</NavDropdown.Item>
					</NavDropdown>

					<NavDropdown title="Wishlist" id="basic-nav-dropdown">
						<NavDropdown.Item onClick={() => setShowAddWishlistEntry(true)}>Add game</NavDropdown.Item>
						<NavDropdown.Divider />
						<NavDropdown.Item
							onClick={() => {
								populateGames();
								setShowDeleteWishlistEntry(true);
							}}
						>
							Delete game
						</NavDropdown.Item>
						<NavDropdown.Divider />
						<NavDropdown.Item
							onClick={() => {
								resetAllViews();
								setShowWishlistSelections(true);
								setShowWishlistSelectionsRefresh(true);
							}}
						>
							Wishlist Selections
						</NavDropdown.Item>
						<NavDropdown.Divider />
						<NavDropdown.Item onClick={() => alert('Not supported YET!')} disabled>
							Sync with BGG
						</NavDropdown.Item>
						<NavDropdown.Divider />
						<NavDropdown.Item
							onClick={() => {
								resetAllViews();
								populateGames();
								setShowGetWishlistGameId(true);
								setShowModifyWishlistEntryRefresh(true);
							}}
						>
							Modify Game
						</NavDropdown.Item>
						<NavDropdown.Divider />
					</NavDropdown>
				</Nav>
				<Nav>
					<Button variant="outline-success" href="/">
						Back to wishlist
					</Button>
					<Navbar.Text>
						Logged in as: <a href="">{loginId}</a>
					</Navbar.Text>
				</Nav>
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
				members={members}
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
				games={games}
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
	const response2 = await fetch(`${baseUrl}/GetAllMembers`);
	const data2 = await response2.json();
	return { games: data.map((entry) => entry), members: data2.map((entry) => entry.initials) };
};

export default adminWindow;
