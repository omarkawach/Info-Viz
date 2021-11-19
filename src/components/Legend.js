import React from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

class Legend extends React.Component {
  createControl() {
    const MapInfo = L.Control.extend({
      onAdd: (map) => {
        const panelDiv = L.DomUtil.create("div", "info");

         panelDiv.innerHTML = `<h2><span>Waiting on chart element selection...</span>&nbsp;</h2>`;

        return panelDiv;
      },
    });
    return new MapInfo({ position: "bottomleft" });
  }

  componentDidMount() {
    const { map } = this.props;
    const control = this.createControl();
    control.addTo(map);
  }

  render() {
    return null;
  }
}

function withMap(Component) {
  return function WrappedComponent(props) {
    const map = useMap();
    return <Component {...props} map={map} />;
  };
}

export default withMap(Legend);
