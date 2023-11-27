import React, {useState} from 'react';
import {Link} from 'react-router-dom';

interface User {
    id: number;
    username: string;
}

interface UsersListProps {
    users: User[];
}

const UsersList: React.FC<UsersListProps> = ({users}) => {
     const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    // Функція для сортування за ім'ям користувача
    const sortUsers = () => {
        const sortedUsers = users.slice().sort((a, b) => {
            const nameA = a.username.toLowerCase();
            const nameB = b.username.toLowerCase();

            if (sortDirection === 'asc') {
                return nameA.localeCompare(nameB);
            } else {
                return nameB.localeCompare(nameA);
            }
        });

        return sortedUsers;
    };

    // Отримайте відсортований та відфільтрований список користувачів
    const sortedAndFilteredUsers = sortUsers().filter((user) =>
        (user as { username: string }).username.toLowerCase().includes(searchTerm.toLowerCase())
    );


    return (
        <div>
            <input
                type="text"
                placeholder="Search by username"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}>
                Toggle Sort ({sortDirection})
            </button>

            <ul>
                {sortedAndFilteredUsers.map((user) => (
                    <li key={user.id}>
                        <Link to={`/posts/${user.id}`}>{user.username}'s пости</Link>
                        {' | '}
                        <Link to={`/albums/${user.id}`}>{user.username}'s альбоми</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UsersList;
