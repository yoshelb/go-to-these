import { useDispatch } from "react-redux";
import { thunkUserReviews } from "../../redux/reviews";
import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";

function DeleteReviewModal({ review }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    <div>
      <h1>
        Are you sure you want to Delete the review for{" "}
        {review.place.displayName}
      </h1>
      <div>
        <button onClick={() => handleDelete()}>Delete</button>
        <button onClick={() => closeModal()}>Cancel</button>
      </div>
    </div>
  );
}
export default DeleteReviewModal;
