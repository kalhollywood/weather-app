import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { CircleF, MarkerF } from "@react-google-maps/api";

function MapContainer(props) {

  // This code determines the style of the Google Maps window
  const mapStyles = {
    height: "250px",
    width: "100vw",
    position: 'relative',
    borderRadius: "15px",
    boxShadow: "10px -2px 20px 2px grey inset"
  };

  // This code styles the circle on the map
  const options = {
    strokeColor: "#598392",
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
        className="google-map"
        mapContainerStyle={mapStyles}
        zoom={12}
        center={props.centerObj}
      >
        <CircleF
          options={options}
          center={props.userLocation}
        />
        <MarkerF
          position={props.userLocation} />

      </GoogleMap>
    </LoadScript>
  );
}
export default MapContainer;