import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { thunkUserLists } from "../../redux/lists";
import { useEffect, useState } from "react";

function DeleteListPage() {
  const dispatch = useDispatch();
  const { listId } = useParams();
  const [list, setList] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  const navigate = useNavigate();

  const fetchList = async () => {
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

  const handleDelete = () => {
    const deleteList = async () => {
      let response = await fetch(`/api/lists/${list.id}/delete`, {
        method: "DELETE",
      });
      if (response.ok) {
        dispatch(thunkUserLists()).then(() => navigate("/"));
      }
    };
    deleteList();
  };

  useEffect(() => {
    setIsLoading(false);
    // Fetch the review data based on the review ID
    fetchList();
  }, [listId, sessionUser, navigate]);

  return (
    isLoading && (
      <div>
        <h1>Are you sure you want to delete {list.name}?</h1>
        <div className="button-div">
          <button onClick={handleDelete}>Delete</button>
          <button
            className="blue-button"
            onClick={() => navigate(`/lists/${list.id}`)}
          >
            Cancel
          </button>
        </div>
      </div>
    )
  );
}

export default DeleteListPage;
