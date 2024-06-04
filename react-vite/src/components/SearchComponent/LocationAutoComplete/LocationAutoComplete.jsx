import React, { useEffect, useRef, useState } from 'react';

const LocationAutoComplete = ( {setSearchLocation, searchLocation, locationGranted, currentLocationOn, setCurrentLocationOn, apiKey} ) => {
    const inputRef = useRef(null);
    const titleRef = useRef(null);
    const resultsRef = useRef(null);
    const [currentLocation, setCurrentLocation] = useState("")




   const [chosenPlace, setChosenPlace] = useState("")
//    useEffect(()=> {
//     if(!currentLocationOn) {
//         console.log("CURRENT LOCATION OFF ====>")
//     }
//     if(currentLocationOn) {
//         console.log("CURRENT LOCATION ON")
//     }
//     console.log("SEARCH LOCATION STATUS:", searchLocation)
//    }, [currentLocationOn, searchLocation])


    let token
    // SET CURRENT LOCATION AND TURN ON CURRENT LOCATION
    useEffect(()=> {
        if(locationGranted && currentLocationOn) {
            console.log("CURRENT LOCATION ON")
         if(currentLocation) return setSearchLocation(currentLocation)
         if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
            const request = {
            locationRestriction : {
            west: longitude - 0.05,
            north: latitude + 0.05,
            east: longitude + 0.05,
            south: latitude - 0.05,

        },
        origin : {lat: latitude, lng: longitude }
         }
            setCurrentLocation(request)
            setSearchLocation(request)
            setCurrentLocationOn(true)
        },
        (error) => {
          console.error('Error fetching geolocation:', error);
        }
      );
     }
     }
    }, [locationGranted, currentLocationOn])




    useEffect(() => {

        if(!currentLocationOn && !searchLocation) {
        async function init() {
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
    }, [ currentLocationOn, searchLocation]);


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
       locationRestriction : {
            north: 49.384358, // Northernmost point of the contiguous US
            south: 24.396308, // Southernmost point of the contiguous US
            west: -125.0,     // Westernmost point of the contiguous US
            east: -66.93457   // Easternmost point of the contiguous US
        },

      includedPrimaryTypes: ["administrative_area_level_1", "administrative_area_level_2", "locality", "administrative_area_level_3"],
      language: "en-US",
    };

        // Add the latest char sequence to the request.
        request.input = event.target.value;

        // Fetch autocomplete suggestions and show them in a list.
        // @ts-ignore
        const { suggestions } =
            await google.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions(
                request,
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
            fields: ["id","displayName", "formattedAddress", "location", "addressComponents", "photos"],
        });




        const placeObj = JSON.parse(JSON.stringify(place))

        // FIND STATE
        const addressComponents = placeObj.addressComponents;

        console.log("ADRESS COMPONENTS", addressComponents)
        let state = '';
        for (const component of addressComponents) {
        if (component.types.includes('administrative_area_level_1')) {
          state = component.longText;
          break;
        }
      }
        const latitude = placeObj.location.lat;
        const longitude = placeObj.location.lng;
         setSearchLocation({
            locationRestriction : {
            west: longitude - 0.05,
            north: latitude + 0.05,
            east: longitude + 0.05,
            south: latitude - 0.05,

        },
        origin : {lat: latitude, lng: longitude }
         })
        setChosenPlace(`${placeObj.displayName}, ${state}`)

        // let placeText = document.createTextNode(
        //     `${place.displayName}: ${place.formattedAddress}`,
        // );


        // resultsRef.current.replaceChildren(placeText);
        // titleRef.current.innerText = "Selected Place:";
        // inputRef.current.value = "";
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
           {locationGranted && currentLocationOn ? (
                <>
                <h2>Current Location</h2>
                </>
            ) : !currentLocationOn && searchLocation ? (
                <>
                <h2>{chosenPlace}</h2>
                
                </>
            ) : (
                !searchLocation && (
                    <input ref={inputRef} type="text" placeholder="Search for a place..." />
                )
            )}

            {((currentLocation && currentLocationOn) || searchLocation )&& <button onClick={() => {
             setSearchLocation("")
             setChosenPlace("")
             setCurrentLocationOn(false)}}>Clear Location</button>}
            {locationGranted && !currentLocationOn && <button onClick={() => {
             setSearchLocation("")
             setChosenPlace("")
             setCurrentLocationOn(true)}}>Use Current Location</button>}

            {!currentLocationOn && !chosenPlace && <><div ref={titleRef}></div>
            <ul ref={resultsRef}></ul></> }

        </>
    );
};

export default LocationAutoComplete;
