import React, { useEffect, useRef, useState } from "react";

const AutocompleteSearch = ({
  searchLocation,
  locationGranted,
  currentLocationOn,
  selectedPlace,
  setSelectedPlace,
  setPreviewImageUrl,
  previewImageUrl,
}) => {
  const inputRef = useRef(null);
  const titleRef = useRef(null);
  const resultsRef = useRef(null);
  //    const [request, setRequest] = useState('')
  const [disabled, setDisabled] = useState(true);

  let token;
  useEffect(() => {
    if (searchLocation) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [searchLocation]);

  useEffect(() => {
    if (!disabled) {
      async function init() {
        if (previewImageUrl) {
          setPreviewImageUrl("");
        }
        token = new google.maps.places.AutocompleteSessionToken();
        if (inputRef.current) {
          inputRef.current.addEventListener("input", makeAcRequest);
        }
        // let request = await refreshToken(request);
      }

      init();

      // Cleanup event listeners on component unmount
      return () => {
        if (inputRef.current) {
          inputRef.current.removeEventListener("input", makeAcRequest);
        }
      };
    }
  }, [disabled, searchLocation]);

  async function makeAcRequest(event) {
    // Reset elements and exit if an empty string is received.
    if (event.target.value === "") {
      titleRef.current.innerText = "";
      resultsRef.current.replaceChildren();
      return;
    }
    const request = {
      input: "",
      region: "us",
      ...searchLocation,
      includedPrimaryTypes: ["establishment"],
      language: "en-US",
    };
    console.log("request from search", request);

    // Add the latest char sequence to the request.
    request.input = event.target.value;

    // Fetch autocomplete suggestions and show them in a list.
    // @ts-ignore
    const { suggestions } =
      await google.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions(
        request
      );

    titleRef.current.innerText = `Query predictions for "${request.input}"`;
    // Clear the list first.
    resultsRef.current.replaceChildren();

    for (const suggestion of suggestions) {
      const placePrediction = suggestion.placePrediction;
      // Create a link for the place, add an event handler to fetch the place.
      const a = document.createElement("a");

      a.addEventListener("click", () => {
        onPlaceSelected(placePrediction.toPlace());
      });
      a.innerText = placePrediction.text.toString();

      // Create a new list element.
      const li = document.createElement("li");

      li.appendChild(a);
      resultsRef.current.appendChild(li);
    }
  }

  // Event handler for clicking on a suggested place.
  async function onPlaceSelected(place) {
    await place.fetchFields({
      fields: [
        "id",
        "displayName",
        "formattedAddress",
        "photos",
        "location",
        "editorialSummary",
        "googleMapsURI",
        "websiteURI",
        "types",
      ],
    });
    console.log("PLACE", place);
    let placeText = document.createTextNode(
      `${place.displayName}: ${place.formattedAddress}`
    );

    if (place.photos && place.photos.length > 0) {
      const url = place.photos[0].getURI({ maxWidth: 800, maxHeight: 800 });
      console.log("PREVIEW IMAGE", url);
      setPreviewImageUrl(url);
    }
    const placeObj = JSON.parse(JSON.stringify(place));
    setSelectedPlace(placeObj);
    console.log("PLACE OBJ", placeObj);
    const latitude = placeObj.location.lat;
    const longitude = placeObj.location.lng;

    resultsRef.current.replaceChildren(placeText);
    titleRef.current.innerText = "Selected Place:";
    inputRef.current.value = "";
    // request = await refreshToken(request);
  }

  // Helper function to refresh the session token.
  async function refreshToken(request) {
    // Create a new session token and add it to the request.
    token = new google.maps.places.AutocompleteSessionToken();
    request.sessionToken = token;
    return request;
  }

  return (
    <>
      <input
        ref={inputRef}
        type="text"
        placeholder={
          disabled
            ? locationGranted && currentLocationOn
              ? "Loading..."
              : "Please choose an area to search"
            : "Search for a place..."
        }
        disabled={disabled}
      />
      {searchLocation && (
        <>
          <div ref={titleRef}></div>
          <ul ref={resultsRef}></ul>
        </>
      )}
      {/* {previewImageUrl && <img src={previewImageUrl} />} */}
    </>
  );
};

export default AutocompleteSearch;
