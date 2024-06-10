import { useState } from "react";
import { TbStarFilled, TbStar } from "react-icons/tb";

const StarsRating = ({ setRating, rating }) => {
  const [activeRating, setActiveRating] = useState(0);

  return (
    <div className="five-stars-div">
      {[1, 2, 3, 4, 5].map((num) => (
        <div
          key={num}
          onMouseEnter={() => setActiveRating(num)}
          onMouseLeave={() => setActiveRating(0)}
          onClick={() => setRating(num)}
        >
          {(activeRating > 0 && activeRating >= num) ||
          (activeRating === 0 && rating >= num) ? (
            <TbStarFilled className="custom-icon" />
          ) : (
            <TbStar className="custom-icon" />
          )}
        </div>
      ))}
    </div>
  );
};

export default StarsRating;
