import { useSelector, useDispatch } from "react-redux";
import HomeNotSignedIn from "../HomePage/HomeNotSignedIn";
import { useState } from "react";
import ListForm from "./ListForm";
import { thunkUserLists } from "../../redux/lists";
import { useNavigate } from "react-router-dom";

function NewListForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [shareable, setShareable] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

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

    const createList = async () => {
      const response = await fetch("/api/lists/new", {
        method: "POST",
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
        dispatch(thunkUserLists());
        navigate(`/lists/${data.id}`);
      }
    };
    createList();
  };
  return sessionUser ? (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <ListForm
          setName={setName}
          setDescription={setDescription}
          name={name}
          description={description}
          errors={errors}
          setShareable={setShareable}
          shareable={shareable}
        />
        <div>
          <button type="submit">Create List</button>
        </div>
      </form>
    </div>
  ) : (
    <HomeNotSignedIn />
  );
}
export default NewListForm;
