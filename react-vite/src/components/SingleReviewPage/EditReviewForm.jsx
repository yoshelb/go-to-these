import { useState } from "react";
import StarsRating from "../CreateAReviewPage/StarsRating";
import { useSelector, useDispatch } from "react-redux";
import ListCheckBoxes from "./ListCheckBoxes";
import { useEffect } from "react";
import { thunkUserLists } from "../../redux/lists";
import { useNavigate } from "react-router-dom";

function EditReviewForm({ review, setEditMode, setReview, listId }) {
  const [newReview, setNewReview] = useState(review.review);
  const [newRating, setNewRating] = useState(review.rating);
  const [errors, setErrors] = useState("");
  const [isChecked, setIsChecked] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let listsArr = useSelector((state) => state.lists.userLists);
  let isLoaded = useSelector((state) => state.lists.isLoaded);

  // GET LIST INFO
  useEffect(() => {
    dispatch(thunkUserLists());
  }, [dispatch]);

  // SUBMIT===============
  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrorObj = {};
    if (newRating < 1) {
      newErrorObj.rating = "Rating between 1 and 5 is required";
    }
    if (newReview.length > 800) {
      newErrorObj.review = "Review must be shorter than 800 characters";
    }
    if (Object.keys(newErrorObj).length > 0) {
      return setErrors(newErrorObj);
    }

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
        if (listId) {
          return navigate(`/lists/${listId}`);
        } else {
          setEditMode(false);
        }

        // navigate(`/reviews/${review.id}`);
      }
    };
    updateReview();
  };

  return (
    isLoaded && (
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <textarea
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
          ></textarea>
        </div>
        <div>
          {errors.review && <p className="errors">{errors.review}</p>}
          <StarsRating rating={newRating} setRating={setNewRating} />
        </div>
        {errors.rating && <p className="errors">{errors.rating}</p>}
        <ListCheckBoxes
          listArr={listsArr}
          checkedLists={review.lists}
          listId={listId}
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
