// Component to show all reviews of the current user
import ReviewCard from "./ReviewCard";
import { thunkUserReviews } from "../../redux/reviews";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import "./allReviews.css";

function AllReviews() {
  const dispatch = useDispatch();
  let reviewsArr = useSelector((state) => state.reviews.userReviews);
  let isLoaded = useSelector((state) => state.reviews.isLoaded);

  if (reviewsArr) {
    reviewsArr.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
  }

  useEffect(() => {
    console.log("USE EFTECT RUNNING");
    dispatch(thunkUserReviews()).then();
  }, [dispatch]);

  return (
    reviewsArr &&
    isLoaded && (
      <div className="gallery-container">
        {console.log("INSIDE MAP")}
        <h1>All Reviews</h1>
        <div className="gallery">
          {reviewsArr &&
            reviewsArr.map((review) => (
              <ReviewCard key={review.spot_id} review={review} />
            ))}
        </div>
      </div>
    )
  );
}

export default AllReviews;
