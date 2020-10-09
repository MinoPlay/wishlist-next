import Dropdown from 'react-bootstrap/Dropdown';
import React from 'react';
import { useState } from 'react';

async function FetchAllAvailableGamesStates(baseUrl) {
	var buildUrl = `${baseUrl}/GetAvailableGameStates`;
	const result = await fetch(buildUrl);
	const data = await result.json();
	return data.map((x) => x.availableState);
}

async function UpdateState(baseUrl, gameId, newState) {
	var buildUrl = `${baseUrl}/SetGameState?gameId=${gameId}&gameState=${newState}`;
	const response = await fetch(buildUrl);
	return response;
}

function GameStatesDropdown(props) {
	const [ selection, setSelection ] = useState(props.defaultSelection);
	const [ availableGameStates, setAvailableGameStates ] = useState([]);
	const [ refresh, setRefresh ] = useState(true);

	if (refresh) {
		FetchAllAvailableGamesStates(props.baseUrl).then((response) => {
			const tmpState = response.map((x) => x);
			setAvailableGameStates(tmpState);
		});

		setRefresh(false);
	}

	return (
		<Dropdown>
			<Dropdown.Toggle id="dropdown-basic">{selection}</Dropdown.Toggle>
			<Dropdown.Menu>
				{availableGameStates.map((x) => (
					<Dropdown.Item
						key={x}
						eventKey={x}
						onSelect={() => setSelection(x)}
						onSelect={() => UpdateState(props.buildUrl, props.gameId, x)}
					>
						<Dropdown.Divider />
						{x}
					</Dropdown.Item>
				))}
			</Dropdown.Menu>
		</Dropdown>
	);
}

export default GameStatesDropdown;
