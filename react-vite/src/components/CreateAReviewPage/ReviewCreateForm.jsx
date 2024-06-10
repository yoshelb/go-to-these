import { useEffect, useState } from "react";
import StarsRating from "./StarsRating";
import { useSelector, useDispatch } from "react-redux";
import { thunkUserReviews } from "../../redux/reviews";
import { useNavigate } from "react-router-dom";
import ListCheckBoxes from "../SingleReviewPage/ListCheckBoxes";
import { thunkUserLists } from "../../redux/lists";

function ReviewCreateForm({ selectedPlace, listId, setSelectedPlace }) {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [errors, setErrors] = useState("");
  const [isChecked, setIsChecked] = useState({});
  const [alreadyReviewed, setAlreadyReviewed] = useState("");
  const [reviewId, setReviewId] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let listsArr = useSelector((state) => state.lists.userLists);
  let isLoaded = useSelector((state) => state.lists.isLoaded);

  useEffect(() => {
    dispatch(thunkUserLists());
  }, [dispatch]);

  useEffect(() => {
    setAlreadyReviewed("");
    const checkReviews = async () => {
      let response = await fetch(`/api/reviews/places/${selectedPlace.id}`);
      const data = await response.json();
      console.log("RESPONSE IN USE EFFECT", data);
      if (data.review) {
        console.log("REVIEW FOUND", data);
        setReviewId(data.review.id);
        setAlreadyReviewed("yes");
      } else {
        console.log("NOT YET REVIEWED");
        setAlreadyReviewed("no");
      }
    };
    checkReviews();
  }, [selectedPlace]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrorObj = {};
    if (rating < 1) {
      newErrorObj.rating = "Rating between 1 and 5 is required";
    }
    if (review.length > 800) {
      newErrorObj.review = "Review must be shorter than 800 characters";
    }
    if (Object.keys(newErrorObj).length > 0) {
      return setErrors(newErrorObj);
    }

    let lists = [];
    if (Object.keys(isChecked).length > 0) {
      Object.keys(isChecked).forEach((list_id) => {
        if (isChecked[list_id]) {
          lists.push(list_id);
        }
      });
    }

    const reviewPackage = {
      selectedPlace: selectedPlace,
      review: review,
      rating: rating,
      lists: lists,
    };
    console.log("REVIEW PACKAGE", reviewPackage);

    const createNewReview = async () => {
      console.log("REVIEW PACKAGE", reviewPackage);
      let response = await fetch("/api/reviews/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewPackage),
      });
      if (response.ok) {
        dispatch(thunkUserReviews());
        setSelectedPlace(null);
        if (listId) {
          return navigate(`/lists/${listId}`);
        } else {
          return navigate("/");
        }
      } else {
        alert("Sorry Internal Server Error!");
      }
    };

    createNewReview();

    return;
  };
  return (
    alreadyReviewed &&
    (alreadyReviewed === "no" ? (
      isLoaded && (
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
            ></textarea>
            {errors.review && <p className="errors">{errors.review}</p>}
          </div>
          <div>
            <StarsRating rating={rating} setRating={setRating} />
            {errors.rating && <p className="errors">{errors.rating}</p>}
          </div>
          <ListCheckBoxes
            listArr={listsArr}
            checkedLists={review.lists}
            isChecked={isChecked}
            setIsChecked={setIsChecked}
            listId={listId}
          />
          <div>
            <button type="submit">Create Review</button>
          </div>
        </form>
      )
    ) : (
      <div>
        <h2>You&apos;ve already reviewed this place</h2>
        <button
          onClick={() =>
            listId
              ? navigate(`/reviews/${reviewId}?listId=${listId}`)
              : navigate(`/reviews/${reviewId}`)
          }
        >
          See Review
        </button>
      </div>
    ))
  );
}

export default ReviewCreateForm;
