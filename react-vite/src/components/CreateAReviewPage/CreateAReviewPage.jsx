import SearchComponent from "../SearchComponent/SearchComponent";
import React, { useState } from "react";
import { useMapsContext } from "../../context/mapsContext";
import DisplaySelectedPlace from "./DisplaySelectedPlace";
import ReviewCreateForm from "./ReviewCreateForm";
import "./CreateAReviewPage.css";

function CreateAReviewPage() {
  const { selectedPlace, setSelectedPlace } = useMapsContext();
  return (
    <div>
      <SearchComponent />
      <h1>HEllo from Create!</h1>
      {selectedPlace && <DisplaySelectedPlace selectedPlace={selectedPlace} />}
      {selectedPlace && <ReviewCreateForm selectedPlace={selectedPlace} />}
    </div>
  );
}

export default CreateAReviewPage;
