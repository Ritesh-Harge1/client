import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../api.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    api.get(`/posts/${id}`)
      .then(res => setPost(res.data))
      .catch(() => setError("Failed to load post"));
  }, [id]);

  const canEdit = user && post && user.id ? (user.id === (post.author?._id || post.author)) : (user && post && user.email === post.author?.email);

  const remove = async () => {
    if (!confirm("Delete this post?")) return;
    try {
      await api.delete(`/posts/${id}`);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  if (error) return <div className="container"><p>{error}</p></div>;
  if (!post) return <div className="container"><p>Loading...</p></div>;

  return (
    <div className="container">
      <div className="card">
        <h2 style={{margin:0}}>{post.title}</h2>
        <p className="small">by {post.author?.username || "Unknown"} • {new Date(post.createdAt).toLocaleString()}</p>
        <div className="tags">
          {post.category && <span className="tag">{post.category}</span>}
          {post.tags?.map((t, i) => <span key={i} className="tag">#{t}</span>)}
        </div>
        <p className="mt" style={{whiteSpace:"pre-wrap"}}>{post.content}</p>
        <div className="row mt">
          <Link className="btn ghost" to="/">Back</Link>
          {user && post.author && (post.author.email === user.email) && (
            <>
              <Link className="btn primary" to={`/posts/${post._id}/edit`}>Edit</Link>
              <button className="btn danger" onClick={remove}>Delete</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
