import { useNavigate } from "react-router-dom";
import "./reviewCard.css";

import { TbStarFilled, TbStar } from "react-icons/tb";

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
      <div
        style={{ cursor: "pointer" }}
        onClick={() => (!listId ? handleNavigate() : null)}
      >
        <div className="container">
          <div
            className={listId ? "image-list-add" : "shop-image"}
            style={{
              backgroundImage: `url("${
                review.place.previewImage
                  ? review.place.previewImage
                  : "/missing-place.png"
              }")`,
            }}
          ></div>

          {listId && (
            <div className="overlay-div">
              <img
                style={{ cursor: "pointer" }}
                alt="plus button"
                className="plus-big"
                src="/plus-big.png"
              ></img>
            </div>
          )}
        </div>

        <h2>{review.place.displayName}</h2>

        <div className="star-div">
          {review.rating >= 1 ? (
            <TbStarFilled className="reviewcard-star blue-star" />
          ) : (
            <TbStar className="reviewcard-star grey-star" />
          )}
          {review.rating >= 2 ? (
            <TbStarFilled className="reviewcard-star blue-star" />
          ) : (
            <TbStar className="reviewcard-star grey-star" />
          )}
          {review.rating >= 3 ? (
            <TbStarFilled className="reviewcard-star blue-star" />
          ) : (
            <TbStar className="reviewcard-star grey-star" />
          )}
          {review.rating >= 4 ? (
            <TbStarFilled className="reviewcard-star blue-star" />
          ) : (
            <TbStar className="reviewcard-star grey-star" />
          )}
          {review.rating >= 5 ? (
            <TbStarFilled className="reviewcard-star blue-star" />
          ) : (
            <TbStar className="reviewcard-star grey-star" />
          )}
        </div>
        <span>{review.review}</span>
      </div>
    )
  );
}

export default ReviewCard;
