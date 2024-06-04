import React, { useState, useEffect } from "react";
import { useMapsContext } from "../../context/mapsContext";
import LocationAutoComplete from "./LocationAutoComplete";
import AutocompleteSearch from "./AutocompleteSearch";

function SearchComponent() {
  const [selectedPlace, setSelectedPlace] = useState(null);
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
        {selectedPlace && (
          <div>
            {console.log("SELECTED PLACE", selectedPlace)}
            <h2>{selectedPlace.displayName}</h2>
            {previewImageUrl && <img src={previewImageUrl} />}
            <p>{selectedPlace.formatted_address}</p>
            {selectedPlace.editorialSummary && (
              <p>{selectedPlace.editorialSummary}</p>
            )}
            {selectedPlace.websiteURI && (
              <a href={selectedPlace.websiteURI} target="blank">
                Website
              </a>
            )}
            {selectedPlace.googleMapsURI && (
              <a href={selectedPlace.googleMapsURI} target="blank">
                Google Maps
              </a>
            )}
          </div>
        )}
      </div>
    )
  );
}

export default SearchComponent;
