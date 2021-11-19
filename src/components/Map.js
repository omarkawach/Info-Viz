import React from "react";
import { MapContainer, TileLayer, GeoJSON, LayersControl } from "react-leaflet";
import Legend from "./Legend.js";

import { features } from "../data/CSDs_LFLs.json";
// import { features } from "../data/LFLs_assigned.json";

export default class Map extends React.Component {
  defaultStyle = (feature) => {
    return {
      fillColor: "#54c5d5",
      weight: 1,
      opacity: 1,
      color: "black",
      fillOpacity: 0.6,
    };
  };

  highlightStyle = () => {
    return {
      fillColor: "#78716e",
      weight: 1,
      opacity: 1,
      color: "black",
      fillOpacity: 0.6,
    };
  };

  onEachCSD = (csd, layer) => {
    const name = csd.properties["Census subdivision name"];

    layer.bindTooltip(name).openTooltip();

    layer.on({
      mouseover: this.highlightFeature,
      mouseout: this.resetHighlight,
    });
  };

  highlightFeature = (e) => {
    var layer = e.target;

    layer.setStyle({
      weight: 1,
      color: "black",
      fillOpacity: 0.6,
      fillColor: "#78716e",
    });
  };

  resetHighlight = (e) => {
    e.target.setStyle(this.defaultStyle(e.target.feature));
  };

  setMap(map) {
    this.props.onMapCreate(map);
  }

  handleFeatureSelection(layer) {
    if (!layer.feature) return;

    if (layer.feature.properties["Census subdivision name"] === this.props.state.prevSelected) {
      layer.setStyle(this.defaultStyle(layer.feature));
    }

    if (layer.feature.properties["Census subdivision name"] === this.props.state.selected) {
      layer.setStyle(this.highlightStyle(layer.feature));

      let csd = layer.feature.properties["Census subdivision name"];
      let english = layer.feature.properties["English"];

      this.props.state.map._controlCorners.bottomleft.innerHTML =
        `<div class='info leaflet-control'>` +
        `<h2><span>${csd}</span></h2>` +
        `<h4><span>English: ${english}</span></h4>` +
        `</div>`;
    }
  }

  render() {
    if (this.props.state.map != null) {
      this.props.state.map.eachLayer((layer) => {
        this.handleFeatureSelection(layer);
      }, this);
    }

    return (
      <MapContainer
        center={[48.4284, -123.7656]}
        zoom={9}
        scrollWheelZoom={true}
        whenCreated={this.setMap.bind(this)}
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="OpenStreetMap">
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>

          <LayersControl.Overlay checked name="Census Subdivisions">
            <GeoJSON
              style={this.defaultStyle}
              data={features}
              onEachFeature={this.onEachCSD}
            />
          </LayersControl.Overlay>
        </LayersControl>
        <Legend />
      </MapContainer>
    );
  }
}
