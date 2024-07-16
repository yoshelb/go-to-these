import "./ListDetailPage.css";
import HomeNotSignedIn from "../HomePage/HomeNotSignedIn";
import ReviewCard from "../AllReviews/ReviewCard";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { fetchList } from "../Utils";
import ListForm from "../NewListForm/ListForm";
import { thunkUserLists } from "../../redux/lists";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import ShareButtons from "../ShareButtons/ShareButtons";
import { useModal } from "../../context/Modal";
import { LuShare } from "react-icons/lu";
import MakeShareable from "./MakeShareable";
import { Helmet } from "react-helmet";

function ListDetailPage() {
  const { closeModal } = useModal();
  const navigate = useNavigate();
  const location = useLocation();
  const { listId } = useParams(); // Extract the review ID from the URL
  const [list, setList] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [shareable, setShareable] = useState("");
  const [errors, setErrors] = useState({});

  // Set name and description to start as list props
  useEffect(() => {
    if (list) {
      setName(list.name);
      setDescription(list.description);
      setShareable(list.shareable_by_link);
    }
  }, [list]);

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

  // HANDLE CANCEL ===========================

  const handleCancel = () => {
    setShareable(list.shareable_by_link);
    setEditMode(false);
  };

  // EDIT NAME AND DESCRIPTION ==================

  const handleEdit = (e) => {
    e.preventDefault();
    console.log("handling edit!", list.id);

    const newErrorObj = {};

    if (name.length < 1) {
      newErrorObj.name = "Name is required.";
    }
    if (name.length > 25) {
      newErrorObj.name = "Name must be shorter than 25 characters.";
    }
    if (description.length > 200) {
      newErrorObj.description =
        "Description must be shorter than 200 characters.";
    }

    if (Object.keys(newErrorObj).length > 0) {
      return setErrors(newErrorObj);
    }

    const editList = async () => {
      const response = await fetch(`/api/lists/${list.id}/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          description: description,
          shareable_by_link: shareable,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("RESPONSE FRONT", data);
        await dispatch(thunkUserLists());
        await fetchList(setList, setIsLoading, listId, sessionUser, navigate);
        setEditMode(false);
      }
    };
    editList();
  };

  return (
    <>
      {isLoading &&
      list &&
      (list.shareable_by_link ||
        (sessionUser && sessionUser.id === list.user_id)) ? (
        <div>
          <div>
            <div>
              {editMode ? (
                <form onSubmit={(e) => handleEdit(e)}>
                  <ListForm
                    setName={setName}
                    setDescription={setDescription}
                    setShareable={setShareable}
                    shareable={shareable}
                    name={name}
                    description={description}
                    errors={errors}
                    list={list}
                  />
                  <div>
                    <button className=" small-button" type="submit">
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCancel()}
                      className="blue-button small-button"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="title-and-share-div">
                    <h1>{list.name}</h1>
                    {list.shareable_by_link && (
                      <OpenModalButton
                        className={"share-list-button"}
                        modalComponent={
                          <ShareButtons closeModal={closeModal} listName={list.name} listDescription={list.description}/>
                        }
                        buttonText={<LuShare />}
                      />
                    )}
                    {!list.shareable_by_link && (
                      <OpenModalButton
                        className={"make-shareable-button"}
                        modalComponent={
                          <MakeShareable
                            closeModal={closeModal}
                            setEditMode={setEditMode}
                            setShareable={setShareable}
                          />
                        }
                        buttonText={<LuShare />}
                      />
                    )}
                  </div>
                  <p>{list.description}</p>
                </>
              )}
              {sessionUser && sessionUser.id === list.user_id && (
                <>
                  {" "}
                  {!editMode && (
                    <>
                      <button
                        className="blue-button small-button"
                        onClick={() => setEditMode(!editMode)}
                      >
                        Edit
                      </button>
                      <button
                        className="small-button"
                        onClick={() => navigate(`/lists/${list.id}/delete`)}
                      >
                        Delete List
                      </button>
                    </>
                  )}
                </>
              )}
              <div className="gallery">
                {sessionUser && sessionUser.id === list.user_id && (
                  <div
                    className="shop-image add"
                    onClick={() => navigate(`/reviews/new?list=${list.id}`)}
                    style={{
                      backgroundImage: `url("/add.png")`,
                      cursor: "pointer",
                    }}
                  ></div>
                )}
                {list.reviews &&
                  list.reviews
                    .sort(
                      (a, b) =>
                        new Date(b.added_to_list_at) -
                        new Date(a.added_to_list_at)
                    )
                    .map((review) => (
                      <div key={review.spot_id}>
                        <ReviewCard review={review} />
                        {sessionUser && sessionUser.id === list.user_id && (
                          <button
                            className="small-button remove-from-list-button"
                            onClick={() => removeFromList(review.id)}
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h1>This list is not public</h1>
          <p>If a friend sent you this list just ask them to make it public!</p>
        </div>
      )}
    </>
  );
}

export default ListDetailPage;
