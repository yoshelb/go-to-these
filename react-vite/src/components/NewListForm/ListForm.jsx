function ListForm({
  setName,
  setDescription,
  name,
  description,
  errors,
  setShareable,
  shareable,
}) {
  return (
    <>
      <div>
        <label>List Name: </label>
        <input
          value={name}
          type="text"
          onChange={(e) => setName(e.target.value)}
        ></input>
        {errors.name && <p style={{ color: "#FF253F" }}>{errors.name}</p>}
      </div>
      <div>
        <label>List Description: </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        {errors.description && (
          <p style={{ color: "#FF253F" }}>{errors.description}</p>
        )}
      </div>
      <div>
        <p>Allow this list to be viewed publicaly by Link?</p>
        <div>
          <button
            type="button"
            className={
              shareable ? "blue-button selected-button" : "blue-button"
            }
            onClick={() => setShareable(true)}
          >
            Yes
          </button>
          <button
            className={
              !shareable ? "blue-button selected-button" : "blue-button"
            }
            type="button"
            onClick={() => setShareable(false)}
          >
            No
          </button>
        </div>
      </div>
    </>
  );
}
export default ListForm;
