import { useState } from "react";
import fetch from "isomorphic-unfetch";
import ReactTextCollapse from "react-text-collapse";
import Header from "../components/Header";
import LoginDialog from "../components/LoginDialog";
import { Provider } from "react-redux";
import store from "../redux/store";

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
  const [showDialog, setShowDialog] = useState(true);

  function clearEverything() {
    console.log("invoking clearEverything");
    document
      .querySelectorAll("input[type=checkbox]")
      .forEach(el => (el.checked = false));
    setSelectedGames([]);
  }
  return (
    <Provider store={store}>
      <div>
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        />
        <LoginDialog
          show={showDialog ? true : false}
          setShow={x => setShowDialog(false)}
        />
        <Header
          selectedGames={selectedGames}
          clearEverything={clearEverything}
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
      </div>
    </Provider>
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
