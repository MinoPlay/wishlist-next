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

const devMode = true;
const baseUrl = devMode ? 'http://localhost:7071/api' : 'https://bgg-api-test.azurewebsites.net/api';

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

	const [ votingSessions, setVotingSessions ] = useState([]);
	const [ showVotingSessions, setShowVotingSessions ] = useState(false);
	const [ currentVotingSession, setCurrentVotingSession ] = useState('');

	const [ showVotingSession, setShowVotingSession ] = useState(false);
	const [ refreshVotingSession, setRefreshVotingSession ] = useState(true);

	function resetAllViews() {
		setShowAllMembers(false);
		setShowWishlistSelections(false);
		setShowModifyWishlistEntry(false);
		setShowVotingSession(false);
	}

	function populateVotingSessions() {
		console.log('populating votingSessions...');
		console.log(props.votingSessions);
		setVotingSessions(props.votingSessions);
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
							members={props.members}
							setMembers={(x) => setMembers(x)}
							setShowAddMember={() => setShowAddMember(true)}
							setShowDeleteMember={() => setShowDeleteMember(true)}
							resetAllViews={() => resetAllViews()}
							setShowAllMembers={() => setShowAllMembers(true)}
							setShowAllMembersRefresh={() => setShowAllMembersRefresh(true)}
						/>

						<WishlistTab
							games={props.games}
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
							<NavDropdown.Item>Create session</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item>Delete session</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item>Voting sessions</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item
								onClick={() => {
									setShowVotingSessions(true);
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
				members={props.members}
				showDeleteMember={showDeleteMember}
				setShowDeleteMember={(x) => setShowDeleteMember(x)}
				showAllMembers={showAllMembers}
				showAllMembersRefresh={showAllMembersRefresh}
				setShowAllMembersRefresh={() => setShowAllMembersRefresh(false)}
			/>

			<WishlistTabResult
				showGetWishlistGameId={showGetWishlistGameId}
				games={props.games}
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

			{showVotingSession ? (
				<GetVotingSession
					baseUrl={baseUrl}
					currentVotingSession={currentVotingSession}
					refresh={refreshVotingSession}
					setRefresh={() => setRefreshVotingSession(false)}
				/>
			) : null}

			<SelectVotingSession
				baseUrl={baseUrl}
				votingSessions={votingSessions}
				show={showVotingSessions}
				setShow={(x) => setShowVotingSessions(x)}
				setCurrentVotingSession={(x) => {
					setCurrentVotingSession(x);
					setRefreshVotingSession(true);
					setShowVotingSession(true);
				}}
			/>
		</div>
	);
}

adminWindow.getInitialProps = async function() {
	const response = await fetch(`${baseUrl}/GetWishlist`);
	const data = await response.json();
	const response2 = await fetch(`${baseUrl}/GetAllMembers`);
	const data2 = await response2.json();

	const fetchedVotingSessions = await FetchAllVotingSessions(baseUrl);

	return {
		games: data.map((entry) => entry),
		members: data2.map((entry) => entry.initials),
		votingSessions: fetchedVotingSessions
	};
};

export default adminWindow;
