import { useState } from "react";
import React from "react";
import fetch from "isomorphic-unfetch";
import ReactTextCollapse from "react-text-collapse";
import Header from "../components/Header";
import LoginDialog from "../components/LoginDialog";
import WeightDropdown from "../components/WeightDropdown";
import BootstrapTable from "react-bootstrap-table-next";

//const baseUrl = "http://localhost:7071/api";
const baseUrl = "https://bgg-api.azurewebsites.net/api";

const columns2 = [
  {
    dataField: "Select",
    text: "Select",
    headerAlign: "center",
  },
  {
    dataField: "Thumbnail",
    text: "",
    headerAlign: "center",
  },
  {
    dataField: "Title",
    text: "Title",
    sort: true,
    headerAlign: "center",
  },
  {
    dataField: "Description",
    text: "Description",
    headerAlign: "center",
  },
  {
    dataField: "Players",
    text: "Players",
    sort: true,
    headerAlign: "center",
  },
  {
    dataField: "Playtime",
    text: "Playtime",
    sort: true,
    headerAlign: "center",
  },
  {
    dataField: "MinAge",
    text: "MinAge",
    sort: true,
    headerAlign: "center",
  },
  {
    dataField: "AvgWeight",
    text: "Avg. Weight",
    sort: true,
    headerAlign: "center",
  },
  {
    dataField: "LanguageRequirement",
    text: "Language requirement",
    sort: true,
    headerAlign: "center",
  },
  {
    dataField: "Ranking",
    text: "Ranking",
    sort: true,
    headerAlign: "center",
  },
];

const TEXT_COLLAPSE_OPTIONS = {
  collapse: false, // default state when component rendered
  collapseText: "... show more", // text to show when collapsed
  expandText: "show less", // text to show when expanded
  minHeight: 100, // component height when closed
  maxHeight: 250, // expanded to
};

export default function index(props) {
  const devMode = false;
  const [gameSelections, setGameSelections] = useState([]);
  const [showLoginDialog, setShowLoginDialog] = useState(
    devMode ? false : true
  );
  const [loginId, setLoginId] = useState("unknown");

  //control the available selection for weight dropdowns
  const [availableDropdowns, setAvailableDropdowns] = useState([
    6,
    5,
    4,
    3,
    2,
    1,
    0,
  ]);

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

  let data = props.games.map((x) => ({
    Select: (
      <WeightDropdown
        availableDropdowns={availableDropdowns}
        setAvailableDropdowns={setAvailableDropdowns}
        onSelectSelection={(a) => onSelectSelection(x, a)}
      />
    ),
    Thumbnail: (
      <a
        href={`https://boardgamegeek.com/boardgame/${x.gameId}`}
        target="_blank"
      >
        <img src={x.thumbnail} />
      </a>
    ),
    Title: x.gameTitle,
    Description: (
      <ReactTextCollapse options={TEXT_COLLAPSE_OPTIONS}>
        <div dangerouslySetInnerHTML={{ __html: x.description }} />
      </ReactTextCollapse>
    ),
    Players: `${x.minplayers}-${x.maxplayers}`,
    Playtime: `${x.minplaytime}-${x.maxplaytime}`,
    MinAge: parseInt(x.minage),
    AvgWeight: Math.round(x.averageWeight * 100) / 100,
    LanguageRequirement: x.languageDependence,
    Ranking: x.ranking,
  }));

  function onSelectSelection(x, weight) {
    console.log("enter onSelectSelection");
    var matchIndex = gameSelections.findIndex((gs) => gs.gameId == x.gameId);
    if (matchIndex != -1) {
      gameSelections.splice(matchIndex, 1);
      if (weight != 0) {
        //we are changing the weight
        console.log("weight more than 0");
        gameSelections.push({
          gameId: x.gameId,
          gameTitle: x.gameTitle,
          weight: weight,
        });
      }

      setGameSelections(gameSelections);
      console.log(gameSelections);
    } else {
      gameSelections.push({
        gameId: x.gameId,
        gameTitle: x.gameTitle,
        weight: weight,
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
      <LoginDialog
        baseUrl={baseUrl}
        show={showLoginDialog ? true : false}
        setShow={() => setShowLoginDialog(false)}
        setLoginId={(x) => setLoginId(x)}
      />
      <Header
        baseUrl={baseUrl}
        gameSelections={gameSelections}
        clearEverything={clearEverything}
        loginId={loginId}
      />
      <BootstrapTable
        keyField="id"
        data={data}
        columns={columns2}
        bordered={false}
      />
    </div>
  );
}

index.getInitialProps = async function () {
  const response = await fetch(`${baseUrl}/GetWishlist`);
  const data = await response.json();
  return { games: data.map((entry) => entry) };
};
