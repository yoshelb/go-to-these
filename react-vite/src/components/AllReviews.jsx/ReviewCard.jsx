import "./reviewCard.css";
import { IoIosStar, IoIosStarOutline } from "react-icons/io";

function ReviewCard({ review }) {
  console.log("REVIEW IN REVIEWCARD: ====>", review);

  return (
    review && (
      <div>
        <div
          className="shop-image"
          style={{ backgroundImage: `url("${review.place.previewImage}")` }}
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
