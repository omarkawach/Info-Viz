import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import Legend from "./Legend.js";
import csd from "../data/CSDs_LFLs.json";


const Map = () => {
  const [onselect, setOnselect] = useState({});

  /* function determining what should happen onmouseover, this function updates our state*/
  const highlightFeature = (e) => {
    var layer = e.target;
    // const { County, Total, Male, Female, Intersex, Desnity } = e.target.feature.properties;
    // setOnselect({
    //     county:County,
    //     total:Total,
    //     male:Male,
    //     female:Female,
    //     intersex:Intersex,
    //     density: Desnity
    // });
    layer.setStyle({
      weight: 1,
      color: "black",
      fillOpacity: 0.6,
      fillColor: "#78716e",
    });
  };

  /*resets our state i.e no properties should be displayed when a feature is not clicked or hovered over */
  const resetHighlight = (e) => {
    // setOnselect({});
    e.target.setStyle(style(e.target.feature));
  };


  /* this function is called when a feature in the map is hovered over or when a mouse moves out of it, the function calls two functions
     highlightFeature and resetHighlight*/
  const onEachFeature = (feature, layer) => {
    layer.bindPopup("my tooltip text");
    // layer.bindTooltip("my tooltip text").openTooltip();
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
    });
  };

  const style = (feature) => {
    return {
      fillColor: "#54c5d5",
      weight: 1,
      opacity: 1,
      color: "black",
      fillOpacity: 0.6,
    };
  };

  let data = Array.from(csd);

  const feature = data.map(feature => feature);

  return (
    <MapContainer
      center={[48.4284, -123.7656]}
      zoom={10}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {feature && (
        <GeoJSON style={style} data={csd} onEachFeature={onEachFeature} />
      )}

      {/* {lflData.map(lfl => {
            <Marker key = {lfl.name} position={[lfl.lat, lfl.lon]}>
            <Popup position={[lfl.lat, lfl.lon]}>
                <div>
                <h2>{`name: ${lfl.name}`}</h2>
                </div>
            </Popup>
            </Marker>
        })} */}

    {/* <Legend /> */}
    </MapContainer>
  );
};

export default Map;
