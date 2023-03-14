import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Error from "./Error";
import Success from "./Success";

type Props = {};
const LoginForm = (props: Props) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    // Login
    setLoading(true);
    const endpoint = "https://mern-auth-backend-q1ev.onrender.com/login";
    fetch(endpoint, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        // setLoading
        setLoading(false);
        // Redirect to home page if login successful.
        if (data.user) {
          setSuccess("Login successful! Redirecting you to home.");
          const timer = setTimeout(() => {
              navigate("/", {replace: true});
              clearTimeout(timer);
              window.location.reload();
          },3000);
        }
        // Assign error text content if available.
        if (data.errors) {
          if (data.errors.firstName.length) {
            setError(data.errors.firstName);
            return;
          } else if (data.errors.lastName.length) {
            setError(data.errors.lastName);
            return;
          } else if (data.errors.email.length) {
            setError(data.errors.email);
            return;
          } else if (data.errors.password.length) {
            setError(data.errors.password);
            return;
          } else {
            setError("Something went wrong.");
            return;
          }
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <div className="hero">
      <div className="card flex-shrink-0 w-full max-w-md shadow-2xl bg-base-100">
        <form className="card-body" onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered"
              required
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered"
              required
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
            <label className="label">
              <Link
                to="/reset"
                className="label-text-alt link link-hover"
              >
                Forgot password?
              </Link>
            </label>
          </div>
          {/* Signup */}
          <Link to="/signup" className="px-1 label-text-alt link link-hover">
            Don't have an account? Signup Here
          </Link>
          {/* Error */}
          {error ? <Error message={error} /> : null}
          {/* Success */}
          {success ? <Success message={success} /> : null}

          <div className="form-control mt-6">
            <button className="btn btn-primary" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default LoginForm;
