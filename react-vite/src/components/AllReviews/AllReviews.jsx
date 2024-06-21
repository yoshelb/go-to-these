// Component to show all reviews of the current user
import ReviewCard from "./ReviewCard";
import { thunkUserReviews } from "../../redux/reviews";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import "./allReviews.css";
import { fetchList } from "../Utils";
import { useNavigate } from "react-router-dom";

function AllReviews({ listId, listReviews }) {
  const [list, setList] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [reviewIdArr, setReviewIdArr] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  let reviewsArr = useSelector((state) => state.reviews.userReviews);
  let isLoaded = useSelector((state) => state.reviews.isLoaded);

  if (reviewsArr) {
    reviewsArr.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
  }
  useEffect(() => {
    if (listId && listReviews) {
      if (listReviews.length > 0) {
        const tempReviewIdsArr = [];
        listReviews.map((review) => tempReviewIdsArr.push(review.id));
        setReviewIdArr(tempReviewIdsArr);
      } else {
        setReviewIdArr(true);
      }
    }
  }, [listId, listReviews]);

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
    isLoaded &&
    (listId && reviewIdArr.length > 0 ? (
      <div>
        <div className="gallery">
          {reviewIdArr.length > 0 &&
            reviewsArr.map((review) => {
              if (reviewIdArr?.includes(review.id)) {
                return (
                  <div
                    className={"already-reviewed"}
                    key={review.spot_id}
                    style={{ cursor: "arrow" }}
                  >
                    {" "}
                    <ReviewCard
                      review={review}
                      listId={listId}
                      alreadyReviewed={true}
                    />
                  </div>
                );
              } else {
                return (
                  <div
                    onClick={() => handleAddToList(review.id)}
                    className={listId && "review-background"}
                    key={review.spot_id}
                    style={{ cursor: "pointer" }}
                  >
                    <ReviewCard
                      review={review}
                      listId={listId}
                      alreadyReviewed={false}
                    />
                  </div>
                );
              }
            })}
        </div>
      </div>
    ) : (
      <div className="gallery">
        {reviewsArr &&
          reviewsArr.map((review) => (
            <ReviewCard review={review} listId={listId} />
          ))}
      </div>
    ))
  );
}

export default AllReviews;
