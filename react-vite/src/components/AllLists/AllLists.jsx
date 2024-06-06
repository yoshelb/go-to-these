import "./allLists.css";
import ListCard from "../ListCard/ListCard";
import { useEffect } from "react";
import { thunkUserLists } from "../../redux/lists";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function AllLists() {
  const dispatch = useDispatch();
  let listsArr = useSelector((state) => state.lists.userLists);
  let isLoaded = useSelector((state) => state.lists.isLoaded);
  const navigate = useNavigate();
  useEffect(() => {
    console.log("USE EFTECT RUNNING");
    dispatch(thunkUserLists());
  }, [dispatch]);

  return (
    listsArr &&
    isLoaded && (
      <div className="gallery-container">
        <h1>All lists</h1>
        <button onClick={() => navigate("/lists/new")}>New List</button>
        <div className="gallery">
          {listsArr &&
            listsArr.map((list) => <ListCard key={list.id} list={list} />)}
        </div>
      </div>
    )
  );
}

export default AllLists;
