function DisplaySelectedPlace({selectedPlace}) {
    return (

        <div>
          {console.log("SELECTED PLACE", selectedPlace)}
          <h2>{selectedPlace.displayName}</h2>
          {selectedPlace.previewImageUrl && (
            <img src={selectedPlace.previewImageUrl} />
          )}
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
    )
}

export default DisplaySelectedPlace
