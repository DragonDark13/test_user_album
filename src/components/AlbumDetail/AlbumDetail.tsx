import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import {Album} from '../UserAlbums/UserAlbums';
import {User} from "../UsersList/UsersList";

const AlbumDetail: React.FC = () => {
    const {userId, albumId} = useParams<{ userId: string; albumId: string }>();
    const [album, setAlbum] = useState<Album | null>(null);
    const [user, setUser] = useState<User | null>(null);


    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}`)
            .then((response) => response.json())
            .then((data: Album) => setAlbum(data));

        fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
            .then((response) => response.json())
            .then((data: User) => setUser(data))
            .catch((error) => console.error('Error fetching user:', error));
    }, [albumId,userId]);

    return (
        <div>
            {album ? (
                <React.Fragment>
                    <Helmet>
                        <title>{album.title}</title>
                    </Helmet>
                    <h2>{album.title}</h2>
                    <h5>{user?.username}</h5>
                </React.Fragment>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default AlbumDetail;
