import react, { useState } from 'react';
import fetch from 'isomorphic-unfetch';
import { Container, Row, Col } from 'react-bootstrap';

const columns = ['Thumbnail', 'Title', 'Description', 'Players', 'Playtime', 'MinAge', 'Select'];

export default function index(props) {
	const [selectedGames, setSelectedGames] = useState([]);
	return (
		<div>
			<link
				rel="stylesheet"
				href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
				integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4"
				crossorigin="anonymous"
			/>
			<table className="table table-dark">
				<thead>
					<tr>
						{columns.map(x => (
							<th scope="col" key={x}>
								{x}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{props.games.map(x => {
						return (
							<tr>
								<td>
									<img src={x.thumbnail} />
								</td>
								<td>{x.gameTitle}</td>
								<td>{x.description}</td>
								<td>
									{x.minplayers}-{x.maxplayers}
								</td>
								<td>
									{x.minplaytime}-{x.maxplaytime}
								</td>
								<td>{x.minage}</td>
								<td>
									<input
										type="checkbox"
										onChange={(e, d) => {
											setSelectedGames(selectedGames.concat(x.gameTitle));
											console.log(selectedGames);
										}}
									/>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

index.getInitialProps = async function() {
	const response = await fetch(
		'https://bgg-api.azurewebsites.net/api/GetWishlistDetailedLocalTable?code=4GcBaUuR/mQWefy9Lu9DBN2kLZ2Al2Ju4sasuwNho7aqWe3zchW5KQ=='
	);
	const data = await response.json();
	return { games: data.map(entry => entry) };
};
