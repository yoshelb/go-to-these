
import AllReviews from "../../AllReviews.jsx/AllReviews.jsx";
import SearchComponent from "../../SearchComponent/SearchComponent.jsx";
import AllLists from "../../AllLists/AllLists.jsx";

function HomePageSignedIn({ sessionUser }) {
  return (
    <main>
      <SearchComponent />
      <AllLists />
      <AllReviews />
    </main>
  );
}

export default HomePageSignedIn;
