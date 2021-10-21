import React from "react";
import ReactDOM from "react-dom";
import Title from "./components/Title.js";
import Map from "./components/Map.js";
import Chart from "./components/Chart.js";
import "./index.css";


function App() {
  return (
    <div className="app">
    
      <Title />

      <div className="sideBySide">
        <Chart />
        <Map />
      </div>

    </div>
  );
}

ReactDOM.render(
  <React.Fragment>
    <App />
  </React.Fragment>,
  document.getElementById("root")
);
