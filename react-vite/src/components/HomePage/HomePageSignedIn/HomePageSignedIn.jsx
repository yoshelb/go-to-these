import { useSelector } from "react";
import AllReviews from "../../AllReviews.jsx";

function HomePageSignedIn({ sessionUser }) {
  return (
    <main>
      <h1>Welcome to Signed in Home Page</h1>
      <AllReviews />
    </main>
  );
}

export default HomePageSignedIn;
