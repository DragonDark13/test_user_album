import React, {useEffect, useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import UserAlbums from './components/UserAlbums/UserAlbums';
import UserPosts from './components/UserPosts/UserPosts';
import UsersList from './components/UsersList/UsersList';
import {BrowserRouter as Router} from 'react-router-dom';
import {HelmetProvider} from "react-helmet-async";

interface User {
    id: number;
    username: string;
}

const App: React.FC = () => {


    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        // Завантажити дані користувачів з API
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
                        <Route path="/albums/:userId" element={<UserAlbums/>}/>
                    </Routes>
                </div>
            </Router>
        </HelmetProvider>
    );
};

export default App;
