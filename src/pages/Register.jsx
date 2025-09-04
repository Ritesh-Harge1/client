import React, { useState } from "react";
import api from "../api.js";
import { useAuth } from "../context/AuthContext.jsx";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await api.post("/auth/register", { username, email, password });
      login(res.data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="container" style={{maxWidth:480}}>
      <h2>Create account</h2>
      <form className="card" onSubmit={submit}>
        <div>
          <label>Username</label>
          <input className="input" value={username} onChange={e=>setUsername(e.target.value)} required />
        </div>
        <div className="mt">
          <label>Email</label>
          <input className="input" value={email} onChange={e=>setEmail(e.target.value)} type="email" required />
        </div>
        <div className="mt">
          <label>Password</label>
          <input className="input" value={password} onChange={e=>setPassword(e.target.value)} type="password" required />
        </div>
        {error && <p className="small" style={{color:"crimson"}}>{error}</p>}
        <div className="mt row">
          <button className="btn primary" type="submit">Sign up</button>
          <div className="right small">Have an account? <Link to="/login">Login</Link></div>
        </div>
      </form>
    </div>
  );
}
