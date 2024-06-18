import { useNavigate } from "react-router-dom";

function HomeNotSignedIn() {
  const navigate = useNavigate();
  return (
    <main className="not-signed-in-page">
      <h1>
        Collect spots
        <br />
        Make lists
        <br />
        Share them with friends
      </h1>
      <div className="button-div">
        <button className="blue-button" onClick={() => navigate("/login")}>
          Login
        </button>
        <button onClick={() => navigate("/signup")}>Sign Up</button>
      </div>
      <a href={`${window.origin}/api/auth/oauth_login`}>
        <button className="small-button">Sign in with Google</button>
      </a>
    </main>
  );
}

export default HomeNotSignedIn;
