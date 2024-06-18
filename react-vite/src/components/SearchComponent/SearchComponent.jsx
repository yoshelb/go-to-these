import React, { useState } from "react";
import { useMapsContext } from "../../context/mapsContext";
import LocationAutoComplete from "./LocationAutoComplete";
import AutocompleteSearch from "./AutocompleteSearch";
import "./SearchComponent.css";

function SearchComponent() {
  const [previewImageUrl, setPreviewImageUrl] = useState("");
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  const {
    googleMapsReady,
    locationGranted,
    searchLocation,
    setSearchLocation,
    currentLocationOn,
    setCurrentLocationOn,
    currentLocation,
    setCurrentLocation,
    selectedPlace,
    setSelectedPlace,
    chosenPlace,
    setChosenPlace,
  } = useMapsContext();

  const handlePlaceSelected = (place) => {
    setSelectedPlace(place);
  };

  return (
    googleMapsReady && (
      <div className="Search-component-main">
        <div className="search-wrapper">
          <div className="location-div">
            <LocationAutoComplete
              setSearchLocation={setSearchLocation}
              searchLocation={searchLocation}
              locationGranted={locationGranted}
              currentLocationOn={currentLocationOn}
              setCurrentLocationOn={setCurrentLocationOn}
              apiKey={apiKey}
              chosenPlace={chosenPlace}
              setChosenPlace={setChosenPlace}
            />
          </div>
          <div className="auto-div">
            <AutocompleteSearch
              searchLocation={searchLocation}
              locationGranted={locationGranted}
              currentLocationOn={currentLocationOn}
              setSelectedPlace={setSelectedPlace}
              selectedPlace={selectedPlace}
              setPreviewImageUrl={setPreviewImageUrl}
              previewImageUrl={previewImageUrl}
            />
          </div>
        </div>
      </div>
    )
  );
}

export default SearchComponent;
