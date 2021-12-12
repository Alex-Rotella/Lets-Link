/* eslint-disable */
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

  const location = useLocation();
  const proxy = "http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}";
  const { checkboxPreferences, peopleValue, budgetValue, value } =
    location.state;
  const selectedPreferences = checkboxPreferences.filter(
    ({ isChecked }) => isChecked
  );

  const [attractions, setAttractions] = useState([]);

  const defaultCenter = [37.0902, -100.546875];
  const defaultZoom = 3;

  const [map, setMap] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    var placeID = value.value.place_id;
    geocodeByPlaceId(placeID)
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        //console.log("Successfully got latitude and longitude", { lat, lng });
        if (isMounted) {
          setCoordinates({ lat: lat, lng: lng });
          setLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    getRestaurantsData(coordinates.lat, coordinates.lng).then((data) => {
      if (isMounted) {
        console.log(data);
        setRestaurants(data);
      }
    });

    getAttractionsData(coordinates.lat, coordinates.lng).then((data) => {
      if (isMounted) {
        console.log(data);
        setAttractions(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [coordinates]);

  function LocationMarker() {
    const [position, setPosition] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState({ lat: "", lng: "" });

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
            {selected.lat} {selected.lng}
          </Popup>
        </Marker>
      );
    }
  }

  const [place1, setPlace1] = useState("Loading..");
  const [description1, setDescription1] = useState("Loading..");
  const [photo1, setPhoto1] = useState("/logo512.png");

  const [place2, setPlace2] = useState("Loading..");
  const [description2, setDescription2] = useState("Loading..");
  const [photo2, setPhoto2] = useState("/logo512.png");

  const [place3, setPlace3] = useState("Loading..");
  const [description3, setDescription3] = useState("Loading..");
  const [photo3, setPhoto3] = useState("/logo512.png");

  const [loadingPlaces, setLoadingPlaces] = useState(true);
  function LoadingBar() {
    var filteredList = [];
    useEffect(() => {
      selectedPreferences.map((e) => {
        if (e.value == "Shopping") {
          for (let i = 0; i < attractions.length; i++) {
            if (
              attractions[i]["subcategory"] &&
              attractions[i]["subcategory"][0]["name"] == "Shopping"
            ) {
              filteredList.push(attractions[i]);
            }
          }
        }
        if (e.value == "Fun & Games") {
          for (let i = 0; i < attractions.length; i++) {
            if (
              attractions[i]["subcategory"] &&
              attractions[i]["subcategory"][0]["name"] == "Fun & Games"
            ) {
              filteredList.push(attractions[i]);
            }
          }
        }
        if (e.value == "Nightlife") {
          for (let i = 0; i < attractions.length; i++) {
            if (
              attractions[i]["subcategory"] &&
              attractions[i]["subcategory"][0]["name"] == "Nightlife"
            ) {
              filteredList.push(attractions[i]);
            }
          }
        }
        if (e.value == "Outdoor Activities") {
          for (let i = 0; i < attractions.length; i++) {
            if (
              attractions[i]["subcategory"] &&
              attractions[i]["subcategory"][0]["name"] == "Outdoor Activities"
            ) {
              filteredList.push(attractions[i]);
            }
          }
        }
        if (e.value == "Restaurants") {
          for (let i = 0; i < restaurants.length; i++) {
            filteredList.push(restaurants[i]);
          }
        }
      });
      if (filteredList.length > 0) {
        
        //const test = Array.from({length: 3}, () => Math.floor(Math.random() * filteredList.length));

        setPlace1(filteredList[0].name);
        setDescription1(filteredList[0].ranking);
        if (filteredList[0]["photo"]) {
          setPhoto1(filteredList[0]["photo"]["images"]["small"]["url"]);
          setLoadingPlaces(false);
        }

        setPlace2(filteredList[1].name);
        setDescription2(filteredList[1].ranking);
        if (filteredList[1]["photo"]) {
          setPhoto2(filteredList[1]["photo"]["images"]["small"]["url"]);
          setLoadingPlaces(false);
        }
        setPlace3(filteredList[2].name);
        setDescription3(filteredList[2].ranking);
        if (filteredList[2]["photo"]) {
          setPhoto3(filteredList[2]["photo"]["images"]["small"]["url"]);
          setLoadingPlaces(false);
        }
      }
    }, [filteredList, selectedPreferences]);

    if (loadingPlaces) {
      return <h1> Matching your preferences..</h1>;
    } else {
      return (
        <h1>
          Here are the top 3 places we found in {value.value.description} that
          match your search!
        </h1>
      );
    }
  }
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
          <ReactLeafletGoogleLayer apiKey={API_KEY} type={"roadmap"} />
          <LocationMarker />
        </MapContainer>
      </div>
      <div>
        <div className="cards">
          <LoadingBar />
          <div className="cards__container">
            <div className="cards__wrapper">
              <ul className="cards__items">
                <button className="remove-style">
                  <CardItem src={photo1} text={place1} label={description1} />
                </button>

                <button className="remove-style">
                  <CardItem src={photo2} text={place2} label={description2} />
                </button>

                <button className="remove-style">
                  <CardItem src={photo3} text={place3} label={description3} />
                </button>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapView;
