
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllPosts, getAllPosts, getAllUsers, getUserNameById } from '../redux/postSlice';
import PostCard from './PostCard';

function PostList() {

    const posts = useSelector(getAllPosts);
    const users = useSelector(getAllUsers);
    const dispatcher = useDispatch();

    useEffect(() => {
        fetchAllPosts(dispatcher);
    }, []);


    const postCards = posts.map((post) =>
        <PostCard key={post.id}
            id={post.id}
            title={post.title}
            description={post.body}
            userId={post.userId}
            username={getUserNameById(post.userId, users)} />);

    return (
        postCards
    )
}

export default PostList