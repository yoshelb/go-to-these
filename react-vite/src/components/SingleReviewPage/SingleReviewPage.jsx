import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SearchComponent from "../SearchComponent/SearchComponent";
import "./SingleReviewPage.css";

function SingleReviewPage() {
  const { reviewId } = useParams(); // Extract the review ID from the URL
  const [review, setReview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
    // Fetch the review data based on the review ID
    const fetchReview = async () => {
      try {
        const response = await fetch(`/api/reviews/${reviewId}`);
        if (!response.ok) {
          throw new Error(response.error);
        }
        const data = await response.json();
        setReview(data);
        setIsLoading(true);
      } catch (error) {
        console.error("Error fetching review:", error);
      }
    };

    fetchReview();
  }, [reviewId]);

  return (
    <>
      <SearchComponent />
      {isLoading && review && (
        <div>
          <h1>Review for {review.place.displayName}</h1>
          {review.place.previewImage && (
            <div className="preview-img-container">
              <div
                className="preview-img"
                style={{
                  backgroundImage: `url("${review.place.previewImage}")`,
                }}
              ></div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default SingleReviewPage;
