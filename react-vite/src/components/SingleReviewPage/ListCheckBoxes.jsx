import { useEffect } from "react";

function ListCheckBoxes({
  listArr,
  checkedLists,
  isChecked,
  setIsChecked,
  listId,
}) {
  //   const [isChecked, setIsChecked] = useState({});

  useEffect(() => {
    let newCheckedObj = {};
    listArr.forEach((list) => {
      newCheckedObj[list.id] = false;
    });

    if (checkedLists) {
      checkedLists.forEach((list) => {
        newCheckedObj[list.id] = true;
      });
    }
    if (listId) {
      newCheckedObj[listId] = true;
    }

    setIsChecked(newCheckedObj);
  }, [listArr, checkedLists, setIsChecked]);

  const handleCheckboxChange = (id) => {
    setIsChecked((prevChecked) => ({
      ...prevChecked,
      [id]: !prevChecked[id],
    }));
  };

  return (
    <div>
      <h3>Include this spot on some lists:</h3>
      {listArr.map((list) => (
        <div key={list.id}>
          <label>
            <input
              type="checkbox"
              checked={isChecked[list.id]}
              onChange={() => handleCheckboxChange(list.id)}
            />
            {list.name}
          </label>
        </div>
      ))}
    </div>
  );
}

export default ListCheckBoxes;
