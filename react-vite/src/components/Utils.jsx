const fetchList = async (
  setList,
  setIsLoading,
  listId,
  sessionUser,
  navigate
) => {
  try {
    const response = await fetch(`/api/lists/${listId}`);

    const data = await response.json();
    if (sessionUser && sessionUser.id == data.user_id && !response.ok) {
      throw new Error(response.error);
    }
    console.log("DATA", data);
    setList(data);
    setIsLoading(true);
  } catch (error) {
    console.error("Error fetching review:", error);
  }
};

export { fetchList };
