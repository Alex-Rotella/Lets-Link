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

  function testButton() {
    getRestaurantsData(39.7044808,-75.1139549)
  }

  const [place1, setPlace1] = useState('Loading..')
  const [description1, setDescription1] = useState('Loading..')

  const [place2, setPlace2] = useState('Loading..')
  const [description2, setDescription2] = useState('Loading..')

  const [place3, setPlace3] = useState('Loading..')
  const [description3, setDescription3] = useState('Loading..')

  useEffect(() => {

  if(attractions.length > 0) {
    setPlace1(attractions[0].name)
    setDescription1(attractions[0].ranking)
    

    setPlace3(attractions[1].name)
    setDescription3(attractions[1].ranking)
  }

  if(restaurants.length > 0){
    setPlace2(restaurants[0].name)
    setDescription2(restaurants[0].ranking)
  }
  
  }, [attractions, restaurants]);

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
          <h1>
            Here are the top 3 places we found in {value.value.description}!
          </h1>
          <div className="cards__container">
            <div className="cards__wrapper">
              <ul className="cards__items">
                <button className="remove-style" onClick={testButton}>
                  <CardItem src="/logo192.png" text={description1} label={place1} />
                </button>

                <button className="remove-style">
                  <CardItem src="/logo192.png" text={description2} label={place2} />
                </button>

                <button className="remove-style">
                <CardItem src="/logo192.png" text={description3} label={place3} />
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
