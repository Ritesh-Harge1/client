import React from "react";
import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <div className="card">
      <h3 style={{margin:0}}>
        <Link to={`/posts/${post._id}`}>{post.title}</Link>
      </h3>
      <p className="small">by {post.author?.username || "Unknown"} • {new Date(post.createdAt).toLocaleString()}</p>
      <p>{post.content.slice(0, 180)}{post.content.length > 180 ? "..." : ""}</p>
      <div className="tags">
        {post.category && <span className="tag">{post.category}</span>}
        {post.tags?.map((t, i) => <span key={i} className="tag">#{t}</span>)}
      </div>
    </div>
  );
}
