import SearchComponent from "../SearchComponent/SearchComponent";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useMapsContext } from "../../context/mapsContext";
import DisplaySelectedPlace from "./DisplaySelectedPlace";
import AllReviews from "../AllReviews";
import ReviewCreateForm from "./ReviewCreateForm";
import "./CreateAReviewPage.css";
import HomeNotSignedIn from "../HomePage/HomeNotSignedIn";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchList } from "../Utils";

function CreateAReviewPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const listId = location.search.split("=")[1] || "";
  console.log("LIST ID", listId);
  const { selectedPlace, setSelectedPlace } = useMapsContext();
  const sessionUser = useSelector((state) => state.session.user);
  const [list, setList] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
    setSelectedPlace(null);
    // Fetch the review data based on the review ID
    fetchList(setList, setIsLoading, listId, sessionUser, navigate);
  }, [listId, sessionUser, navigate, setSelectedPlace]);

  return sessionUser ? (
    <div className="main-reviewpage">
      <h1>
        {listId
          ? isLoading && `Add a review to ${list.name}`
          : "Search for a spot"}
      </h1>
      <SearchComponent />
      {selectedPlace && <DisplaySelectedPlace selectedPlace={selectedPlace} />}
      {selectedPlace && (
        <ReviewCreateForm
          selectedPlace={selectedPlace}
          listId={listId}
          setSelectedPlace={setSelectedPlace}
        />
      )}
      {listId && <AllReviews listId={listId} />}
    </div>
  ) : (
    <HomeNotSignedIn />
  );
}

export default CreateAReviewPage;
