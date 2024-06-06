import { useMapsContext } from "../../context/mapsContext";

function LocationPromptModal() {
  const { getGeolocation, permissionPrompt } = useMapsContext();

  return (
    permissionPrompt && (
      <button onClick={getGeolocation}>
        Allow Location Access
      </button>
    )
  );
}

export default LocationPromptModal;
