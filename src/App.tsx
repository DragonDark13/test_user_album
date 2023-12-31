import React, {useEffect, useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import UserAlbums from './components/UserAlbums/UserAlbums';
import UserPosts from './components/UserPosts/UserPosts';
import UsersList, {User} from './components/UsersList/UsersList';
import { HashRouter as Router } from 'react-router-dom';
import {HelmetProvider} from "react-helmet-async";
import AlbumDetail from "./components/AlbumDetail/AlbumDetail";
import PostDetail from "./components/PostDetail/PostDetail";


const App: React.FC = () => {


    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((response) => response.json())
            .then((data: User[]) => setUsers(data))
            .catch((error) => console.error('Error fetching users:', error));
    }, []);

    return (
        <HelmetProvider>
            <Router>
                <div>
                    <Routes>
                        <Route path="/" element={<UsersList users={users}/>}/>
                        <Route path="/posts/:userId" element={<UserPosts/>}/>
                        <Route path="/posts/:userId/:postId" element={<PostDetail/>}/>
                        <Route path="/albums/:userId" element={<UserAlbums/>}/>
                        <Route path="/albums/:userId/:albumId" element={<AlbumDetail/>}/>
                    </Routes>
                </div>
            </Router>
        </HelmetProvider>
    );
};

export default App;
