import { IoIosStar, IoIosStarOutline } from "react-icons/io";
import OpenModalButton from "../OpenModalButton";
import DeleteReviewModal from "./DeleteReviewModal";
import { useNavigate } from "react-router-dom";

function ReviewMeat({ review, setEditMode }) {
  const navigate = useNavigate();

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
        <div className="lists">
          <h3>Lists:</h3>
          <ul>
            {review.lists.length > 0 &&
              review.lists.map((list) => {
                return (
                  <li
                    key={review.id}
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/lists/${list.id}`)}
                  >
                    {list.name}
                  </li>
                );
              })}
          </ul>
        </div>
        <button onClick={() => setEditMode(true)}>Edit</button>{" "}
        <OpenModalButton
          modalComponent={<DeleteReviewModal review={review} />}
          buttonText="Delete"
        />
      </div>
    </div>
  );
}

export default ReviewMeat;
