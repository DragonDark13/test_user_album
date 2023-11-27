import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface User {
  id: number;
  name: string;
}

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data: User[]) => setUsers(data));
  }, []);

  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/posts/${user.id}`}>{user.name}'s пости</Link>
            {' | '}
            <Link to={`/albums/${user.id}`}>{user.name}'s альбоми</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
