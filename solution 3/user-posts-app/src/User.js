import React, { useState, useEffect } from "react";
import "./User.css"; // Import the CSS file

const User = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const usersResponse = await fetch(
        "https://jsonplaceholder.typicode.com/users",
      );
      const postsResponse = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
      );
      const usersData = await usersResponse.json();
      const postsData = await postsResponse.json();
      setUsers(usersData);
      setPosts(postsData);
    };

    fetchData();
  }, []);

  return (
    <div className="card-container">
      {users.map((user) => {
        const userPosts = posts.filter((post) => post.userId === user.id);
        return (
          <div key={user.id} className="card">
            <h3 className="text-xl font-bold mb-2">User: {user.name}</h3>
            <p className="text-gray-599">Number of Posts: {userPosts.length}</p>
          </div>
        );
      })}
    </div>
  );
};

export default User;
