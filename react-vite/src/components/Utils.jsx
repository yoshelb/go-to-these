

const fetchList = async (setList, setIsLoading, listId, sessionUser, navigate) => {
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

export { fetchList };
