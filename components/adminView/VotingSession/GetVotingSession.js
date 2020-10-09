import { useState } from 'react';
import React from 'react';
import fetch from 'isomorphic-unfetch';
import Button from 'react-bootstrap/Button';
import BootstrapTable from 'react-bootstrap-table-next';
import AddVotingSessionEntry from '../VotingSession/AddVotingSessionEntry';
import SuccessSubmit from '../../SuccessSubmit';

async function FetchVotingSessionEntries(baseUrl, sessionId) {
	var buildUrl = `${baseUrl}/GetVotingSessionEntries?votingSessionId=${sessionId}`;
	const result = await fetch(buildUrl);
	const data = await result.json();
	return data;
}

async function DeleteVotingSessionEntry(baseUrl, sessionEntryId) {
	var buildUrl = `${baseUrl}/DeleteVotingSessionEntry?votingSessionId=${sessionEntryId}`;
	const result = await fetch(buildUrl);
	console.log(result);
	return result.status;
}

const columns = [
	{
		dataField: 'VotingSessionId',
		text: 'Voting session',
		sort: true,
		headerAlign: 'center'
	},
	{
		dataField: 'VotingSessionEntryId',
		text: 'Voting session entry',
		sort: true,
		headerAlign: 'center'
	},
	{
		dataField: 'GameId',
		text: 'Game Id',
		sort: true,
		headerAlign: 'center'
	},
	{
		dataField: 'GameTitle',
		text: 'Game Title',
		sort: true,
		headerAlign: 'center'
	},
	{
		dataField: 'Remove',
		text: 'Remove',
		sort: true,
		headerAlign: 'center'
	}
];

function GetVotingSession(props) {
	const [ votingSessionEntries, setVotingSessionEntries ] = useState([]);
	const [ showAddVotingSessionEntry, setShowAddVotingSessionEntry ] = useState(false);
	const [ showSuccess, setShowSuccess ] = useState(false);
	const [ successMessage, setSuccessMessage ] = useState('');

	if (props.refresh) {
		FetchVotingSessionEntries(props.baseUrl, props.currentVotingSession).then((fetchResponse) => {
			var res = fetchResponse.map((vse) => ({
				VotingSessionId: vse.votingSessionEntryId,
				VotingSessionEntryId: vse.votingSessionId,
				GameId: vse.gameId,
				GameTitle: vse.gameTitle,
				Remove: (
					<Button
						variant="danger"
						onClick={() => {
							DeleteVotingSessionEntry(props.baseUrl, vse.votingSessionEntryId).then((x) => {
								if (x === 200) {
									setShowSuccess(true);
									setSuccessMessage(`Successfully deleted '${vse.gameTitle}'`);
									props.setRefresh(true);
								}
							});
						}}
					>
						Remove
					</Button>
				)
			}));
			res.push({
				VotingSessionId: '',
				VotingSessionEntryId: '',
				GameId: '',
				GameTitle: '',
				Remove: (
					<Button
						variant="success"
						onClick={() => {
							setShowAddVotingSessionEntry(true);
						}}
					>
						Add
					</Button>
				)
			});
			setVotingSessionEntries(res);
		});
		props.setRefresh(false);
	}

	return (
		<div>
			<BootstrapTable
				keyField="id"
				data={votingSessionEntries}
				columns={columns}
				bordered={false}
				rowStyle={{ textAlign: 'center' }}
				hover
				noDataIndication="Table is Empty"
			/>

			<AddVotingSessionEntry
				games={props.games}
				baseUrl={props.baseUrl}
				sessionId={props.currentVotingSession}
				success={(x) => setShowSuccess(x)}
				successMessage={(x) => setSuccessMessage(x)}
				setShow={(x) => setShowAddVotingSessionEntry(x)}
				setRefresh={() => props.setRefresh(true)}
				show={showAddVotingSessionEntry}
			/>
			<SuccessSubmit
				showSuccess={showSuccess}
				setShowSuccess={() => setShowSuccess(false)}
				message={successMessage}
			/>
		</div>
	);
}

export default GetVotingSession;
