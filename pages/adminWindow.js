import React from 'react';
import { useState } from 'react';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import LoginDialogAdmin from '../components/LoginDialogAdmin';
import SuccessSubmit from '../components/SuccessSubmit';
import GetVotingSession from '../components/adminView/VotingSession/GetVotingSession';
import SelectVotingSession from '../components/adminView/VotingSession/SelectVotingSession';
import fetch from 'isomorphic-unfetch';
import MemberTab from '../components/adminView/Tabs/MembersTab';
import MembersTabResult from '../components/adminView/TabsResults/MembersTabResult';
import WishlistTab from '../components/adminView/Tabs/WishlistTab';
import WishlistTabResult from '../components/adminView/TabsResults/WishlistTabResult';
import AddVotingSession from '../components/adminView/VotingSession/AddVotingSession';
import DeleteVotingSession from '../components/adminView/VotingSession/DeleteVotingSession';

const devMode = true;
const baseUrl = 'https://bgg-api-test.azurewebsites.net/api';
//const baseUrl = devMode ? 'http://localhost:7071/api' : 'https://bgg-api.azurewebsites.net/api';

async function FetchAllVotingSessions(baseUrl) {
	var buildUrl = `${baseUrl}/GetAllVotingSessions`;
	const result = await fetch(buildUrl);
	const data = await result.json();
	return data.map((x) => x.sessionId);
}

