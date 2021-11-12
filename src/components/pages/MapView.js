import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { useLocation } from "react-router-dom";

const defaultCenter = [37.0902, -100.546875];
const defaultZoom = 4;

function MapView() {
  const [map, setMap] = useState(null);
  const proxy = "http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}";

  return (
    <div>
      <MapContainer
        whenCreated={setMap}
        center={defaultCenter}
        zoom={defaultZoom}
      >
        <TileLayer
          url={proxy}
          maxZoom={20}
          subdomains={["mt0", "mt1", "mt2", "mt3"]}
        />
      </MapContainer>
    </div>
  );
}

export default MapView;
