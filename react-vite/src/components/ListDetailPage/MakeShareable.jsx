function MakeShareable({ closeModal, setEditMode, setShareable }) {
  const openEditMode = () => {
    setEditMode(true);
    setShareable(true);
    closeModal();
  };

  return (
    <div className="share-buttons">
      <h1>Make list shareable by link?</h1>
      <button onClick={openEditMode}>Yes</button>
      <button onClick={closeModal}>No</button>
    </div>
  );
}

export default MakeShareable;
