import { useState } from "react";
import style from "./login.module.css";
import api from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
function Registration() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.prevantDefault;
    setError("");

    if (!form.name || !form.email || !form.password) {
      return setError("All fields are required");
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/register", form);
      if (res.data.success) {
        navigate("/login");
      }
    } catch (error) {
      const message = err.response?.data?.message || "Registration failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  return (
    <div className={style.mainContainer}>
      <div className={style.contentWrapper}>
        <h1 className={style.h1}>Create Your Account</h1>
        <p className={style.p1}>
          Note that phone verification may be required for signup. Your number
          will only be used to verify your identitfy for security puporses.
        </p>

        <form onSubmit={submitHandler}>
          {/* Error */}
          {error && <p className={style.errorMessage}>{error}</p>}
          <input
            type="text"
            name="name"
            id=""
            placeholder="Your Name"
            onChange={handleChange}
            value={form.name}
          />
          <br />
          <input
            type="email"
            name="email"
            id=""
            placeholder="Email Address"
            nChange={handleChange}
            value={form.email}
          />
          <br />
          <input
            type="password"
            name="password"
            id=""
            placeholder="password"
            nChange={handleChange}
            value={form.password}
          />
          <br />
          <button disabled={loading} type="submit">
            {loading ? "Creating..." : "Register"}
          </button>
        </form>

         <p className="text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Registration;
