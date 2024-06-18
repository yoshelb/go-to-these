
import { TbStarFilled, TbStar } from "react-icons/tb";

import { useNavigate } from "react-router-dom";

function ReviewMeat({ review, setEditMode }) {
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <p>{review.review}</p>
        <div className="star-div">
          {review.rating >= 1 ? (
            <TbStarFilled className="non-edit-star blue-star" />
          ) : (
            <TbStar className="non-edit-star grey-star" />
          )}
          {review.rating >= 2 ? (
            <TbStarFilled className="non-edit-star blue-star" />
          ) : (
            <TbStar className="non-edit-star grey-star" />
          )}
          {review.rating >= 3 ? (
            <TbStarFilled className="non-edit-star blue-star" />
          ) : (
            <TbStar className="non-edit-star grey-star" />
          )}
          {review.rating >= 4 ? (
            <TbStarFilled className="non-edit-star blue-star" />
          ) : (
            <TbStar className="non-edit-star grey-star" />
          )}
          {review.rating >= 5 ? (
            <TbStarFilled className="non-edit-star blue-star" />
          ) : (
            <TbStar className="non-edit-star grey-star" />
          )}
        </div>
        {review.place.websiteUri && (
          <a
            className="place-link"
            href={review.place.websiteUri}
            target="blank"
          >
            Website
          </a>
        )}
        {review.place.googleMapsUri && (
          <a
            className="place-link"
            href={review.place.googleMapsUri}
            target="blank"
          >
            Google Maps
          </a>
        )}
        <p>{review.place.formattedAddress}</p>
        <div className="lists">
          <h3>Lists:</h3>
          <ul className="lists">
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
        <button className="blue-button" onClick={() => setEditMode(true)}>
          Edit
        </button>{" "}
        <button onClick={() => navigate(`/reviews/${review.id}/delete`)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default ReviewMeat;
