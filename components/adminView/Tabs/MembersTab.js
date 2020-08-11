import React from 'react';
import { NavDropdown } from 'react-bootstrap';

export default function MembersTab(props) {
	function populateMembers() {
		props.setMembers(props.members);
	}

	return (
		<div>
			<NavDropdown title="Members" id="basic-nav-dropdown">
				<NavDropdown.Item onClick={() => props.setShowAddMember()}>Add member</NavDropdown.Item>
				<NavDropdown.Divider />
				<NavDropdown.Item
					onClick={() => {
						props.setShowDeleteMember();
						populateMembers();
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
