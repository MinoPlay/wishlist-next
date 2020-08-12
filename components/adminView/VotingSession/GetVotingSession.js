import { useState } from 'react';
import React from 'react';
import fetch from 'isomorphic-unfetch';
import Button from 'react-bootstrap/Button';
import BootstrapTable from 'react-bootstrap-table-next';

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

	if (props.refresh) {
		FetchVotingSessionEntries(props.baseUrl, props.currentVotingSession).then((fetchResponse) => {
			const res = fetchResponse.map((vse) => ({
				VotingSessionId: vse.votingSessionEntryId,
				VotingSessionEntryId: vse.votingSessionId,
				GameId: vse.gameId,
				GameTitle: vse.gameTitle,
				Remove: (
					<Button
						variant="danger"
						onClick={() => {
							DeleteVotingSessionEntry(props.baseUrl, vse.votingSessionEntryId);
							props.setRefresh(true);
						}}
					>
						Remove
					</Button>
				)
			}));
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
			/>
		</div>
	);
}

export default GetVotingSession;
