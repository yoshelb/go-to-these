import { createContext, useState, useEffect, useContext } from "react";

// Create the context
const MapsContext = createContext();

// Create a provider component
const MapsProvider = ({ children }) => {
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

  const [googleMapsReady, setGoogleMapsReady] = useState(false);
  const [searchLocation, setSearchLocation] = useState("");
  const [locationGranted, setLocationGranted] = useState(false);
  const [currentLocationOn, setCurrentLocationOn] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("");
  const [permissionPrompt, setPermissionPrompt] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);

  // Set User current location =================================================



  const requestGeolocationPermission = () => {
    if (navigator.geolocation) {
      console.log("Requesting geolocation permission...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const request = {
            locationRestriction: {
              west: longitude - 0.05,
              north: latitude + 0.05,
              east: longitude + 0.05,
              south: latitude - 0.05,
            },
            origin: { lat: latitude, lng: longitude },
          };
          setCurrentLocation(request);
          // console.log("CURRENT LOCATION", request);
          setLocationGranted(true);
          setCurrentLocationOn(true);
          setPermissionPrompt(false); // Hide prompt if location is granted
        },
        (error) => {
          console.error("Error fetching geolocation:", error);
          setLocationGranted(false);
          setCurrentLocationOn(false);
          setPermissionPrompt(true); // Show prompt if location access is denied
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  //   Check User Location Permission =============================================================

  useEffect(() => {
    if (googleMapsReady) {
      console.log("GETTING LOCATION");
      if (navigator.permissions) {
        navigator.permissions
          .query({ name: "geolocation" })
          .then((permissionStatus) => {
            if (permissionStatus.state === "granted") {
              console.log("Geolocation permission granted.");
              setLocationGranted(true);
              setCurrentLocationOn(true);
              requestGeolocationPermission();
            } else if (permissionStatus.state === "denied") {
              console.log("Geolocation permission denied.");
              setLocationGranted(false);
              setCurrentLocationOn(false);
              setSearchLocation("");
              setPermissionPrompt(false);
              alert(
                "This application needs access to your location. Please allow location access."
              );
            } else if (permissionStatus.state === "prompt") {
              console.log("Geolocation permission prompt is required.");
              setPermissionPrompt(true);
              alert(
                "This application needs access to your location. Please allow location access."
              );
            }

            // Listen for changes to the permission status
            permissionStatus.onchange = function () {
              console.log(
                "Geolocation permission status changed to: " + this.state
              );
              if (this.state === "granted") {
                console.log("Geolocation permission granted.");
                setLocationGranted(true);
                setCurrentLocationOn(true);
                requestGeolocationPermission();
              } else if (this.state === "denied") {
                console.log("Geolocation permission denied.");
                setLocationGranted(false);
                setCurrentLocationOn(false);
                setSearchLocation("");
                setPermissionPrompt(false);
                // alert(
                //   "This application needs access to your location. Please allow location access."
                // );
              } else if (this.state === "prompt") {
                console.log("Geolocation permission prompt is required.");
                setPermissionPrompt(true);
                // alert(
                //   "This application needs access to your location. Please allow location access."
                // );
              }
            };
          })
          .catch((error) => {
            console.log("Permission query error: ", error);
          });
      } else {
        console.log("Permissions API is not supported by this browser.");
      }
    }
  }, [googleMapsReady]);

  //   LOAD GOOGLE MAPS ================================================================
  // =====================================================================================================

  useEffect(() => {
    // Define the callback function that the Google Maps API will call
    window.initMap = () => {
      console.log("Google Maps script loaded and initialized!");
      // Your Google Maps initialization code here
    };

    // Function to load the external script
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        // Check if the script already exists
        if (document.querySelector(`script[src="${src}"]`)) {
          console.log("Script already loaded!");
          resolve();
          return;
        } else {
          // If not, create and load the script
          const script = document.createElement("script");
          script.src = src;
          script.defer = true;
          script.onload = () => {
            console.log("Script loaded!");
            setGoogleMapsReady(true);
            resolve();
          };
          script.onerror = () => {
            console.error("Error loading script!");
            reject();
          };
          document.body.appendChild(script);
        }
      });
    };

    // Load the Google Maps script with the callback
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap&libraries=places&v=weekly`
    )
      .then(() => {
        // Script loaded successfully
        console.log("Google Maps script loaded successfully!");
        // load location
      })
      .catch((error) => {
        // Handle script load error
        console.error("Failed to load Google Maps script:", error);
      });
  }, [apiKey]);

  return (
    <MapsContext.Provider
      value={{
        googleMapsReady,
        setGoogleMapsReady,
        locationGranted,
        setLocationGranted,
        searchLocation,
        setSearchLocation,
        currentLocationOn,
        setCurrentLocationOn,
        currentLocation,
        setCurrentLocation,
        setPermissionPrompt,
        permissionPrompt,
        requestGeolocationPermission,
        selectedPlace,
        setSelectedPlace,
      }}
    >
      {googleMapsReady && children}
    </MapsContext.Provider>
  );
};

const useMapsContext = () => {
  return useContext(MapsContext);
};

export { MapsContext, MapsProvider, useMapsContext };
