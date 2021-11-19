import React from "react";
import ReactDOM from "react-dom";

import Title from "./components/Title.js";
import Chart from "./components/Chart.js";
import Map from "./components/Map.js";
import Dropdown from "./components/Dropdown.js";
import Dropdown2 from "./components/Dropdown2.js";
import Footer from "./components/Footer.js";


import "./index.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

      value: 1,
      map: null,
      chart: 1,
      legend: 1
    };

    this.onChartElementClick = this.onChartElementClick.bind(this);

    this.onMapCreate = this.onMapCreate.bind(this);

    this.onDropdownSelection = this.onDropdownSelection.bind(this);
    
    this.onDropdown2Selection = this.onDropdown2Selection.bind(this);
  }

  onChartElementClick(currSelected) {
    this.setState({
      value:currSelected,
      map: this.state.map,
      chart: this.state.chart,
      legend: this.state.legend
    });
  }

  onMapCreate(map) {
    this.setState({
      value: this.state.value,
      map: map,
      chart: this.state.chart,
      legend: this.state.legend
    });
  }

  onDropdownSelection(selected) {
      debugger;
    this.setState({
      value: this.state.value,
      map: this.state.map,
      chart: selected,
      legend: this.state.coloured
    });
  }

  onDropdown2Selection(coloured) {
      debugger;
    this.setState({
      value: this.state.value,
      map: this.state.map,
      chart: this.state.chart,
      legend: coloured
    });
  }

  render() {
    return (
      <div className="app">
        <Title />
        <div className="sideBySide">
            <div className="topBottom">
                <Dropdown onDropdownSelection={this.onDropdownSelection} />
                <Dropdown2 onDropdown2Selection={this.onDropdown2Selection} />
                <Chart state={this.state} onChartElementClick={this.onChartElementClick} />
            </div>
            <Map state={this.state} onMapCreate={this.onMapCreate}/>
        </div>
        <Footer />
      </div>
    );
  }
}

ReactDOM.render(
  <React.Fragment>
    <App />
  </React.Fragment>,
  document.getElementById("root")
);
