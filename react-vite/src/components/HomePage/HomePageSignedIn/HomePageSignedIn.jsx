import AllReviews from "../../AllReviews/AllReviews.jsx";

import AllLists from "../../AllLists/AllLists.jsx";
import { useNavigate } from "react-router-dom";

function HomePageSignedIn({ sessionUser }) {
  const navigate = useNavigate();
  return (
    <main className="main-container ">
      <AllLists />
      <button onClick={() => navigate("/reviews/new")}>Add a Spot</button>
      <h2>My Spots:</h2>
      <AllReviews />
    </main>
  );
}

export default HomePageSignedIn;
