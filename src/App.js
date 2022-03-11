import React, {useEffect, useMemo, useRef, useState} from 'react'
import Counter from "./components/Counter";
import ClassCounter from "./components/ClassCounter";
import './styles/App.css'
import PostItem from "./components/PostItem";
import PostsList from "./components/PostsList";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";
import PostForm from "./components/PostForm";
import MySelect from "./UI/select/MySelect";
import PostFilter from "./components/PostFilter";
import MyModal from "./UI/MyModal/MyModal";
import {usePosts} from "./hooks/usePosts";
import axios from "axios";
import PostServive from "./API/PostServive";
import Loader from "./UI/Loader/Loader";
import {useFetching} from "./hooks/useFetching";

function App() {
    const [posts, setPosts] = useState([
        // {id: 1, title: "ava", body: "gfgfg"},
        // {id: 2, title: "trew", body: "bvcc"},
        // {id: 3, title: "erty", body: "assdfg"}
    ]);

    // const [filter.sort, setfilter.sort] = useState('');
    // const [filter.query, setfilter.query] = useState('');

    const [filter, setFilter] = useState({sort: '', query: ''});
    const [modal, setModal] = useState(false);
    const sortedAndSearchingPosts = usePosts(posts, filter.sort, filter.query);
    // const [isPostsLoading, setIsPostsLoading] = useState(true);
    const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
        const posts = await PostServive.getAll();
        setPosts(posts);
    })

    useEffect( () => {
        fetchPosts()
    }, [] );

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
        setModal(false);
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id));
    }

    // async function fetchPost() {
    //
    // }

  return (
    <div className="App">
        <button onClick={fetchPosts}>GET POST</button>
        <MyButton style={{marginTop: '20px'}} onClick={() => setModal(true)}>
            Создать пост
        </MyButton>
        <MyModal visible={modal} setVisible={setModal} >
            <PostForm
                create={createPost}
            />
        </MyModal>

        <hr style={{margin: '15px 0'}}/>

        <PostFilter
            filter={filter}
            setFilter={setFilter}
        />

        {
            postError &&
            <h1>Произошла ошибка ${postError}</h1>
        }
        {
            isPostsLoading ?
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader/></div>
                // <Loader style={{display: 'flex', justifyContent: 'center'}}/>
            :
            <PostsList
                remove={removePost}
                posts={sortedAndSearchingPosts}
                title={"Список постов 1"}
            />
        }

    </div>
  );
}

export default App;
