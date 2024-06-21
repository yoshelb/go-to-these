function DisplaySelectedPlace({ selectedPlace }) {
  console.log("SELECTED PLACE", selectedPlace);
  return (
    <div className="search-result-div">
      <h2 className="place-name">{selectedPlace.displayName}</h2>
      <div className="shop-image-div">
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
      </div>
      {selectedPlace.formattedAddress && (
        <p>{selectedPlace.formattedAddress}</p>
      )}
      {selectedPlace.editorialSummary && (
        <p>{selectedPlace.editorialSummary}</p>
      )}
      {selectedPlace.websiteURI && (
        <a
          className="place-link"
          href={selectedPlace.websiteURI}
          target="blank"
        >
          Website
        </a>
      )}
      {selectedPlace.googleMapsURI && (
        <a
          className="place-link"
          href={selectedPlace.googleMapsURI}
          target="blank"
        >
          Google Maps
        </a>
      )}
    </div>
  );
}

export default DisplaySelectedPlace;
