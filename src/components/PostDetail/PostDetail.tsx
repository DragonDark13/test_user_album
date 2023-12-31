import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import {Post} from '../UserPosts/UserPosts';
import {User} from "../UsersList/UsersList";


const PostDetail: React.FC = () => {
    const {userId, postId} = useParams<{ userId: string; postId: string }>();
    const [post, setPost] = useState<Post | null>(null);
    const [user, setUser] = useState<User | null>(null);


    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
            .then((response) => response.json())
            .then((data: Post) => setPost(data));

        fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
            .then((response) => response.json())
            .then((data: User) => setUser(data))
            .catch((error) => console.error('Error fetching user:', error));
    }, [postId, userId]);

    return (
        <div>
            {post ? (
                <React.Fragment>
                    <Helmet>
                        <title>{post.title}</title>
                    </Helmet>
                    <h2>{post.title}</h2>
                    <p>{post.body}</p>
                    <h5>{user?.username}</h5>
                </React.Fragment>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default PostDetail;
