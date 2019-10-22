import react from 'react';
import fetch from 'isomorphic-unfetch';
import { Container, Row, Col } from 'react-bootstrap';
import InsertGame from '../src/InsertGame.js';
import GetAllGames from '../src/GetAllGames.js';
import SearchWindow from '../src/SearchBar.js';

export default function index(props) {
	return (
		<div>
			<link
				rel="stylesheet"
				href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
				integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4"
				crossorigin="anonymous"
			/>
			<Container responsive="sm">
				{/* <Row>
          <Col>
            <GetAllGames games={props.games} />
          </Col>
        </Row>
        <Row>
          <Col>
            <InsertGame />
          </Col>
        </Row> */}
				<Row>
					<Col>
						<SearchWindow />
					</Col>
				</Row>
			</Container>
		</div>
	);
}

/* index.getInitialProps = async function() {
  const response = await fetch(
    "https://boad-games-club-api.azurewebsites.net/api/onGetAllGames?code=V3uyyQ6imbHw2hbLav2sYRVfCEMoi/6C0CeYLUqBnJIpvNRPMxpmmg=="
  );
  const data = await response.json();
  return { games: data.map(entry => entry) };
};
 */
