import "./ListCard.css";
import { useNavigate } from "react-router-dom";

function ListCard({ list }) {
  const navigate = useNavigate();
  return (
    <div
      className="list-card"
      style={{ cursor: "pointer" }}
      onClick={() => navigate(`/lists/${list.id}`)}
    >
      <h1 class="list-name">{list.name}</h1>
    </div>
  );
}

export default ListCard;
