import AddMember from '../Members/AddMember';
import DeleteMember from '../Members/DeleteMember';
import GetAllMembers from '../Members/GetAllMembers';

export default function MembersTabResult(props) {
	return (
		<div>
			<AddMember
				baseUrl={props.baseUrl}
				show={props.showAddMember}
				setShow={(x) => props.setShowAddMember(x)}
				success={(x) => props.setShowSuccess(x)}
				successMessage={(x) => props.setSuccessMessage(x)}
			/>
			<DeleteMember
				baseUrl={props.baseUrl}
				members={props.members}
				show={props.showDeleteMember}
				setShow={(x) => props.setShowDeleteMember(x)}
				success={(x) => props.setShowSuccess(x)}
				successMessage={(x) => props.setSuccessMessage(x)}
			/>
			{props.showAllMembers ? (
				<GetAllMembers
					baseUrl={props.baseUrl}
					refresh={props.showAllMembersRefresh}
					setRefresh={() => props.setShowAllMembersRefresh()}
				/>
			) : null}
		</div>
	);
}
