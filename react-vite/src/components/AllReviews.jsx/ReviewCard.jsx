import "./reviewCard.css";

function ReviewCard({ review }) {
  console.log("REVIEW IN REVIEWCARD: ====>", review);
  return (
    review && (
      <div>
        <div
          className="shop-image"
          style={{ backgroundImage: `url("${review.place.previewImage}")` }}
        ></div>
        <h2>Review Card</h2>
      </div>
    )
  );
}

export default ReviewCard;
