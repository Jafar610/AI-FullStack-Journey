import { useState } from "react";
import style from "./login.module.css";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      return setError("Email and password are required");
    }

    try {
      setLoading(true);
      const res = await api.post("/auth/login", form);
      const { token, user } = res.data.data;

      if (!token) {
        throw new Error("Invalid token from server");
      }

      // save auth data
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

    // go to chat page
navigate("/");

    } catch (error) {
      const message = err.response?.data?.message || "Login failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style.mainContainer}>
      <div className={style.contentWrapper}>
        <h1 className={style.h1}>Login To Your Account</h1>
        <p className={style.p1}>
          Note that phone verification may be required for signup. Your number
          will only be used to verify your identitfy for security puporses.
        </p>

        <form onSubmit={submitHandler}>
          {error && <p className={style.errorMessage}>{error}</p>}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            value={form.email}
          />
          <br />
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={handleChange}
            value={form.password}
          />
          <br />
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-center">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-400 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
