function DisplaySelectedPlace({ selectedPlace }) {
  return (
    <div>
      {console.log("SELECTED PLACE", selectedPlace)}
      <h2>{selectedPlace.displayName}</h2>
      <div
        className="shop-image"
        style={{
          backgroundImage: `url("${
            selectedPlace.previewImageUrl
              ? selectedPlace.previewImageUrl
              : "/missing-place.png"
          }")`,
        }}
      ></div>
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
  );
}

export default DisplaySelectedPlace;
