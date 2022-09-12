import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { CircleF, MarkerF } from "@react-google-maps/api";

function MapContainer() {
  const mapStyles = {
    height: "50%",
    width: "50%",
    position: 'relative',
  };

  const options = {
    strokeColor: "#006390",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#fbb02d",
    fillOpacity: 0.15,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 2000,
    zIndex: 3,
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyBfoRI7QkmzhSgXHoxVbguowVBzsWAn1G8">
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={15}
      // center={props.centerObj}
      >
        <CircleF
          options={options}
        />
        <MarkerF />

      </GoogleMap>
    </LoadScript>
  );
}
export default MapContainer;