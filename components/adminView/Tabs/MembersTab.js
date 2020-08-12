import React from 'react';
import { NavDropdown } from 'react-bootstrap';

export default function MembersTab(props) {
	return (
		<div>
			<NavDropdown title="Members" id="basic-nav-dropdown">
				<NavDropdown.Item onClick={() => props.setShowAddMember()}>Add member</NavDropdown.Item>
				<NavDropdown.Divider />
				<NavDropdown.Item
					onClick={() => {
						props.setShowDeleteMember();
						props.populateMembers();
					}}
				>
					Delete member
				</NavDropdown.Item>
				<NavDropdown.Divider />
				<NavDropdown.Item
					onClick={() => {
						props.resetAllViews();
						props.setShowAllMembers();
						props.setShowAllMembersRefresh();
					}}
				>
					Get all members
				</NavDropdown.Item>
			</NavDropdown>
		</div>
	);
}
