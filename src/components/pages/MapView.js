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
  const {
    checkboxPreferences,
    peopleValue,
    budgetValue,
    value,
    one,
    two,
    three,
  } = location.state;
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
  const [photo1, setPhoto1] = useState("/images/attraction-icon.png");

  const [place2, setPlace2] = useState("Loading..");
  const [description2, setDescription2] = useState("Loading..");
  const [photo2, setPhoto2] = useState("/images/attraction-icon.png");

  const [place3, setPlace3] = useState("Loading..");
  const [description3, setDescription3] = useState("Loading..");
  const [photo3, setPhoto3] = useState("/images/attraction-icon.png");

  const [loadingPlaces, setLoadingPlaces] = useState(true);

  var filteredList = [];
  function LoadingBar() {
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
            if (restaurants[i].name) {
              filteredList.push(restaurants[i]);
            }
          }
        }
      });
      if (filteredList.length > 3) {
        setPlace1(filteredList[one].name);
        if (filteredList[one].ranking) {
          setDescription1(filteredList[one].ranking);
        } else {
          setDescription1("No available description");
        }
        if (filteredList[one]["photo"]) {
          setPhoto1(filteredList[one]["photo"]["images"]["small"]["url"]);
        }

        setPlace2(filteredList[two].name);
        if (filteredList[two].ranking) {
          setDescription2(filteredList[1].ranking);
        } else {
          setDescription2("No available description");
        }
        if (filteredList[two]["photo"]) {
          setPhoto2(filteredList[two]["photo"]["images"]["small"]["url"]);
        }

        setPlace3(filteredList[three].name);
        if (filteredList[three].ranking) {
          setDescription3(filteredList[three].ranking);
        } else {
          setDescription3("No available description");
        }
        if (filteredList[three]["photo"]) {
          setPhoto3(filteredList[three]["photo"]["images"]["small"]["url"]);
        }
      } else {
        setPlace1("No location matching your search");
        setDescription1("Please try again");
        setPlace2("No location matching your search");
        setDescription2("Please try again");
        setPlace3("No location matching your search");
        setDescription3("Please try again");
      }
    }, [filteredList]);

    setLoadingPlaces(false);
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
