import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Error from "./Error";
import Success from "./Success";

type Props = {};
const ResetForm = (props: Props) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setError("");

    // Register
    setLoading(true);
    const endpoint = "https://mern-auth-backend-q1ev.onrender.com/reset-password";
    fetch(endpoint, {
      method: "POST",
      body: JSON.stringify({ firstName, lastName, email, password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        // setLoading
        setLoading(false);
        // Redirect to login page if password reset successful.
        if (data.user) {
          setSuccess("Reset successful! Redirecting you to login.");
          const timer = setTimeout(() => {
              navigate("/login");
              clearTimeout(timer);
              window.location.reload();
          },3000);
        }

        // setError
        if(data.error) {
            setError(data.error);
            return;
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
              <span className="label-text">First Name</span>
            </label>
            <input
              type="text"
              placeholder="first name"
              className="input input-bordered"
              minLength={3}
              maxLength={15}
              required
              value={firstName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFirstName(e.target.value)
              }
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Last Name</span>
            </label>
            <input
              type="text"
              placeholder="last name"
              className="input input-bordered"
              minLength={3}
              maxLength={15}
              required
              value={lastName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setLastName(e.target.value)
              }
            />
          </div>
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
              <span className="label-text">New Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered"
              minLength={8}
              maxLength={20}
              required
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
          </div>
          {/* Signup */}
          <Link to="/login" className="px-1 label-text-alt link link-hover">
            Already have an account? Login Here
          </Link>

          {/* Error */}
          {error ? <Error message={error} /> : null}
          {/* Success */}
          {success ? <Success message={success} /> : null}

          <div className="form-control mt-6">
            <button className="btn btn-primary" disabled={loading}>
              {loading ? "Resetting..." : "Reset"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ResetForm;
