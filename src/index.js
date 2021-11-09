import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

import Title from "./components/Title.js";
import Chart from "./components/Chart.js";
import Map from "./components/Map.js";

import LoadCSD from "./helpers/LoadCSD.js";
import LoadLFL from "./helpers/LoadLFL.js";

import "./index.css";

// Initialized to pass data through the component tree effortlessly
export const ChartContext = React.createContext();

function App() {
  // useRef is used since we do not want to render each time the selected chart element is changed
  let chartElementSelected = useRef();

  const [censusSubDivisions, setCensusSubDivisions] = useState([]);
  const [littleLibraries, setLittleLibraries] = useState([]);;

  const loadData = () => {
    const loadCSD = new LoadCSD();
    loadCSD.load(setCensusSubDivisions);

    const loadLFL = new LoadLFL();
    loadLFL.load(setLittleLibraries);
  }

  // Fetch / set data after rendering
  useEffect(() => {
    loadData();     
    chartElementSelected.current = {
      value: null
    };
  }, []);

  return (
    <div className="app">
      <Title />
      <div className="sideBySide"> 
        {/* Pass value to all the children */}
        <ChartContext.Provider value = { chartElementSelected } >
          <Chart />
          <Map censusSubDivisions = { censusSubDivisions } littleLibraries = { littleLibraries } />
        </ChartContext.Provider>
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
