import React, {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import {User} from "../UsersList/UsersList";

export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

const UserPosts: React.FC = () => {
    const {userId} = useParams<{ userId: string }>();
    const [posts, setPosts] = useState<Post[]>([]);
    const [user, setUser] = useState<User | null>(null);


    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
            .then((response) => response.json())
            .then((data: Post[]) => setPosts(data));

        fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
            .then((response) => response.json())
            .then((data: User) => setUser(data))
            .catch((error) => console.error('Error fetching user:', error));
    }, [userId]);

    return (
        <div>
            <Helmet>
                <title>{user && `${user.username }'s posts`}</title>
            </Helmet>
            {user && <h2>{user.username}'s posts</h2>}
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <Link to={`/posts/${userId}/${post.id}`}>{post.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserPosts;
