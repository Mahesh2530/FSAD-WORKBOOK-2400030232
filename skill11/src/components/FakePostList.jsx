
import React, { useEffect, useState } from "react";
import axios from "axios";

const FakePostList = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [userId, setUserId] = useState("all");
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    setLoading(true);
    const res = await axios.get("https://dummyjson.com/posts");
    setPosts(res.data.posts);
    setFilteredPosts(res.data.posts);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleFilter = (value) => {
    setUserId(value);

    if (value === "all") {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter((p) => p.userId === parseInt(value)));
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>Fake API Posts</h2>

      <div className="controls">
        <button onClick={fetchPosts}>Refresh</button>

        <select value={userId} onChange={(e) => handleFilter(e.target.value)}>
          <option value="all">All Users</option>
          <option value="1">User 1</option>
          <option value="2">User 2</option>
          <option value="3">User 3</option>
        </select>
      </div>

      {filteredPosts.map((post) => (
        <div key={post.id} className="card">
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <p><b>User ID:</b> {post.userId}</p>
        </div>
      ))}
    </div>
  );
};

export default FakePostList;
