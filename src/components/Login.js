import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => {
          onLogin(user);
          navigate("/"); // Redirect to the homepage
        });
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <section className="pt-[120px] pb-[80px] lg:pt-[180px] lg:pb-[100px] relative overflow-hidden">
      <div className="container mx-auto">
        <form onSubmit={handleSubmit} className="form">
          <div>
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="form-control"
              autoComplete="off"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button type="submit" className="px-btn px-btn-theme mt-4">
              {isLoading ? "Loading..." : "Login"}
            </button>
          </div>
          {/* <div>
            {errors.map((err) => (
              <span key={err}>{err}</span>
            ))}
          </div> */}
        </form>
      </div>
    </section>
  );
}