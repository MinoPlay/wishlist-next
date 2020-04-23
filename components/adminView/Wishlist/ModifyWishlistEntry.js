import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import React from 'react';
import fetch from 'isomorphic-unfetch';

async function FetchWishlistSelection(baseUrl, gameId) {
	console.log(`Validating login ID ${gameId}`);
	var buildUrl = `${baseUrl}/GetGame?gameId=${gameId}`;
	const response = await fetch(buildUrl);
	const responseJson = await response.json();
	return responseJson;
}

async function UpdateGame(
	baseUrl,
	gameId,
	minplayers,
	maxplayers,
	minplaytime,
	maxplaytime,
	minage,
	languageDependence,
	averageWeight
) {
	console.log('updateGame');
	var parameters = `gameId=${gameId}&minplayers=${minplayers}&maxplayers=${maxplayers}&minplaytime=${minplaytime}&maxplaytime=${maxplaytime}&minage=${minage}&languageDependence=${languageDependence}&averageWeight=${averageWeight}`;
	var buildUrl = `${baseUrl}/UpdateGame?${parameters}`;
	const response = await fetch(buildUrl);
	console.log(response.status);
}

const columns = [
	{
		dataField: 'Name',
		text: 'Name'
	},
	{
		dataField: 'Value',
		text: 'Value'
	}
];

function ModifyWishlistEntry(props) {
	//const [ wishlistSelection, setWishlistSelection ] = useState('');
	const [ gameId, setGameId ] = useState('');
	const [ gameTitle, setGameTitle ] = useState('');
	const [ thumbnail, setThumbnail ] = useState('');
	const [ description, setDescription ] = useState('');
	const [ minplayers, setMinPlayers ] = useState('');
	const [ maxplayers, setMaxPlayers ] = useState('');
	const [ minplaytime, setMinPlaytime ] = useState('');
	const [ maxplaytime, setMaxPlaytime ] = useState('');
	const [ minage, setMinage ] = useState('');
	const [ languageDependence, setLanguageDependence ] = useState('');
	const [ averageWeight, setAverageWeight ] = useState('');
	const [ baseUrl, setBaseUrl ] = useState('');

	if (props.refresh) {
		FetchWishlistSelection(props.baseUrl, props.gameId).then((wishlistSelection) => {
			//setWishlistSelection(response);
			setGameId(wishlistSelection['gameId']);
			setGameTitle(wishlistSelection['gameTitle']);
			setThumbnail(<img src={wishlistSelection['thumbnail']} />);
			setDescription(wishlistSelection['description']);
			setMinPlayers(wishlistSelection['minplayers']);
			setMaxPlayers(wishlistSelection['maxplayers']);
			setMinPlaytime(wishlistSelection['minplaytime']);
			setMaxPlaytime(wishlistSelection['maxplaytime']);
			setMinage(wishlistSelection['minage']);
			setLanguageDependence(wishlistSelection['languageDependence']);
			setAverageWeight(wishlistSelection['averageWeight']);
			setBaseUrl(props.baseUrl);
		});
		//console.log(wishlistSelection);

		props.setRefresh();
	}

	let data = [
		{ Name: 'gameId', Value: gameId },
		{ Name: 'gameTitle', Value: gameTitle },
		{ Name: 'thumbnail', Value: thumbnail },
		{ Name: 'description', Value: description },
		{ Name: 'minplayers', Value: minplayers },
		{ Name: 'maxplayers', Value: maxplayers },
		{ Name: 'minplaytime', Value: minplaytime },
		{ Name: 'maxplaytime', Value: maxplaytime },
		{ Name: 'minage', Value: minage },
		{ Name: 'languageDependence', Value: languageDependence },
		{ Name: 'averageWeight', Value: averageWeight }
	];

	const cellEdit = cellEditFactory({
		mode: 'click',
		beforeSaveCell(oldValue, newValue, row, column, done) {
			console.log(row.Name);
			// if (row.Name === 'gameId') {
			// 	setGameId(newValue);
			// } else if (row.Name === 'gameTitle') {
			// 	setGameTitle(newValue);
			// } else if (row.Name === 'description') {
			// 	setDescription(newValue);
			// }
			// else if (row.Name === 'thumbnail') {
			// 	setThumbnail(newValue);
			// }
			if (row.Name === 'minplayers') {
				setMinPlayers(newValue);
			} else if (row.Name === 'maxplayers') {
				setMaxPlayers(newValue);
			} else if (row.Name === 'minplaytime') {
				setMinPlaytime(newValue);
			} else if (row.Name === 'maxplaytime') {
				setMaxPlaytime(newValue);
			} else if (row.Name === 'minage') {
				setMinage(newValue);
			} else if (row.Name === 'languageDependence') {
				setLanguageDependence(newValue);
			} else if (row.Name === 'averageWeight') {
				setAverageWeight(newValue);
			}

			done();
			return { async: true };
		}
	});

	return (
		<div>
			<BootstrapTable keyField="id" data={data} columns={columns} cellEdit={cellEdit} />
			<Button
				onClick={() =>
					UpdateGame(
						baseUrl,
						gameId,
						minplayers,
						maxplayers,
						minplaytime,
						maxplaytime,
						minage,
						languageDependence,
						averageWeight
					)}
				block
			>
				Update
			</Button>
		</div>
	);
}

export default ModifyWishlistEntry;
