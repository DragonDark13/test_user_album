import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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
      <h2>Альбоми користувача</h2>
      <ul>
        {albums.map((album) => (
          <li key={album.id}>{album.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserAlbums;
