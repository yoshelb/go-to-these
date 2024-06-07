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
  const sessionUser = useSelector((state) => state.session.user);
  const navigate = useNavigate();
  useEffect(() => {
    console.log("USE EFTECT RUNNING");
    dispatch(thunkUserLists());
  }, [dispatch]);

  return (
    listsArr &&
    isLoaded && (
      <div>
        <h1>{sessionUser.username}&apos;s lists</h1>
        <button onClick={() => navigate("/lists/new")}>New List</button>
        <div className="lists-div">
          {listsArr &&
            listsArr.map((list) => <ListCard key={list.id} list={list} />)}
        </div>
      </div>
    )
  );
}

export default AllLists;
