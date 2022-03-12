import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import {useFetching} from "../hooks/useFetching";
import PostServive from "../API/PostServive";
import Loader from "../UI/Loader/Loader";

const PostIdPage = () => {
    const params = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);

    const [fetchPostById, isLoading, error] = useFetching(async (id) => {
        const response = await PostServive.getById(id);
        setPost(response.data)
    })

    const [fetchCommentById, isCommentLoading, commentError] = useFetching(async (id) => {
        const response = await PostServive.getCommentByPostId(id);
        setComments(response.data)
    })

    useEffect(() => {
        fetchPostById(params.id);
        fetchCommentById(params.id)
    }, [])

    return (
        <div>
            <h1>Вы открыли страницу поста c ID={params.id}</h1>
            {isLoading
                ? <Loader/>
                : <div>{post.id}. {post.title}</div>
            }
            {isCommentLoading
                ? <Loader/>
                : <div>
                    {comments.map(comm =>
                    <div style={{marginTop: '15px'}}>
                        <h5>{comm.email}</h5>
                        <div>{comm.body}</div>
                    </div>
                    )}
                </div>
            }
        </div>
    );
};

export default PostIdPage;