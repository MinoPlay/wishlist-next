import { useState } from 'react';
import fetch from 'isomorphic-unfetch';
import ReactTextCollapse from 'react-text-collapse';
import Header from '../components/Header';
import LoginDialog from '../components/LoginDialog';
import WeightDropdown from '../components/WeightDropdown';

const columns = [
	'Select',
	'',
	'Title',
	'Description',
	'Players',
	'Playtime',
	'MinAge',
	'Avg. Weight',
	'Language requirement'
];

const TEXT_COLLAPSE_OPTIONS = {
	collapse: false, // default state when component rendered
	collapseText: '... show more', // text to show when collapsed
	expandText: 'show less', // text to show when expanded
	minHeight: 100, // component height when closed
	maxHeight: 250 // expanded to
};

export default function index(props) {
	const [ gameSelections, setGameSelections ] = useState([]);
	const [ showSubmitDialog, setShowSubmitDialog ] = useState(true);
	const [ loginId, setLoginId ] = useState('unknown');

	//control the available selection for weight dropdowns
	const [ availableDropdowns, setAvailableDropdowns ] = useState([ 5, 3, 2, 1, 0 ]);

	function clearEverything() {
		console.log('invoking clearEverything (for now do nothing, need to implement');
		// document
		//   .querySelectorAll("input[type=checkbox]")
		//   .forEach(el => (el.checked = false));
		// setSelectedGames([]);
		// setSelectedGamesNames([]);
	}

	function onSelectSelection(x, weight) {
		console.log('enter onSelectSelection');
		var matchIndex = gameSelections.findIndex((gs) => gs.gameId == x.gameId);
		if (matchIndex != -1) {
			gameSelections.splice(matchIndex, 1);
			if (weight != 0) {
				//we are changing the weight
				console.log('weight more than 0');
				gameSelections.push({
					gameId: x.gameId,
					gameTitle: x.gameTitle,
					weight: weight
				});
			}

			setGameSelections(gameSelections);
			console.log(gameSelections);
		} else {
			gameSelections.push({
				gameId: x.gameId,
				gameTitle: x.gameTitle,
				weight: weight
			});
			setGameSelections(gameSelections);
			console.log(gameSelections);
		}
	}

	return (
		<div>
			<link
				rel="stylesheet"
				href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
				integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
				crossOrigin="anonymous"
			/>
			{/* <LoginDialog
				show={showSubmitDialog ? true : false}
				setShow={() => setShowSubmitDialog(false)}
				setLoginId={(x) => setLoginId(x)}
			/> */}
			<Header gameSelections={gameSelections} clearEverything={clearEverything} loginId={loginId} />
			<table className="table table-hover table-striped table-dark table-sm">
				<thead>
					<tr>
						{columns.map((x) => (
							<th style={{ textAlign: 'center', verticalAlign: 'middle' }} scope="col" key={x}>
								{x}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{props.games.map((x) => {
						return (
							<tr key={x.gameId}>
								<td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
									<WeightDropdown
										availableDropdowns={availableDropdowns}
										setAvailableDropdowns={setAvailableDropdowns}
										onSelectSelection={(a) => onSelectSelection(x, a)}
									/>
								</td>
								<td style={{ textAlign: 'center' }}>
									<img src={x.thumbnail} />
								</td>
								<td>{x.gameTitle}</td>
								<td>
									<ReactTextCollapse options={TEXT_COLLAPSE_OPTIONS}>
										{x.description}
									</ReactTextCollapse>
								</td>
								<td style={{ textAlign: 'center' }}>
									{x.minplayers}-{x.maxplayers}
								</td>
								<td style={{ textAlign: 'center' }}>
									{x.minplaytime}-{x.maxplaytime}
								</td>
								<td style={{ textAlign: 'center' }}>{x.minage}</td>
								<td style={{ textAlign: 'center' }}>{Math.round(x.averageWeight * 100) / 100}</td>
								<td style={{ textAlign: 'center' }}>{x.languageDependence}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

index.getInitialProps = async function() {
	const response = await fetch('http://localhost:7071/api/GetWishlist');
	// const response = await fetch(
	//   "https://bgg-api.azurewebsites.net/api/GetWishlist?code=4GcBaUuR/mQWefy9Lu9DBN2kLZ2Al2Ju4sasuwNho7aqWe3zchW5KQ=="
	// );
	const data = await response.json();
	return { games: data.map((entry) => entry) };
};
