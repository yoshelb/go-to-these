import { IoIosStar, IoIosStarOutline } from "react-icons/io";
import OpenModalButton from "../OpenModalButton";
import DeleteReviewModal from "./DeleteReviewModal";

function ReviewMeat({ review, setEditMode }) {
  return (
    <div className="main-container">
      <div>
        <p>{review.review}</p>
        <div className="star-div">
          {review.rating >= 1 ? <IoIosStar /> : <IoIosStarOutline />}
          {review.rating >= 2 ? <IoIosStar /> : <IoIosStarOutline />}
          {review.rating >= 3 ? <IoIosStar /> : <IoIosStarOutline />}
          {review.rating >= 4 ? <IoIosStar /> : <IoIosStarOutline />}
          {review.rating >= 5 ? <IoIosStar /> : <IoIosStarOutline />}
        </div>
        <button onClick={() => setEditMode(true)}>Edit</button>{" "}
        <OpenModalButton
          modalComponent={<DeleteReviewModal review={review}/>}
          buttonText="Delete"
        />
      </div>
    </div>
  );
}

export default ReviewMeat;
