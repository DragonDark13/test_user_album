import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

interface Album {
  userId: number;
  id: number;
  title: string;
}

const UserAlbums: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [albums, setAlbums] = useState<Album[]>([]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
      .then((response) => response.json())
      .then((data: Album[]) => setAlbums(data));
  }, [userId]);

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>User Albums</title>
      </Helmet>
      <h2>Альбоми користувача</h2>
      <ul>
        {albums.map((album) => (
          <li key={album.id}>
            <Link to={`/albums/${userId}/${album.id}`}>{album.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserAlbums;
