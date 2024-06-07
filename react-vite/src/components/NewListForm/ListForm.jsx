function ListForm({ setName, setDescription, name, description, errors }) {

  return (
    <>
      <label>List Name:</label>
      <input value={name} onChange={(e) => setName(e.target.value)}></input>
      {errors.name && <p style={{ color: "#FF253F" }}>{errors.name}</p>}
      <label>List Description</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      {errors.description && (
        <p style={{ color: "#FF253F" }}>{errors.description}</p>
      )}
    </>
  );
}
export default ListForm;
