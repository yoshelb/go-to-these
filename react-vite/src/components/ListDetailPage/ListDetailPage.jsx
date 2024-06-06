import "./ListDetailPage.css";
import HomeNotSignedIn from "../HomePage/HomeNotSignedIn";
import ReviewCard from "../AllReviews.jsx/ReviewCard";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SearchComponent from "../SearchComponent/SearchComponent";
import { useNavigate, useParams } from "react-router-dom";

function ListDetailPage() {
  const navigate = useNavigate();
  const { listId } = useParams(); // Extract the review ID from the URL
  const [list, setList] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);

  const fetchReview = async () => {
    try {
      const response = await fetch(`/api/lists/${listId}`);
      if (!response.ok) {
        throw new Error(response.error);
      }
      const data = await response.json();
      setList(data);
      if (sessionUser.id != data.user_id) navigate("/");
      setIsLoading(true);
    } catch (error) {
      console.error("Error fetching review:", error);
    }
  };

  useEffect(() => {
    setIsLoading(false);
    // Fetch the review data based on the review ID
    fetchReview();
  }, [listId, sessionUser, navigate]);

  const removeFromList = (review_id) => {
    const removeReview = async () => {
      try {
        const response = await fetch(
          `/api/lists/${listId}/reviews/${review_id}/delete`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) {
          throw new Error(response.error);
        }
        await fetchReview();
      } catch (error) {
        console.error("Error fetching review:", error);
      }
    };
    removeReview();
  };
  return sessionUser ? (
    <div>
      <SearchComponent />
      {isLoading && list && (
        <div>
          <div className="gallery-container">
            <h1>{list.name}</h1>
            <button onClick={() => setEditMode(!editMode)}>
              {editMode ? "Finished Editing" : "Edit List"}
            </button>
            <div className="gallery">
              {list.reviews &&
                list.reviews.map((review) => (
                  <div key={review.spot_id}>
                    <ReviewCard review={review} />
                    {editMode && (
                      <button onClick={() => removeFromList(review.id)}>
                        Remove from list
                      </button>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  ) : (
    <HomeNotSignedIn />
  );
}

export default ListDetailPage;
