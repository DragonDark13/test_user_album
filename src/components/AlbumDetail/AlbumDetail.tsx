import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import { Album } from '../UserAlbums/UserAlbums';

const AlbumDetail: React.FC = () => {
    const {userId, albumId} = useParams<{ userId: string; albumId: string }>();
    const [album, setAlbum] = useState<Album | null>(null);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}`)
            .then((response) => response.json())
            .then((data: Album) => setAlbum(data));
    }, [albumId]);

    return (
        <div>
            {album ? (
                <>
                    <Helmet>
                        <title>{album.title}</title>
                    </Helmet>
                    <h2>{album.title}</h2>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default AlbumDetail;
