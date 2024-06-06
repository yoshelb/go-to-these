import { useState } from "react";
import StarsRating from "../CreateAReviewPage/StarsRating";
import { useSelector, useDispatch } from "react-redux";
import ListCheckBoxes from "./ListCheckBoxes";
import { useEffect } from "react";
import { thunkUserLists } from "../../redux/lists";
// import { useNavigate } from "react-router-dom";

function EditReviewForm({ review, setEditMode, setReview }) {
  const [newReview, setNewReview] = useState(review.review);
  const [newRating, setNewRating] = useState(review.rating);
  const [isChecked, setIsChecked] = useState({});
  const dispatch = useDispatch();
  //   const navigate = useNavigate();
  let listsArr = useSelector((state) => state.lists.userLists);
  let isLoaded = useSelector((state) => state.lists.isLoaded);

  useEffect(() => {
    dispatch(thunkUserLists());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updateReview = async () => {
      
      let lists = [];
      if (Object.keys(isChecked).length > 0) {
        Object.keys(isChecked).forEach((list_id) => {
          if (isChecked[list_id]) {
            lists.push(list_id);
          }
        });
      }


      let response = await fetch(`/api/reviews/${review.id}/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          review: newReview,
          rating: newRating,
          lists: lists,
        }),
      });

      if (response.ok) {
        const response = await fetch(`/api/reviews/${review.id}`);
        if (!response.ok) {
          throw new Error(response.error);
        }
        const data = await response.json();
        setReview(data);

        setEditMode(false);
        // navigate(`/reviews/${review.id}`);
      }
    };
    updateReview();
  };
  return (
    isLoaded && (
      <form onSubmit={(e) => handleSubmit(e)}>
        <textarea
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
        ></textarea>
        <StarsRating rating={newRating} setRating={setNewRating} />
        <ListCheckBoxes
          listArr={listsArr}
          checkedLists={review.lists}
          isChecked={isChecked}
          setIsChecked={setIsChecked}
        />
        <div>
          <button type="submit">Update Review</button>
          <button type="button" onClick={() => setEditMode(false)}>
            Cancel
          </button>
        </div>
      </form>
    )
  );
}

export default EditReviewForm;
