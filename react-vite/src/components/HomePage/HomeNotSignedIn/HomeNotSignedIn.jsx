import { useNavigate } from "react-router-dom";

function HomeNotSignedIn() {
  const navigate = useNavigate();
  return (
    <main>
      <h1>Start collecting lists of spots to rember and share with friends.</h1>
      <button className="blue-button" onClick={() => navigate("/login")}>
        Login
      </button>
      <button onClick={() => navigate("/signup")}>Sign Up</button>
    </main>
  );
}

export default HomeNotSignedIn;
