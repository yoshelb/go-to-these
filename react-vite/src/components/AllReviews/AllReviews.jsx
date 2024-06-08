// Component to show all reviews of the current user
import ReviewCard from "./ReviewCard";
import { thunkUserReviews } from "../../redux/reviews";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import "./allReviews.css";
import { fetchList } from "../Utils";
import { useNavigate } from "react-router-dom";

function AllReviews({ listId }) {
  const [list, setList] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  let reviewsArr = useSelector((state) => state.reviews.userReviews);
  let isLoaded = useSelector((state) => state.reviews.isLoaded);

  if (reviewsArr) {
    reviewsArr.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
  }

  useEffect(() => {
    console.log("USE EFTECT RUNNING");
    dispatch(thunkUserReviews());
  }, [dispatch]);

  const handleAddToList = (reviewId) => {
    const addReview = async () => {
      console.log("REVIEW ID Inner", reviewId);
      let response = await fetch(
        `/api/lists/${listId}/reviews/${reviewId}/add`,
        {
          method: "POST",
        }
      );
      if (response.ok) {
        const response = await fetch(`/api/reviews/${reviewId}`);
        if (!response.ok) {
          throw new Error(response.error);
        }
        await fetchList(setList, setIsLoading, listId, sessionUser, navigate);
        return navigate(`/lists/${listId}`);
      }
    };
    addReview();
  };

  return (
    reviewsArr &&
    isLoaded && (
      <div>
        <div className="gallery">
          {reviewsArr &&
            reviewsArr.map((review) => (
              <div key={review.spot_id}>
                {listId && (
                  <img
                    style={{ cursor: "pointer" }}
                    alt="plus button"
                    className="plus-button"
                    src="/add.png"
                    onClick={() => handleAddToList(review.id)}
                  ></img>
                )}
                <ReviewCard review={review} listId={listId} />
              </div>
            ))}
        </div>
      </div>
    )
  );
}

export default AllReviews;
