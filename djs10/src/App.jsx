import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  // State to hold the blog posts
  const [posts, setPosts] = useState([]);
  // State to handle loading and errors
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch posts when the component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Make API request
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/posts'
        );

        // Check if response is ok
        if (!response.ok) {
          throw new Error('Data fetching failed');
        }

        // Parse the response data as JSON
        const data = await response.json();

        // Update the posts state
        setPosts(data);
      } catch (error) {
        // Handle error and update the error state
        setError(error.message);
      } finally {
        // Set loading state to false when the request is complete
        setLoading(false);
      }
    };

    fetchPosts();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <div className="App">
      {/* Show loading message while fetching */}
      {loading && <p>Loading posts...</p>}

      {/* Show error message if an error occurred */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Render the posts once they are loaded */}
      {!loading && !error && (
        <div>
          <h1 className="page-title">Blog Posts</h1>
          <ul className="numbered-list">
            {posts.map((post) => (
              <li key={post.id} style={{ marginBottom: '10px' }}>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
