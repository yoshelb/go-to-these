import { useState } from "react";
import StarsRating from "../CreateAReviewPage/StarsRating";
// import { useNavigate } from "react-router-dom";

function EditReviewForm({ review, setEditMode, setReview }) {
  const [newReview, setNewReview] = useState(review.review);
  const [newRating, setNewRating] = useState(review.rating);
  //   const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const updateReview = async () => {
      let response = await fetch(`/api/reviews/${review.id}/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          review: newReview,
          rating: newRating,
        }),
      });

      if (response.ok) {
        const response = await fetch(`/api/reviews/${review.id}`);
        if (!response.ok) {
          throw new Error(response.error);
        }
        const data = await response.json();
        setReview(data);
        setEditMode(false);
        // navigate(`/reviews/${review.id}`);
      }
    };
    updateReview();
  };
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <textarea
        value={newReview}
        onChange={(e) => setNewReview(e.target.value)}
      ></textarea>
      <StarsRating rating={newRating} setRating={setNewRating} />
      <div>
        <button type="submit">Update Review</button>
        <button type="button" onClick={() => setEditMode(false)}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default EditReviewForm;
