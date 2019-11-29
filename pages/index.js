import { useState } from "react";
import fetch from "isomorphic-unfetch";
import ReactTextCollapse from "react-text-collapse";

const columns = [
  "Thumbnail",
  "Title",
  "Description",
  "Players",
  "Playtime",
  "MinAge",
  "Select"
];

const TEXT_COLLAPSE_OPTIONS = {
  collapse: false, // default state when component rendered
  collapseText: "... show more", // text to show when collapsed
  expandText: "show less", // text to show when expanded
  minHeight: 100, // component height when closed
  maxHeight: 250 // expanded to
};

export default function index(props) {
  const [selectedGames, setSelectedGames] = useState([]);
  return (
    <div>
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossOrigin="anonymous"
      />
      <table className="table table-hover table-striped table-dark table-sm">
        <thead>
          <tr>
            {columns.map(x => (
              <th style={{ textAlign: "center" }} scope="col" key={x}>
                {x}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.games.map(x => {
            return (
              <tr>
                <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                  <input
                    id={x.gameId}
                    type="checkbox"
                    onChange={() => {
                      if (selectedGames.includes(x.gameId)) {
                        selectedGames.splice(
                          selectedGames.indexOf(x.gameId),
                          1
                        );
                        setSelectedGames(selectedGames);
                        console.log("removed element:" + x.gameId);
                      } else {
                        console.log("adding element:" + x.gameId);
                        selectedGames.push(x.gameId);
                        setSelectedGames(selectedGames);
                        console.log(selectedGames);
                      }
                    }}
                  />
                </td>
                <td style={{ textAlign: "center" }}>
                  <img src={x.thumbnail} />
                </td>
                <td>{x.gameTitle}</td>
                <td>
                  <ReactTextCollapse options={TEXT_COLLAPSE_OPTIONS}>
                    {x.description}
                  </ReactTextCollapse>
                </td>
                <td style={{ textAlign: "center" }}>
                  {x.minplayers}-{x.maxplayers}
                </td>
                <td style={{ textAlign: "center" }}>
                  {x.minplaytime}-{x.maxplaytime}
                </td>
                <td style={{ textAlign: "center" }}>{x.minage}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <script
        src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
        integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
        crossOrigin="anonymous"
      ></script>
      <script
        src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
        integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
        crossOrigin="anonymous"
      ></script>
      <script
        src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
        integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
        crossOrigin="anonymous"
      ></script>
    </div>
  );
}

index.getInitialProps = async function() {
  const response = await fetch(
    "http://localhost:7071/api/GetWishlistDetailedLocalTable"
  );
  //const response = await fetch('https://bgg-api.azurewebsites.net/api/GetWishlistDetailedLocalTable?code=4GcBaUuR/mQWefy9Lu9DBN2kLZ2Al2Ju4sasuwNho7aqWe3zchW5KQ==');
  const data = await response.json();
  return { games: data.map(entry => entry) };
};
