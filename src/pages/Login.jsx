import React, { useState } from "react";
import api from "../api.js";
import { useAuth } from "../context/AuthContext.jsx";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container" style={{maxWidth:480}}>
      <h2>Login</h2>
      <form className="card" onSubmit={submit}>
        <div>
          <label>Email</label>
          <input className="input" value={email} onChange={e=>setEmail(e.target.value)} type="email" required />
        </div>
        <div className="mt">
          <label>Password</label>
          <input className="input" value={password} onChange={e=>setPassword(e.target.value)} type="password" required />
        </div>
        {error && <p className="small" style={{color:"crimson"}}>{error}</p>}
        <div className="mt row">
          <button className="btn primary" type="submit">Login</button>
          <div className="right small">No account? <Link to="/register">Register</Link></div>
        </div>
      </form>
    </div>
  );
}
