import React from "react";
import ReactDOM from "react-dom";

import Title from "./components/Title.js";
import Chart from "./components/Chart.js";
import Map from "./components/Map.js";
import Footer from "./components/Footer.js";

import "./index.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      prevSelected: "",
      selected: "",
      map: null
    };

    this.onChartElementClick = this.onChartElementClick.bind(this);

    this.onMapCreate = this.onMapCreate.bind(this);
  }

  onChartElementClick(currSelected) {
    this.setState({
      prevSelected: this.state.selected,
      selected: currSelected,
      map: this.state.map
    });
  }

  onMapCreate(map) {
    this.setState({
      selected: this.state.selected,
      map: map
    });
  }

  render() {
    return (
      <div className="app">
        <Title />
        <div className="sideBySide">
          <Chart onChartElementClick={this.onChartElementClick} />
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
