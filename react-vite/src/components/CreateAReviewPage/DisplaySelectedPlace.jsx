function DisplaySelectedPlace({ selectedPlace }) {
  return (
    <div>
      <h2 className="place-name">{selectedPlace.displayName}</h2>
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
