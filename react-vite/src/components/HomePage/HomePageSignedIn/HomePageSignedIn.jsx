import AllReviews from "../../AllReviews/AllReviews.jsx";

import AllLists from "../../AllLists/AllLists.jsx";
import { useNavigate } from "react-router-dom";

function HomePageSignedIn({ sessionUser }) {
  const navigate = useNavigate();
  return (
    <main>
      <AllLists />
      <h1>Spots:</h1>
      <button onClick={() => navigate("/reviews/new")}>Add a Spot</button>
      <AllReviews />
    </main>
  );
}

export default HomePageSignedIn;
