import { useNavigate } from "react-router-dom";

function HomeNotSignedIn() {
  const navigate = useNavigate();
  return (
    <main>
      <h1>
        Collect spots
        <br />
        Make lists
        <br />
        And share them with friends
      </h1>
      <button className="blue-button" onClick={() => navigate("/login")}>
        Login
      </button>
      <button onClick={() => navigate("/signup")}>Sign Up</button>
    </main>
  );
}

export default HomeNotSignedIn;
