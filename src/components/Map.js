import React, { useState, useEffect, useContext } from "react";
import { MapContainer, TileLayer} from "react-leaflet";
import * as L from "leaflet";
import Legend from "./Legend.js";

import { ChartContext } from "../index.js";


function defaultStyle(feature) {
  return {
    fillColor: "#54c5d5",
    weight: 1,
    opacity: 1,
    color: "black",
    fillOpacity: 0.6,
  };
}

const Map = ({ censusSubDivisions, littleLibraries }) => {
  let context = useContext(ChartContext);

  const [map, setMap] = useState(null);

  useEffect(() => {
    if (!map) return;

    const highlightFeature = (e) => {
      var layer = e.target;

      layer.setStyle({
        weight: 1,
        color: "black",
        fillOpacity: 0.6,
        fillColor: "#78716e",
      });
    }

    const resetHighlight = (e) => { e.target.setStyle(defaultStyle(e.target.feature)); };

    const onEachCSD = (csd, layer) => {
      const name = csd.properties["Census subdivision name"];

      layer.bindTooltip(name).openTooltip();

      layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
      });
    };

    let csdGroup = new L.LayerGroup([
      new L.geoJSON(censusSubDivisions, { style: defaultStyle, onEachFeature: onEachCSD})
    ]).addTo(map);

    // Remove csd layer
    // csdGroup.eachLayer(function (layer) {
    //   layer.remove();
    // })

    // Add layer control to the top right of the map container
    var layerControl = new L.Control.Layers(null, {
      "Census Subdivisions": csdGroup,
    }).addTo(map);

  }, [map, censusSubDivisions, context]);

  return (
    <MapContainer whenCreated={setMap} center={[48.4284, -123.7656]} zoom={10} scrollWheelZoom={true} >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Legend />
    </MapContainer>
      
  );
};

export default Map;
