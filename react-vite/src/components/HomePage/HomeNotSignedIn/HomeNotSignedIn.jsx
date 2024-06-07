import OpenModalButton from "../../OpenModalButton";
import LoginFormModal from "../../LoginFormModal";
import { useNavigate } from "react-router-dom";

function HomeNotSignedIn() {
  const navigate = useNavigate();
  return (
    <main >
      <h1>
        Start collecting places you want to remember and sharing with friends
      </h1>
      <button onClick={() => navigate("/login")}>Login</button>
      <button onClick={() => navigate("/signup")}>Sign Up</button>
    </main>
  );
}

export default HomeNotSignedIn;
