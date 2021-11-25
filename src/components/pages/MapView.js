import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { useLocation } from "react-router-dom";
import icon from "../../constants";
import ReactLeafletGoogleLayer from "react-leaflet-google-layer";
import { getRestaurantsData } from "../../api";
import { getAttractionsData } from "../../api";
import "../MapCards/MapCards.css";
import CardItem from "../MapCards/MapCardItem";
import { geocodeByPlaceId, getLatLng } from "react-google-places-autocomplete";

const API_KEY = process.env.REACT_APP_GOOGLE_KEY;

function MapView() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  var place1 = "Resturant";
  let place2 = "Movie Theater";
  let place3 = "Shopping Mall";

  let details = "Details for the place";
  const location = useLocation();
  const proxy = "http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}";
  const {
    checkboxPreferences,
    peopleValue,
    budgetValue,
    value,
  } = location.state;
  const selectedPreferences = checkboxPreferences.filter(
    ({ isChecked }) => isChecked
  );

  const [restaurants, setRestaurants] = useState([]);
  const [attractions, setAttractions] = useState([]);

  const defaultCenter = [37.0902, -100.546875];
  const defaultZoom = 3;

  const [map, setMap] = useState(null);

  function LocationMarker() {
    const [position, setPosition] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState({});

    useEffect(() => {
      let isMounted = true;
      var placeID = value.value.place_id;
      geocodeByPlaceId(placeID)
        .then((results) => getLatLng(results[0]))
        .then(({ lat, lng }) => {
          //console.log("Successfully got latitude and longitude", { lat, lng });
          if (isMounted) {
            setPosition({ lat: lat, lng: lng });
            setSelected({ lat: lat, lng: lng });
            setLoading(false);
          }
        });
      return () => {
        isMounted = false;
      };
    }, []);

    if (loading) {
      return <div> Loading... </div>;
    } else {
      map.setView(selected, 13);

      return position === null ? null : (
        <Marker position={position} icon={icon}>
          <Popup>
            You are here. <br />
          </Popup>
        </Marker>
      );
    }
  }
  // need to get api working
  // useEffect(() => {
  //   getRestaurantsData(selected.lat, selected.lng).then((data) => {
  //     setRestaurants(data);
  //     console.log(data)
  //   });
  //   getAttractionsData(selected.lat, selected.lng).then((data) => {
  //     setAttractions(data);
  //     console.log(data)
  //   });
  // }, []);
  return (
    <div>
      <div>
        <MapContainer
          whenCreated={setMap}
          center={defaultCenter}
          zoom={defaultZoom}
        >
          {/* <TileLayer
            url={proxy}
            maxZoom={20}
            subdomains={["mt0", "mt1", "mt2", "mt3"]}
          /> */}
          <ReactLeafletGoogleLayer
            apiKey="AIzaSyBMXYwygAn3NwtiSlybKGmo7HZvo7OvnGA"
            type={"roadmap"}
          />
          <LocationMarker />
        </MapContainer>
      </div>
      <div>
        <div className="cards">
          <h1>
            Here are the top 3 places we found in {value.value.description}!
          </h1>
          <div className="cards__container">
            <div className="cards__wrapper">
              <ul className="cards__items">
                <button className="remove-style">
                  <CardItem src="/logo192.png" text={details} label={place1} />{" "}
                </button>

                <button className="remove-style">
                  <CardItem src="/logo192.png" text={details} label={place2} />
                </button>

                <CardItem src="/logo192.png" text={details} label={place3} />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapView;
