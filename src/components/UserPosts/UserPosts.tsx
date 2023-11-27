import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const UserPosts: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then((response) => response.json())
      .then((data: Post[]) => setPosts(data));
  }, [userId]);

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>User Posts</title>
      </Helmet>
      <h2>Пости користувача</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`/posts/${userId}/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserPosts;
