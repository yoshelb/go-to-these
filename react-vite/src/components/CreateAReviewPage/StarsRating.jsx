import { useState } from "react";
import { IoIosStar, IoIosStarOutline } from "react-icons/io";

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
          {activeRating >= num || rating >= num ? (
            <IoIosStar className="custom-icon" />
          ) : (
            <IoIosStarOutline className="custom-icon" />
          )}
        </div>
      ))}
    </div>
  );
};

export default StarsRating;
