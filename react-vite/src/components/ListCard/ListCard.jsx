import "./ListCard.css";

function ListCard({ list }) {
  return (
    <div>
      <h1>{list.name}</h1>
      {list.reviews.map((review) => {
        return <p>{review.place.displayName}</p>;
      })}
    </div>
  );
}

export default ListCard;
