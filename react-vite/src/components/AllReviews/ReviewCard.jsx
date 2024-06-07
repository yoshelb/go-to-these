import { useNavigate } from "react-router-dom";
import "./reviewCard.css";
import { IoIosStar, IoIosStarOutline } from "react-icons/io";

function ReviewCard({ review, listId }) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (listId) {
      navigate(`/reviews/${review.id}?listId=${listId}`);
    } else {
      navigate(`/reviews/${review.id}`);
    }
  };

  return (
    review && (
      <div style={{ cursor: "pointer" }} onClick={() => handleNavigate()}>
        <div
          className="shop-image"
          style={{
            backgroundImage: `url("${
              review.place.previewImage
                ? review.place.previewImage
                : "/missing-place.png"
            }")`,
          }}
        ></div>
        <h2>{review.place.displayName}</h2>
        <div className="star-div">
          {review.rating >= 1 ? <IoIosStar /> : <IoIosStarOutline />}
          {review.rating >= 2 ? <IoIosStar /> : <IoIosStarOutline />}
          {review.rating >= 3 ? <IoIosStar /> : <IoIosStarOutline />}
          {review.rating >= 4 ? <IoIosStar /> : <IoIosStarOutline />}
          {review.rating >= 5 ? <IoIosStar /> : <IoIosStarOutline />}
        </div>
        <p>{review.review}</p>
      </div>
    )
  );
}

export default ReviewCard;
