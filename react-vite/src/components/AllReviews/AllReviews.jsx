// Component to show all reviews of the current user
import ReviewCard from "./ReviewCard";
import { thunkUserReviews } from "../../redux/reviews";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import "./allReviews.css";

function AllReviews({ listId }) {
  const dispatch = useDispatch();
  let reviewsArr = useSelector((state) => state.reviews.userReviews);
  let isLoaded = useSelector((state) => state.reviews.isLoaded);

  if (reviewsArr) {
    reviewsArr.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
  }

  useEffect(() => {
    console.log("USE EFTECT RUNNING");
    dispatch(thunkUserReviews());
  }, [dispatch]);

  return (
    reviewsArr &&
    isLoaded && (
      <div className="gallery-container">
        <h1>All Reviews</h1>
        <div className="gallery">
          {reviewsArr &&
            reviewsArr.map((review) => (
              <ReviewCard
                key={review.spot_id}
                review={review}
                listId={listId || ""}
              />
            ))}
        </div>
      </div>
    )
  );
}

export default AllReviews;
