import { useSelector } from "react";
import AllReviews from "../../AllReviews.jsx/AllReviews.jsx";
import SearchComponent from "../../SearchComponent/SearchComponent.jsx";
import { Outlet } from "react-router-dom";

function HomePageSignedIn({ sessionUser }) {
  return (
    <main>
      <SearchComponent />
      <AllReviews />
    </main>
  );
}

export default HomePageSignedIn;
