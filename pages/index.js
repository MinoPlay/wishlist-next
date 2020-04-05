import { useState } from "react";
import fetch from "isomorphic-unfetch";
import ReactTextCollapse from "react-text-collapse";
import Header from "../components/Header";
import LoginDialog from "../components/LoginDialog";
import { Provider } from "react-redux";
import store from "../redux/store";
import WeightDropdown from "../components/WeightDropdown";

const columns = [
  "Select",
  "",
  "Title",
  "Description",
  "Players",
  "Playtime",
  "MinAge"
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
  const [selectedGamesNames, setSelectedGamesNames] = useState([]);
  const [showSubmitDialog, setShowSubmitDialog] = useState(true);
  const [loginId, setLoginId] = useState("unknown");

  //control the available selection for weight dropdowns
  const [availableDropdowns, setAvailableDropdowns] = useState([5, 3, 2, 1, 0]);

  function clearEverything() {
    console.log(
      "invoking clearEverything (for now do nothing, need to implement"
    );
    // document
    //   .querySelectorAll("input[type=checkbox]")
    //   .forEach(el => (el.checked = false));
    // setSelectedGames([]);
    // setSelectedGamesNames([]);
  }

  function onSelectSelection(x) {
    console.log("enter onSelectSelection");
    if (selectedGames.includes(x.gameId)) {
      selectedGames.splice(selectedGames.indexOf(x.gameId), 1);
      selectedGamesNames.splice(selectedGamesNames.indexOf(x.gameTitle), 1);

      setSelectedGames(selectedGames);
      setSelectedGamesNames(selectedGamesNames);
      console.log(selectedGames);
      console.log(selectedGamesNames);
    } else {
      selectedGames.push(x.gameId);
      selectedGamesNames.push(x.gameTitle);
      setSelectedGames(selectedGames);
      setSelectedGamesNames(selectedGamesNames);
      console.log(selectedGames);
      console.log(selectedGamesNames);
    }
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
          show={showSubmitDialog ? true : false}
          setShow={() => setShowSubmitDialog(false)}
          setLoginId={x => setLoginId(x)}
        />
        <Header
          selectedGames={selectedGames}
          selectedGamesNames={selectedGamesNames}
          clearEverything={clearEverything}
          loginId={loginId}
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
                    {/* <input
                      id={x.gameId}
                      type="checkbox"
                      }
                    /> */}
                    <WeightDropdown
                      availableDropdowns={availableDropdowns}
                      setAvailableDropdowns={setAvailableDropdowns}
                      onSelectSelection={() => onSelectSelection(x)}
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
  // const response = await fetch(
  //   "https://bgg-api.azurewebsites.net/api/GetWishlistDetailedLocalTable?code=4GcBaUuR/mQWefy9Lu9DBN2kLZ2Al2Ju4sasuwNho7aqWe3zchW5KQ=="
  // );
  const data = await response.json();
  return { games: data.map(entry => entry) };
};
