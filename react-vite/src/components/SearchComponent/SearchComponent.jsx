import React, { useState } from "react";
import { useMapsContext } from "../../context/mapsContext";
import LocationAutoComplete from "./LocationAutoComplete";
import AutocompleteSearch from "./AutocompleteSearch";

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
  } = useMapsContext();

  const handlePlaceSelected = (place) => {
    setSelectedPlace(place);
  };

  return (
    googleMapsReady && (
      <div>
        <h1>Find a place to review</h1>
        <div>
          <LocationAutoComplete
            setSearchLocation={setSearchLocation}
            searchLocation={searchLocation}
            locationGranted={locationGranted}
            currentLocationOn={currentLocationOn}
            setCurrentLocationOn={setCurrentLocationOn}
            apiKey={apiKey}
          />
        </div>
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
    )
  );
}

export default SearchComponent;
