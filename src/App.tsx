import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserAlbums from './components/UserAlbums/UserAlbums';
import UserPosts from './components/UserPosts/UserPosts';
import UsersList from './components/UsersList/UsersList';
import {BrowserRouter as Router} from 'react-router-dom';


const App: React.FC = () => {
    return (
        <Router>
            <div>
               <Routes>
                   <Route path="/" element={<UsersList />} />
                <Route path="/posts/:userId" element={<UserPosts />} />
                <Route path="/albums/:userId" element={<UserAlbums />} />
               </Routes>
            </div>
        </Router>
    );
};

export default App;
