import { useState } from 'react';
import React from 'react';
import fetch from 'isomorphic-unfetch';
import BootstrapTable from 'react-bootstrap-table-next';
import GameStatesDropdown from '../components/adminView/GameState/GameStatesDropdown';

async function FetchAllGames(baseUrl) {
	var buildUrl = `${baseUrl}/GetAllGames`;
	const result = await fetch(buildUrl);
	const data = await result.json();
	return data;
}

const columns = [
	{
		dataField: 'Id',
		text: 'Id',
		sort: true,
		headerAlign: 'center'
	},
	{
		dataField: 'Title',
		text: 'Title',
		sort: true,
		headerAlign: 'center'
	},
	{
		dataField: 'State',
		text: 'State',
		sort: true,
		headerAlign: 'center'
	}
];

function gamesOverview() {
	const [ allGames, setAllGames ] = useState([]);
	const [ data, setData ] = useState([]);
	const [ refreshGames, setRefreshGames ] = useState(true);
	const [ refresh, setRefresh ] = useState(true);
	const baseUrl = 'http://localhost:7071/api';

	if (refreshGames) {
		FetchAllGames(baseUrl).then((response) => {
			const tempGames = response.map((x) => ({
				gameId: x.gameId,
				gameTitle: x.gameTitle,
				gameState: x.gameState
			}));
			setAllGames(tempGames);
			setRefreshGames(false);
		});
	}

	if (!refreshGames && refresh) {
		const tempData = allGames.map((x) => ({
			Id: x.gameId,
			Title: x.gameTitle,

			State: <GameStatesDropdown baseUrl={baseUrl} gameId={x.gameId} defaultSelection={x.gameState} />
		}));

		setData(tempData);
		setRefresh(false);
	}

	return (
		<div>
			<link
				rel="stylesheet"
				href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
				integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
				crossOrigin="anonymous"
			/>
			<BootstrapTable
				keyField="Id"
				data={data}
				columns={columns}
				bordered={false}
				rowStyle={{ textAlign: 'center' }}
				hover
			/>
		</div>
	);
}

export default gamesOverview;
