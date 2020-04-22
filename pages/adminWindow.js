import React from 'react';
import { useState } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import AddMember from '../components/adminView/Members/AddMember';
import DeleteMember from '../components/adminView/Members/DeleteMember';
import GetAllMembers from '../components/adminView/Members/GetAllMembers';
import AddWishlistEntry from '../components/adminView/Wishlist/AddWishlistEntry';
import DeleteWishlistEntry from '../components/adminView/Wishlist/DeleteWishlistEntry';
import GetWishlistSelections from '../components/adminView/WishlistSelection/GetWishlistSelections';
import ModifyWishlistEntry from '../components/adminView/Wishlist/ModifyWishlistEntry';
import GetWishlistGameId from '../components/adminView/Wishlist/GetWishlistGameId';
import SuccessSubmit from '../components/SuccessSubmit';

function adminWindow() {
	const [ showAddMember, setShowAddMember ] = useState(false);
	const [ showDeleteMember, setShowDeleteMember ] = useState(false);
	const [ showAllMembers, setShowAllMembers ] = useState(true);
	const [ showAllMembersRefresh, setShowAllMembersRefresh ] = useState(true);

	const [ showAddWishlistEntry, setShowAddWishlistEntry ] = useState(false);
	const [ showDeleteWishlistEntry, setShowDeleteWishlistEntry ] = useState(false);

	const [ showWishlistSelections, setShowWishlistSelections ] = useState(false);
	const [ showWishlistSelectionsRefresh, setShowWishlistSelectionsRefresh ] = useState(false);

	const [ showGetWishlistGameId, setShowGetWishlistGameId ] = useState(false);
	const [ showGameIdToModify, setShowGameIdToModify ] = useState('');
	const [ showModifyWishlistEntry, setShowModifyWishlistEntry ] = useState(false);
	const [ showModifyWishlistEntryRefresh, setShowModifyWishlistEntryRefresh ] = useState(true);

	const [ loginId, setLoginId ] = useState('MKUC');

	const [ showSuccess, setShowSuccess ] = useState(false);
	const [ successMessage, setSuccessMessage ] = useState('');

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

					<Button variant="outline-success" onClick={() => setShowAddMember(true)}>
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
				</Nav>
				<Navbar.Text>{loginId !== '' ? 'Logged in as: ' + loginId : ''}</Navbar.Text>
			</Navbar>

			<GetWishlistGameId
				show={showGetWishlistGameId}
				setShow={(x) => setShowGetWishlistGameId(x)}
				gameId={showGameIdToModify}
				setGameId={(x) => setShowGameIdToModify(x)}
				showModifyWishlistEntry={(x) => setShowModifyWishlistEntry(x)}
			/>

			{showModifyWishlistEntry ? (
				<ModifyWishlistEntry
					gameId={showGameIdToModify}
					refresh={showModifyWishlistEntryRefresh}
					setRefresh={() => setShowModifyWishlistEntryRefresh(false)}
				/>
			) : null}

			<AddMember
				show={showAddMember}
				setShow={(x) => setShowAddMember(x)}
				success={(x) => setShowSuccess(x)}
				successMessage={(x) => setSuccessMessage(x)}
			/>

			<DeleteMember
				show={showDeleteMember}
				setShow={(x) => setShowDeleteMember(x)}
				success={(x) => setShowSuccess(x)}
				successMessage={(x) => setSuccessMessage(x)}
			/>

			{showAllMembers ? (
				<GetAllMembers refresh={showAllMembersRefresh} setRefresh={() => setShowAllMembersRefresh(false)} />
			) : null}

			<AddWishlistEntry
				show={showAddWishlistEntry}
				setShow={(x) => setShowAddWishlistEntry(x)}
				success={(x) => setShowSuccess(x)}
				successMessage={(x) => setSuccessMessage(x)}
			/>

			<DeleteWishlistEntry
				show={showDeleteWishlistEntry}
				setShow={(x) => setShowDeleteWishlistEntry(x)}
				success={(x) => setShowSuccess(x)}
				successMessage={(x) => setSuccessMessage(x)}
			/>

			{showWishlistSelections ? (
				<GetWishlistSelections
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

export default adminWindow;

// function CreateButton(onClickFunc, buttonText, disabled) {
// 	return (
// 		<Button variant="outline-success" onClick={onClickFunc} disabled={disabled}>
// 			{buttonText}
// 		</Button>
// 	);
// }
// {CreateButton(() => setShowAddMember(true), 'Add member')}
// {CreateButton(() => setShowDeleteMember(true), 'Delete member')}
// {CreateButton(() => {
// 	resetAllViews();
// 	setShowAllMembers(true);
// 	setShowAllMembersRefresh(true);
// }, 'Get all members')}
// {CreateButton(() => setShowAddMember(true), 'Add wishlist')}
// {CreateButton(() => setShowDeleteWishlistEntry(true), 'Delete wishlist')}
// {CreateButton(() => {
// 	resetAllViews();
// 	setShowWishlistSelections(true);
// 	setshowWishlistSelectionsRefresh(true);
// }, 'Wishlist Selections')}
// {CreateButton(() => alert('Not supported YET!'), 'Sync with BGG', true)}
// {CreateButton(() => {
// 	resetAllViews();
// 	setShowGetWishlistGameId(true);
// 	setShowModifyWishlistEntryRefresh(true);
// }, 'Modify Game')}
