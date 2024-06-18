import { useEffect, useState, useCallback } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";

function LoginFormPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [demoSubmit, setDemoSubmit] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    if (sessionUser) {
      navigate("/", { replace: true });
    }
  }, [sessionUser, navigate]);

  const handleSubmit = useCallback(
    async (e) => {
      e?.preventDefault();
      try {
        const serverResponse = await dispatch(
          thunkLogin({
            email,
            password,
          })
        );

        if (serverResponse) {
          setErrors(serverResponse);
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Login failed:", error);
      }
    },
    [dispatch, email, password, navigate]
  );

  const handleDemoSubmit = () => {
    setEmail("demo@aa.io");
    setPassword("password");
    setDemoSubmit(true);
  };
  useEffect(() => {
    if (demoSubmit) {
      handleSubmit();
    }
  }, [demoSubmit, handleSubmit]);

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <label>Email:</label>
          </div>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {errors.email && <p>{errors.email}</p>}
        </div>
        <div>
          <div>
            <label>Password:</label>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {errors.password && <p>{errors.password}</p>}
        </div>
        <div className="button-div">
          <button type="submit">Log In</button>
          <button
            className="blue-button"
            type="button"
            onClick={handleDemoSubmit}
          >
            Demo User
          </button>
        </div>
      </form>
    </>
  );
}

export default LoginFormPage;
