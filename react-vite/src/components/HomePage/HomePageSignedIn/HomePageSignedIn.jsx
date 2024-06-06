import AllReviews from "../../AllReviews/AllReviews.jsx";

import AllLists from "../../AllLists/AllLists.jsx";

function HomePageSignedIn({ sessionUser }) {
  return (
    <main>
      <AllLists />
      <AllReviews />
    </main>
  );
}

export default HomePageSignedIn;
