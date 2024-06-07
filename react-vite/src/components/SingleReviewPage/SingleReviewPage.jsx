import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "./SingleReviewPage.css";
import HomeNotSignedIn from "../HomePage/HomeNotSignedIn";
import { useSelector } from "react-redux";
import ReviewMeat from "./ReviewMeat";
import EditReviewForm from "./editReviewForm";

function SingleReviewPage() {
  const location = useLocation();
  const listId = location.search?.split("=")[1] || "";
  console.log("LISTID====", listId);
  const { reviewId } = useParams(); // Extract the review ID from the URL
  const [review, setReview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  let navigate = useNavigate();

  useEffect(() => {
    if (listId) {
      setEditMode(true);
    }
  }, [listId]);

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
        console.log("REVIEW in useeffect===>", data);
        if (sessionUser.id != data.user_id) navigate("/");
        setIsLoading(true);
      } catch (error) {
        console.error("Error fetching review:", error);
      }
    };

    fetchReview();
  }, [reviewId, sessionUser, navigate]);

  return sessionUser ? (
    <>
      {isLoading && review && (
        <>
          <div className="main-container">
            <h1>{review.place.displayName}</h1>
            {
              <div className="preview-img-container">
                <div
                  className="preview-img"
                  style={{
                    backgroundImage: `url("${
                      review.place.previewImage
                        ? review.place.previewImage
                        : "/missing-place.png"
                    }")`,
                  }}
                ></div>
              </div>
            }
          </div>

          {!editMode ? (
            <ReviewMeat review={review} setEditMode={setEditMode} />
          ) : (
            <EditReviewForm
              review={review}
              setEditMode={setEditMode}
              setReview={setReview}
              listId={listId}
            />
          )}
        </>
      )}
    </>
  ) : (
    <HomeNotSignedIn />
  );
}

export default SingleReviewPage;
