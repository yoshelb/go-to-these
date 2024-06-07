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
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <button type="submit">Log In</button>
        <button type="button" onClick={handleDemoSubmit}>
          Demo User
        </button>
      </form>
    </>
  );
}

export default LoginFormPage;

