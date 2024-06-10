import { NavLink, useNavigate } from "react-router-dom";
// import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useDispatch } from "react-redux";
import { thunkLogout } from "../../redux/session";

function Navigation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    navigate("/");
  };

  return (
    <div className="nav-div">
      <NavLink to="/">
        <img className="logo" alt="logo" src={`/go-to-these.svg`}></img>
      </NavLink>
      <div>
        <button onClick={(e) => logout(e)}>Logout</button>
      </div>

      {/* <ProfileButton /> */}
    </div>
  );
}

export default Navigation;
