import { useMapsContext } from "../../context/mapsContext";

function LocationPromptModal() {
  const { requestGeolocationPermission, permissionPrompt } = useMapsContext();

  return (
    permissionPrompt && (
      <button onClick={requestGeolocationPermission}>
        Allow Location Access
      </button>
    )
  );
}

export default LocationPromptModal;
