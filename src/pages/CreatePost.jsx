import React, { useState } from "react";
import api from "../api.js";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("General");
  const [tags, setTags] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const payload = { title, content, category, tags: tags.split(",").map(t=>t.trim()).filter(Boolean) };
      const res = await api.post("/posts", payload);
      navigate(`/posts/${res.data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create post");
    }
  };

  return (
    <div className="container" style={{maxWidth:720}}>
      <h2>Add Post</h2>
      <form className="card" onSubmit={submit}>
        <div>
          <label>Title</label>
          <input className="input" value={title} onChange={e=>setTitle(e.target.value)} required />
        </div>
        <div className="mt">
          <label>Content</label>
          <textarea className="input" rows="8" value={content} onChange={e=>setContent(e.target.value)} required />
        </div>
        <div className="mt row">
          <div style={{flex:1}}>
            <label>Category</label>
            <input className="input" value={category} onChange={e=>setCategory(e.target.value)} />
          </div>
          <div style={{flex:2}}>
            <label>Tags (comma separated)</label>
            <input className="input" value={tags} onChange={e=>setTags(e.target.value)} placeholder="news, tech, life" />
          </div>
        </div>
        {error && <p className="small" style={{color:"crimson"}}>{error}</p>}
        <div className="mt">
          <button className="btn primary" type="submit">Publish</button>
        </div>
      </form>
    </div>
  );
}
