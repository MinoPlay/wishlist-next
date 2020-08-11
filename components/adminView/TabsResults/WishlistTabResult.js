import AddWishlistEntry from '../Wishlist/AddWishlistEntry';
import DeleteWishlistEntry from '../Wishlist/DeleteWishlistEntry';
import GetWishlistSelections from '../WishlistSelection/GetWishlistSelections';
import ModifyWishlistEntry from '../Wishlist/ModifyWishlistEntry';
import GetWishlistGameId from '../Wishlist/GetWishlistGameId';

export default function WishlistTabResult(props) {
	return (
		<div>
			<GetWishlistGameId
				show={props.showGetWishlistGameId}
				games={props.games}
				setShow={(x) => props.setShowGetWishlistGameId(x)}
				gameId={props.showGameIdToModify}
				setGameId={(x) => props.setShowGameIdToModify(x)}
				showModifyWishlistEntry={(x) => props.setShowModifyWishlistEntry(x)}
			/>
			{props.showModifyWishlistEntry ? (
				<ModifyWishlistEntry
					baseUrl={props.baseUrl}
					gameId={props.showGameIdToModify}
					refresh={props.showModifyWishlistEntryRefresh}
					setRefresh={() => props.setShowModifyWishlistEntryRefresh(false)}
				/>
			) : null}

			<AddWishlistEntry
				baseUrl={props.baseUrl}
				show={props.showAddWishlistEntry}
				setShow={(x) => props.setShowAddWishlistEntry(x)}
				success={(x) => props.setShowSuccess(x)}
				successMessage={(x) => props.setSuccessMessage(x)}
			/>
			<DeleteWishlistEntry
				baseUrl={props.baseUrl}
				show={props.showDeleteWishlistEntry}
				games={props.games}
				setShow={(x) => props.setShowDeleteWishlistEntry(x)}
				success={(x) => props.setShowSuccess(x)}
				successMessage={(x) => props.setSuccessMessage(x)}
			/>
			{props.showWishlistSelections ? (
				<GetWishlistSelections
					baseUrl={props.baseUrl}
					refresh={props.showWishlistSelectionsRefresh}
					setRefresh={() => props.setShowWishlistSelectionsRefresh(false)}
				/>
			) : null}
		</div>
	);
}
