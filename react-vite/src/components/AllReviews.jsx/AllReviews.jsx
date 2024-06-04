// Component to show all reviews of the current user
import ReviewCard from "./ReviewCard";
import { thunkUserReviews } from "../../redux/reviews";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

function AllReviews() {
  const dispatch = useDispatch();
  let reviewsArr = useSelector((state) => state.reviews.userReviews);
  let isLoaded = useSelector((state) => state.reviews.isLoaded);
  if (reviewsArr) {
    console.log("REVIEWS ARR IN ALL REVIEWS", reviewsArr);
  }

  useEffect(() => {
    console.log("USE EFTECT RUNNING");
    dispatch(thunkUserReviews()).then();
  }, [dispatch]);

  return (
    reviewsArr &&
    isLoaded && (
      <div>
        {console.log("INSIDE MAP")}
        <h1>All Reviews</h1>
        {reviewsArr &&
          reviewsArr.map((review) => (
            <ReviewCard key={review.spot_id} review={review} />
          ))}
      </div>
    )
  );
}

export default AllReviews;
