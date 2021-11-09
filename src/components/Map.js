import React from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
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

  onEachCSD = (csd, layer) => {
    const name = csd.properties["Census subdivision name"];

    layer.bindTooltip(name).openTooltip();

    layer.on({
      mouseover: this.highlightFeature,
      mouseout: this.resetHighlight,
    });
  };

  setMap(map) {
    this.props.onMapCreate(map);
  }

  render() {
    if (this.props.state.map != null) {
      this.props.state.map.eachLayer((layer) => {
        if (!layer.feature) return;

        if (layer.feature.properties["Census subdivision name"] === "Metchosin") {
          layer.setStyle(this.defaultStyle(layer.feature));

          layer.setStyle(this.highlightStyle(layer.feature));
        }
      });
    }

    return (
      <>
        {this.props.state.value && (
          <MapContainer
            center={[48.4284, -123.7656]}
            zoom={10}
            scrollWheelZoom={true}
            whenCreated={this.setMap.bind(this)}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <GeoJSON
              style={this.defaultStyle}
              data={features}
              onEachFeature={this.onEachCSD}
            />

            <Legend />
          </MapContainer>
        )}
      </>
    );
  }
}