function adminWindow(props) {
	const [ enabled, enable ] = useState(devMode ? true : false);
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

	const [ showAddVotingSession, setShowAddVotingSession ] = useState(false);

	const [ votingSessions, setVotingSessions ] = useState([]);
	const [ showSelectVotingSession, setShowSelectVotingSession ] = useState(false);
	const [ currentVotingSession, setCurrentVotingSession ] = useState('');

	const [ showDeleteVotingSession, setShowDeleteVotingSession ] = useState(false);

	const [ showVotingSession, setShowVotingSession ] = useState(false);
	const [ refreshVotingSession, setRefreshVotingSession ] = useState(true);

	function resetAllViews() {
		setShowAllMembers(false);
		setShowWishlistSelections(false);
		setShowModifyWishlistEntry(false);
		setShowVotingSession(false);
	}

	async function populateMembers() {
		const response2 = await fetch(`${baseUrl}/GetAllMembers`);
		const data2 = await response2.json();
		setMembers(data2.map((entry) => entry.initials));
	}

	async function populateGames() {
		const response = await fetch(`${baseUrl}/GetWishlist`);
		const data = await response.json();
		const getGamesIds = data.map((x) => ({
			gameTitle: x.gameTitle,
			gameId: x.gameId
		}));

		setGames(getGamesIds);
	}

	async function populateVotingSessions() {
		const fetchedVotingSessions = await FetchAllVotingSessions(baseUrl);
		console.log(fetchedVotingSessions);
		setVotingSessions(fetchedVotingSessions);
	}

	return (
		<div>
			<link
				rel="stylesheet"
				href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
				integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
				crossOrigin="anonymous"
			/>
			{enabled ? (
				<Navbar bg="dark" variant="dark" expand="lg">
					<Navbar.Brand href="#home">Oticon Board Games Club (Admin view)</Navbar.Brand>
					<Nav className="mr-auto">
						<MemberTab
							populateMembers={() => populateMembers()}
							setMembers={(x) => setMembers(x)}
							setShowAddMember={() => setShowAddMember(true)}
							setShowDeleteMember={() => setShowDeleteMember(true)}
							resetAllViews={() => resetAllViews()}
							setShowAllMembers={() => setShowAllMembers(true)}
							setShowAllMembersRefresh={() => setShowAllMembersRefresh(true)}
						/>

						<WishlistTab
							populateGames={() => populateGames()}
							setGames={(x) => setGames(x)}
							setShowAddWishlistEntry={() => setShowAddWishlistEntry(true)}
							setShowDeleteWishlistEntry={() => setShowDeleteWishlistEntry(true)}
							resetAllViews={() => resetAllViews()}
							setShowWishlistSelections={() => setShowWishlistSelections(true)}
							setShowWishlistSelectionsRefresh={() => setShowWishlistSelectionsRefresh(true)}
							setShowGetWishlistGameId={() => setShowGetWishlistGameId(true)}
							setShowModifyWishlistEntryRefresh={() => setShowModifyWishlistEntryRefresh(true)}
						/>

						<NavDropdown title="Voting Session" id="basic-nav-dropdown">
							<NavDropdown.Item onClick={() => setShowAddVotingSession(true)}>
								Create session
							</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item
								onClick={() => {
									setShowDeleteVotingSession(true);
									populateVotingSessions();
									resetAllViews();
								}}
							>
								Delete session
							</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item disabled>Voting sessions</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item
								onClick={() => {
									setShowSelectVotingSession(true);
									populateGames();
									populateVotingSessions();
								}}
							>
								Modify session
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
			) : null}
			<LoginDialogAdmin
				baseUrl={baseUrl}
				show={showLoginDialog ? true : false}
				setShow={() => {
					setShowLoginDialog(false);
					enable(true);
				}}
				setLoginId={(x) => setLoginId(x)}
			/>

			<MembersTabResult
				baseUrl={baseUrl}
				showAddMember={showAddMember}
				setShowAddMember={(x) => setShowAddMember(x)}
				setShowSuccess={(x) => setShowSuccess(x)}
				setSuccessMessage={(x) => setSuccessMessage(x)}
				members={members}
				showDeleteMember={showDeleteMember}
				setShowDeleteMember={(x) => setShowDeleteMember(x)}
				showAllMembers={showAllMembers}
				showAllMembersRefresh={showAllMembersRefresh}
				setShowAllMembersRefresh={() => setShowAllMembersRefresh(false)}
			/>

			<WishlistTabResult
				showGetWishlistGameId={showGetWishlistGameId}
				games={games}
				setShowGetWishlistGameId={(x) => setShowGetWishlistGameId(x)}
				showGameIdToModify={showGameIdToModify}
				setShowGameIdToModify={(x) => setShowGameIdToModify(x)}
				setShowModifyWishlistEntry={(x) => setShowModifyWishlistEntry(x)}
				showModifyWishlistEntry={showModifyWishlistEntry}
				baseUrl={baseUrl}
				showModifyWishlistEntryRefresh={showModifyWishlistEntryRefresh}
				setShowModifyWishlistEntryRefresh={() => setShowModifyWishlistEntryRefresh(false)}
				showAddWishlistEntry={showAddWishlistEntry}
				setShowAddWishlistEntry={(x) => setShowAddWishlistEntry(x)}
				setShowSuccess={(x) => setShowSuccess(x)}
				setSuccessMessage={(x) => setSuccessMessage(x)}
				showDeleteWishlistEntry={showDeleteWishlistEntry}
				setShowDeleteWishlistEntry={(x) => setShowDeleteWishlistEntry(x)}
				showWishlistSelections={showWishlistSelections}
				showWishlistSelectionsRefresh={showWishlistSelectionsRefresh}
				setShowWishlistSelectionsRefresh={() => setShowWishlistSelectionsRefresh(false)}
			/>

			<SuccessSubmit
				showSuccess={showSuccess}
				setShowSuccess={() => setShowSuccess(false)}
				message={successMessage}
			/>

			<AddVotingSession
				baseUrl={baseUrl}
				show={showAddVotingSession}
				setShow={(x) => setShowAddVotingSession(x)}
				setCurrentVotingSession={(x) => {
					setCurrentVotingSession(x);
					resetAllViews();
					setRefreshVotingSession(true);
					setShowVotingSession(true);
				}}
			/>

			{showVotingSession ? (
				<GetVotingSession
					baseUrl={baseUrl}
					games={games}
					currentVotingSession={currentVotingSession}
					refresh={refreshVotingSession}
					setRefresh={(x) => setRefreshVotingSession(x)}
				/>
			) : null}

			<SelectVotingSession
				baseUrl={baseUrl}
				votingSessions={votingSessions}
				show={showSelectVotingSession}
				setShow={(x) => setShowSelectVotingSession(x)}
				setCurrentVotingSession={(x) => {
					setCurrentVotingSession(x);
					resetAllViews();
					setRefreshVotingSession(true);
					setShowVotingSession(true);
				}}
			/>

			<DeleteVotingSession
				baseUrl={baseUrl}
				votingSessions={votingSessions}
				show={showDeleteVotingSession}
				setShow={(x) => setShowDeleteVotingSession(x)}
			/>
		</div>
	);
}

export default adminWindow;
