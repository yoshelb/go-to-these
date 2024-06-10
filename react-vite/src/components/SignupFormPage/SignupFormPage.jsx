import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";
import { useNavigate } from "react-router-dom";

function SignupFormPage() {
  const sessionUser = useSelector((state) => state.session.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (sessionUser) {
      navigate("/");
    }
  }, [sessionUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrorObj = {};

    if (password !== confirmPassword) {
      newErrorObj.confirmPassword =
        "Confirm Password field must be the same as the Password field";
    }
    if (password.length < 8) {
      newErrorObj.password = "Password must be at least 8 characters long.";
    }
    if (password.length > 255) {
      newErrorObj.password = "Password must be at least 255 characters long.";
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      newErrorObj.email = "Must be a valid email.";
    }
    if (email.length > 255) {
      newErrorObj.email = "Email must be less than 255 characters long.";
    }
    if (username.length > 40) {
      newErrorObj.username = "Username must be less than 40 characters long.";
    }
    if (username.length < 2) {
      newErrorObj.username = "Username must be at least 2 characters long.";
    }

    if (Object.keys(newErrorObj).length > 0) {
      return setErrors(newErrorObj);
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>

      {errors.server && <p>{errors.server}</p>}
      <form className="signup-form-container" onSubmit={handleSubmit}>
        <div>
          <label>Email: </label>
        </div>
        <div>
          <input
            className="signup-input"
            placeholder="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && <p style={{ color: "#FF253F" }}>{errors.email}</p>}
        </div>
        <div>
          <label>Username: </label>
        </div>
        <div>
          <input
            className="signup-input"
            placeholder="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          {errors.username && (
            <p style={{ color: "#FF253F" }}>{errors.username}</p>
          )}
        </div>
        <div>
          <label>Password:</label>
        </div>
        <div>
          <input
            className="signup-input"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password && (
            <p style={{ color: "#FF253F" }}>{errors.password}</p>
          )}
        </div>
        <div>
          <label>Conform Password:</label>
        </div>
        <div>
          <input
            className="signup-input"
            placeholder="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {errors.confirmPassword && (
            <p style={{ color: "#FF253F" }}>{errors.confirmPassword}</p>
          )}
        </div>
        <div>
          <button id="signup-submit-button" type="submit">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignupFormPage;
