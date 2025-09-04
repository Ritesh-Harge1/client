import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api.js";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("General");
  const [tags, setTags] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/posts/${id}`).then(res => {
      const p = res.data;
      setTitle(p.title);
      setContent(p.content);
      setCategory(p.category || "General");
      setTags((p.tags || []).join(", "));
    }).catch(()=> setError("Failed to load post"));
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const payload = { title, content, category, tags: tags.split(",").map(t=>t.trim()).filter(Boolean) };
      await api.put(`/posts/${id}`, payload);
      navigate(`/posts/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update post");
    }
  };

  return (
    <div className="container" style={{maxWidth:720}}>
      <h2>Edit Post</h2>
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
            <input className="input" value={tags} onChange={e=>setTags(e.target.value)} />
          </div>
        </div>
        {error && <p className="small" style={{color:"crimson"}}>{error}</p>}
        <div className="mt">
          <button className="btn primary" type="submit">Save changes</button>
        </div>
      </form>
    </div>
  );
}
