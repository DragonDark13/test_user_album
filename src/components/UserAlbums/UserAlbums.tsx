import React, {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import {User} from '../UsersList/UsersList';

export interface Album {
    userId: number;
    id: number;
    title: string;
}


const UserAlbums: React.FC = () => {
    const {userId} = useParams<{ userId: string }>();
    const [albums, setAlbums] = useState<Album[]>([]);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
            .then((response) => response.json())
            .then((data: Album[]) => setAlbums(data))
            .catch((error) => console.error('Error fetching albums:', error));

        fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
            .then((response) => response.json())
            .then((data: User) => setUser(data))
            .catch((error) => console.error('Error fetching user:', error));
    }, [userId]);


    return (
        <div>
            <Helmet>
                <title>{user && `${user.username }'s albums`}</title>
            </Helmet>
            {user && <h2>{user.username}'s albums</h2>}
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
