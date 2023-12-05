import React, {useEffect, useState} from 'react';
import {Helmet} from 'react-helmet-async';
import {useNavigate} from 'react-router-dom';
import {Link, useLocation} from 'react-router-dom';

export interface User {
    id: number;
    username: string;
}

interface UsersListProps {
    users: User[];
}

const UsersList: React.FC<UsersListProps> = ({users}) => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const [searchTerm, setSearchTerm] = useState<string>(queryParams.get('search') || '');

    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    const navigate = useNavigate();


    const sortUsers = () => {
        return users.slice().sort((a, b) => {
            const nameA = a.username.toLowerCase();
            const nameB = b.username.toLowerCase();

            return sortDirection === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
        });
    };

    const sortedAndFilteredUsers = sortUsers().filter((user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        const newParams = new URLSearchParams();
        if (searchTerm) {
            newParams.set('search', searchTerm);
        }

        // Update the URL with the new query parameters
        navigate(`?${newParams.toString()}`, {replace: true});
    }, [searchTerm, navigate]);

    return (
        <div>
            <Helmet>
                <title>User List</title>
            </Helmet>
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
                        <h4>{user.username}</h4>
                        <Link to={`/posts/${user.id}`}>All posts</Link>
                        {' | '}
                        <Link to={`/albums/${user.id}`}>All albums</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UsersList;
