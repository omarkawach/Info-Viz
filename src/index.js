import React from "react";
import ReactDOM from "react-dom";
import Title from "./components/Title.js";
import Chart from "./components/Chart.js";
import Map from "./components/Map.js";
import Dropdown from "./components/Dropdown.js";
import Dropdown2 from "./components/Dropdown2.js";
import Footer from "./components/Footer.js";
import "./index.css";
import info from "./data/data.json";


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 1,
      map: null,
      selectedFeature: null,
      chart: 1,
      legend: 1,
      infoPanel: info
    };

    this.onMapCreate = this.onMapCreate.bind(this);

    this.onMapFeatureClick = this.onMapFeatureClick.bind(this);

    this.onDropdownSelection = this.onDropdownSelection.bind(this);
    
    this.onDropdown2Selection = this.onDropdown2Selection.bind(this);
  }

  onMapCreate(map) {
    this.setState({
      value: this.state.value,
      map: map,
      selectedFeature: this.state.selectedFeature,
      chart: this.state.chart,
      legend: this.state.legend,
      infoPanel: this.state.infoPanel
    });
  }

  onMapFeatureClick(selected) {
    this.setState({
      value: this.state.value,
      map: this.state.map,
      selectedFeature: selected,
      chart: this.state.chart,
      legend: this.state.legend,
      infoPanel: this.state.infoPanel
    });
  }

  onDropdownSelection(selected) {
    this.setState({
      value: this.state.value,
      map: this.state.map,
      selectedFeature: this.state.selectedFeature,
      chart: selected,
      legend: this.state.coloured,
      infoPanel: this.state.infoPanel
    });
  }

  onDropdown2Selection(coloured) {
    this.setState({
      value: this.state.value,
      map: this.state.map,
      selectedFeature: this.state.selectedFeature,
      chart: this.state.chart,
      legend: coloured,
      infoPanel: this.state.infoPanel
    });
  }

  render() {
    return (
      <div className="app">
        <Title />
        <div className="sideBySide">
            <div className="topBottom">
                <Dropdown onDropdownSelection={this.onDropdownSelection} />
                <Dropdown2 state={this.state} onDropdown2Selection={this.onDropdown2Selection} />
                <Chart state={this.state} onChartElementClick={this.onChartElementClick} />
            </div>
            <Map state={this.state} onMapCreate={this.onMapCreate} onMapFeatureClick={this.onMapFeatureClick}/>
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
