import React from 'react';
import { NavDropdown } from 'react-bootstrap';

export default function WishlistTab(props) {
	function populateGames() {
		const getGamesIds = props.games.map((x) => ({
			gameTitle: x.gameTitle,
			gameId: x.gameId
		}));

		props.setGames(getGamesIds);
	}
	return (
		<div>
			<NavDropdown title="Wishlist" id="basic-nav-dropdown">
				<NavDropdown.Item onClick={() => props.setShowAddWishlistEntry()}>Add game</NavDropdown.Item>
				<NavDropdown.Divider />
				<NavDropdown.Item
					onClick={() => {
						populateGames();
						props.setShowDeleteWishlistEntry();
					}}
				>
					Delete game
				</NavDropdown.Item>
				<NavDropdown.Divider />
				<NavDropdown.Item
					onClick={() => {
						props.resetAllViews();
						props.setShowWishlistSelections();
						props.setShowWishlistSelectionsRefresh();
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
						props.resetAllViews();
						populateGames();
						props.setShowGetWishlistGameId();
						props.setShowModifyWishlistEntryRefresh();
					}}
				>
					Modify Game
				</NavDropdown.Item>
				<NavDropdown.Divider />
			</NavDropdown>
		</div>
	);
}
