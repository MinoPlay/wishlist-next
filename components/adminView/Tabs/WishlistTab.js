import React from 'react';
import { NavDropdown } from 'react-bootstrap';

export default function WishlistTab(props) {
	return (
		<div>
			<NavDropdown title="Wishlist" id="basic-nav-dropdown">
				<NavDropdown.Item onClick={() => props.setShowAddWishlistEntry()}>Add game</NavDropdown.Item>
				<NavDropdown.Divider />
				<NavDropdown.Item
					onClick={() => {
						props.populateGames();
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
						props.populateGames();
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
