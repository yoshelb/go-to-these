import { useMapsContext } from "../../context/mapsContext";

function LocationPromptModal(){
    const { requestGeolocationPermission } = useMapsContext();

    return (
      <button onClick={requestGeolocationPermission}>
        Allow Location Access
      </button>
    );
}

export default LocationPromptModal
