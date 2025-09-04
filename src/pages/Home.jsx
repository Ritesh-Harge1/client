import React, { useEffect, useState } from "react";
import api from "../api.js";
import PostCard from "../components/PostCard.jsx";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/posts").then(res => setPosts(res.data)).finally(() => setLoading(false));
  }, []);

  return (
    <div className="container">
      <h2>Latest Posts</h2>
      {loading ? <p>Loading...</p> : posts.map(p => <PostCard key={p._id} post={p} />)}
      {!loading && posts.length === 0 && <p>No posts yet.</p>}
    </div>
  );
}
