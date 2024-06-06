import "./ListCard.css";
import { useNavigate } from "react-router-dom";

function ListCard({ list }) {
  const navigate = useNavigate();
  return (
    <div
      style={{ cursor: "pointer" }}
      onClick={() => navigate(`/lists/${list.id}`)}
    >
      <h1>{list.name}</h1>
      {/* {list.reviews.map((review) => {
        return <p key={review.id}>{review.place.displayName}</p>;
      })} */}
    </div>
  );
}

export default ListCard;
