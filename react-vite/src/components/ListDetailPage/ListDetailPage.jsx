import "./ListDetailPage.css";
import HomeNotSignedIn from "../HomePage/HomeNotSignedIn";
import ReviewCard from "../AllReviews/ReviewCard";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchList } from "../Utils";

function ListDetailPage() {
  const navigate = useNavigate();
  const { listId } = useParams(); // Extract the review ID from the URL
  const [list, setList] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    setIsLoading(false);
    // Fetch the review data based on the review ID
    fetchList(setList, setIsLoading, listId, sessionUser, navigate);
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
        await fetchList(setList, setIsLoading, listId, sessionUser, navigate);
      } catch (error) {
        console.error("Error fetching review:", error);
      }
    };
    removeReview();
  };

  return sessionUser ? (
    <div>
      {isLoading && list && (
        <div>
          <div>
            <h1>{list.name}</h1>
            <p>{list.description}</p>
            <button onClick={() => setEditMode(!editMode)}>
              {editMode ? "Finished Editing" : "Edit List"}
            </button>
            <button onClick={() => navigate(`/lists/${list.id}/delete`)}>
              Delete List
            </button>
            <div className="gallery">
              <div
                className="shop-image add"
                onClick={() => navigate(`/reviews/new?list=${list.id}`)}
                style={{
                  backgroundImage: `url("/add.png")`,
                  cursor: "pointer",
                }}
              ></div>
              {list.reviews &&
                list.reviews
                  .sort(
                    (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
                  )
                  .map((review) => (
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
