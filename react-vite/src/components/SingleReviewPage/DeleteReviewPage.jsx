import { useDispatch, useSelector } from "react-redux";
import { thunkUserReviews } from "../../redux/reviews";
import { useModal } from "../../context/Modal";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function DeleteReviewPage() {
  const { reviewId } = useParams();
  const { closeModal } = useModal();
  const [review, setReview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(false);
    // Fetch the review data based on the review ID

    const fetchReview = async () => {
      try {
        const response = await fetch(`/api/reviews/${reviewId}`);
        if (!response.ok) {
          throw new Error(response.error);
        }
        const data = await response.json();
        setReview(data);
        console.log("REVIEW in useeffect===>", data);
        if (sessionUser.id != data.user_id) navigate("/");
        setIsLoading(true);
      } catch (error) {
        console.error("Error fetching review:", error);
      }
    };

    fetchReview();
  }, [reviewId, sessionUser, navigate]);

  const handleDelete = () => {
    const deleteReview = async () => {
      let response = await fetch(`/api/reviews/${review.id}/delete`, {
        method: "DELETE",
      });
      if (response.ok) {
        dispatch(thunkUserReviews());
        navigate("/");
        return closeModal();
      }
    };
    deleteReview();
  };

  return (
    isLoading && (
      <div>
        <h1>
          Are you sure you want to Delete the review for{" "}
          {review.place.displayName}
        </h1>
        <div>
          <button onClick={() => handleDelete()}>Delete</button>
          <button
            className="blue-button"
            onClick={() => navigate(`/reviews/${reviewId}`)}
          >
            Cancel
          </button>
        </div>
      </div>
    )
  );
}
export default DeleteReviewPage;
