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
import {getPageCount, getPagesArray} from "./utils/pages";
import myButton from "./UI/button/MyButton";
import Pagination from "./UI/pagination/Pagination";

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

    // const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);

    // let pagesArray = getPagesArray(totalPages);

    // const [isPostsLoading, setIsPostsLoading] = useState(true);
    const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
        const response = await PostServive.getAll(limit, page);
        setPosts(response.data);
        // console.log(response.headers['x-total-count']);
        const totalCount = response.headers['x-total-count'];
        setTotalPages(getPageCount(totalCount, limit));
    })

    const changePage = (page) => {
        setPage(page);
        fetchPosts(limit, page);
    }



    useEffect( () => {
        fetchPosts(limit, page)
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
        <Pagination
            page={page}
            changePage={changePage}
            totalPages={totalPages}
        />


    </div>
  );
}

export default App;
