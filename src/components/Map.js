import React from "react";
import { MapContainer, TileLayer, GeoJSON, LayersControl } from "react-leaflet";
import Legend from "./Legend.js";

import { features } from "../data/CSDs_LFLs.json";
import lflFeatures  from "../data/LFLs_assigned.json";

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
    let name = csd.properties["Census subdivision name"];

    layer.bindTooltip(name).openTooltip();

    layer.on({ click: this.clicked.bind(this) });
  };

  onEachLibrary = (library, layer) => {
    layer.setOpacity(0);
    layer.options.interactive = false
  };

  clicked = (ev) => {
    let oldSelected = this.props.state.selectedFeature;
    let newSelected = ev.target;

    // If there is no previously selected feature, style the current selection
    if(oldSelected === null) {
      newSelected.setStyle(this.highlightStyle(newSelected.feature));
      
    } 
    // Un-highlight the re-selected feature
    else if (oldSelected.feature.properties["Census subdivision name"] === newSelected.feature.properties["Census subdivision name"]) {
      newSelected.setStyle(this.defaultStyle(newSelected.feature));
      newSelected = null;
    }
    // Un-highlight the old selected feature and highlight the new one
    else if (oldSelected.feature.properties["Census subdivision name"] !== newSelected.feature.properties["Census subdivision name"]) {
      oldSelected.setStyle(this.defaultStyle(oldSelected.feature));
      newSelected.setStyle(this.highlightStyle(newSelected.feature));
    }

    // Update the selected feature in index.js
    this.props.onMapFeatureClick(newSelected);

    // Show Libraries over the selected feature
    this.showLibraries();

    // Update legend info panel
    this.props.state.map._controlCorners.bottomleft.innerHTML = this.setInfoPanelHTML(newSelected);
  } 

  showLibraries() {
    if(this.props.state.selectedFeature === null) {
      // Set opacity to 0 for all existing libraries
      this.props.state.map.eachLayer((layer) => {
         if (!layer.feature || layer.feature.properties.Name === undefined) return;
           layer.setOpacity(0);
      }, this);
      return;
    }

    this.props.state.map.eachLayer((layer) => {
         if (!layer.feature || layer.feature.properties.Name === undefined) return;

         if (layer.feature.properties["Census subdivision name"] === this.props.state.selectedFeature.feature.properties["Census subdivision name"]) {
           layer.setOpacity(1);
         } else {
           layer.setOpacity(0);
         }
    }, this);
  }

  setInfoPanelHTML(target) {
    if(target == null) {
      return (
        `<div class='info leaflet-control'>` +
        `<h2><span>Waiting for Map Feature Selection...</span>&nbsp;</h2>` +
        `</div>`
      )
    }

    let info = `<div class='info leaflet-control'>`;

    let index = this.props.state.infoPanel.findIndex(x => x.id === target.feature.properties["Census subdivision name"]);

    let name = this.props.state.infoPanel[index].id

    let data = this.props.state.infoPanel[index].data[0];

    info += `<h2><span>${name}</span></h2>`;

    Object.entries(data).forEach(entry => {
      const [key, value] = entry;
      if(key === 'x' || key === 'y' || value === name) return;

      info += `<h3><span>${key}: ${value}</span></h4>`
    });

    info += `</div>`;

    return info;
  }

  setMap(map) {
    this.props.onMapCreate(map);
  }

  render() {
    return (
      <MapContainer
        center={[48.4284, -123.7656]}
        zoom={9}
        scrollWheelZoom={false}
        whenCreated={this.setMap.bind(this)}
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="OpenStreetMap">
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>

          <LayersControl.Overlay checked name="Little Free Libraries">
            <GeoJSON
              data={lflFeatures}
              onEachFeature={this.onEachLibrary}
            />
          </LayersControl.Overlay>

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
