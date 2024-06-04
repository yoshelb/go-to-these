import { useSelector } from "react";
import AllReviews from "../../AllReviews.jsx";
import SearchComponent from "../../SearchComponent/SearchComponent.jsx";

function HomePageSignedIn({ sessionUser }) {
  return (
    <main>
      <h1>Welcome to Signed in Home Page</h1>
      <SearchComponent />
      <AllReviews />
    </main>
  );
}

export default HomePageSignedIn;
