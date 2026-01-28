import { useState } from "react";
import { Link } from "react-router-dom";
import "./CustomerLogin.css";

const CustomerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Frontend only - no authentication logic
    console.log("Login submitted:", { email, password });
  };

  return (
    <div className="customer-login-container">
      <div className="customer-login-card">
        <h1 className="customer-login-title">Customer Login</h1>
        
        <form onSubmit={handleSubmit} className="customer-login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        <p className="register-link">
          New customer? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default CustomerLogin;
