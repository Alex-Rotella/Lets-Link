import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { useLocation } from "react-router-dom";
import L from "leaflet";
import icon from "../../constants";
import MapCards from "../MapCards";

const defaultCenter = [37.0902, -100.546875];
const defaultZoom = 3;

function MapView() {
  const location = useLocation();
  const proxy = "http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}";
  const { checkboxPreferences, peopleValue, budgetValue } = location.state;
  const selectedPreferences = checkboxPreferences.filter(({ isChecked }) => isChecked);
  function LocationMarker() {
    const [position, setPosition] = useState(null);
    const [bbox, setBbox] = useState([]);
    const [loading, setLoading] = useState(true);
    const map = useMap();

    useEffect(() => {
      setLoading(false);
      map.locate().on("locationfound", function (e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, 14);
        setBbox(e.bounds.toBBoxString().split(","));
      });
    }, [map]);

    if (loading) {
      return <div> Locating </div>;
    } 
    else {
      return position === null ? null : (
        <Marker position={position} icon={icon}>
          <Popup>
            You are here. <br />
            <b>Southwest lng</b>: {bbox[0]} <br />
            <b>Southwest lat</b>: {bbox[1]} <br />
            <b>Northeast lng</b>: {bbox[2]} <br />
            <b>Northeast lat</b>: {bbox[3]}
          </Popup>
        </Marker>
      );
    }
  }
  return (
    <div>
      <div>
        {console.log(selectedPreferences)}
        {console.log(peopleValue)}
        {console.log(budgetValue)}
        <MapContainer center={defaultCenter} zoom={defaultZoom}>
          <TileLayer
            url={proxy}
            maxZoom={20}
            subdomains={["mt0", "mt1", "mt2", "mt3"]}
          />
          <LocationMarker />
        </MapContainer>
      </div>
      <div>
        <MapCards />
      </div>
    </div>
  );
}

export default MapView;
