import { useEffect, useState } from "react";
import StarsRating from "./StarsRating";
import { useDispatch } from "react-redux";
import { thunkUserReviews } from "../../redux/reviews";
import { useNavigate } from "react-router-dom";

function ReviewCreateForm({ selectedPlace }) {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [errors, setErrors] = useState("");
  const [alreadyReviewed, setAlreadyReviewed] = useState("");
  const [reviewId, setReviewId] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    let newError = "";
    if (rating < 1) {
      newError = "Rating between 1 and 5 is required";
    }
    if (newError.length > 0) {
      setErrors(newError);
      return;
    }

    const reviewPackage = {
      selectedPlace: selectedPlace,
      review: review,
      rating: rating,
    };

    const createNewReview = async () => {
      let response = await fetch("/api/reviews/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewPackage),
      });
      if (response.ok) {
        dispatch(thunkUserReviews()).then(navigate("/"));
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
      <form onSubmit={(e) => handleSubmit(e)}>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
        ></textarea>
        <StarsRating rating={rating} setRating={setRating} />
        {errors && <p className="errors">{errors}</p>}
        <button type="submit">Create Review</button>
      </form>
    ) : (
      <div>
        <h2>You've already reviewed this place</h2>
        <button onClick={() => navigate(`/reviews/${reviewId}`)}>
          See Review
        </button>
      </div>
    ))
  );
}

export default ReviewCreateForm;
