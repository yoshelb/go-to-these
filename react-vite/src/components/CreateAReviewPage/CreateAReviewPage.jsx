import SearchComponent from "../SearchComponent/SearchComponent";
// import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useMapsContext } from "../../context/mapsContext";
import DisplaySelectedPlace from "./DisplaySelectedPlace";
import ReviewCreateForm from "./ReviewCreateForm";
import "./CreateAReviewPage.css";
import HomeNotSignedIn from "../HomePage/HomeNotSignedIn";


function CreateAReviewPage() {
  const { selectedPlace, setSelectedPlace } = useMapsContext();
  const sessionUser = useSelector((state) => state.session.user);
  return sessionUser ? (
    <div className="main-reviewpage">
      <SearchComponent />
      {selectedPlace && <DisplaySelectedPlace selectedPlace={selectedPlace} />}
      {selectedPlace && <ReviewCreateForm selectedPlace={selectedPlace} />}
    </div>
  ) : (
    <HomeNotSignedIn />
  );
}

export default CreateAReviewPage;
