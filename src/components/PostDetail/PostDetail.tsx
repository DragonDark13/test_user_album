import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

const PostDetail: React.FC = () => {
    const {userId, postId} = useParams<{ userId: string; postId: string }>();
    const [post, setPost] = useState<Post | null>(null);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
            .then((response) => response.json())
            .then((data: Post) => setPost(data));
    }, [postId]);

    return (
        <div>
            {post ? (
                <>
                    <Helmet>
                        <meta charSet="utf-8"/>
                        <title>{post.title}</title>
                    </Helmet>
                    <h2>{post.title}</h2>
                    <p>{post.body}</p>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default PostDetail;
