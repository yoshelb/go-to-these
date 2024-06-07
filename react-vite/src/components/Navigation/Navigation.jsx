import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <div className="nav-div">
      <NavLink to="/">
        <img alt="logo" src={`/go-to-these.svg`}></img>
      </NavLink>
      <ProfileButton />
    </div>
  );
}

export default Navigation;
