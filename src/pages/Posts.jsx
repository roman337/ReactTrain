import React, {useEffect, useMemo, useRef, useState} from 'react'
import {usePosts} from "../hooks/usePosts";
import {useFetching} from "../hooks/useFetching";
import PostServive from "../API/PostServive";
import {getPageCount} from "../utils/pages";
import MyButton from "../UI/button/MyButton";
import MyModal from "../UI/MyModal/MyModal";
import PostForm from "../components/PostForm";
import Loader from "../UI/Loader/Loader";
import PostFilter from "../components/PostFilter";
import PostsList from "../components/PostsList";
import Pagination from "../UI/pagination/Pagination";
import {useObserver} from "../hooks/useObserver";
import MySelect from "../UI/select/MySelect";


function Posts() {
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

    const lastElement = useRef();
    console.log(lastElement);

    // let pagesArray = getPagesArray(totalPages);

    // const [isPostsLoading, setIsPostsLoading] = useState(true);
    const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
        const response = await PostServive.getAll(limit, page);
        // setPosts(response.data);
        setPosts([...posts, ...response.data])
        // console.log(response.headers['x-total-count']);
        const totalCount = response.headers['x-total-count'];
        setTotalPages(getPageCount(totalCount, limit));
    })

    useObserver(lastElement, page < totalPages, isPostsLoading, () => {
        setPage(page + 1);
    })

    useEffect( () => {
        fetchPosts(limit, page)
    }, [page, limit] );

    const changePage = (page) => {
        setPage(page);
        // fetchPosts(limit, page);
    }

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
        setModal(false);
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id));
    }

    return (
        <div className="App">
            {/*<button onClick={fetchPosts}>GET POST</button>*/}
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

            <MySelect
                value={limit}
                onChange={value => setLimit(value)}
                defaultValue={"Кол-во элементов на странице"}
                options={[
                    {value: 5, name: '5'},
                    {value: 10, name: '10'},
                    {value: 15, name: '15'},
                    {value: 25, name: '25'},
                    {value: -1, name: 'Показать все'},
                ]}
            />

            {
                postError &&
                <h1>Произошла ошибка ${postError}</h1>
            }

            <PostsList
                remove={removePost}
                posts={sortedAndSearchingPosts}
                title={"Список постов 1"}
            />

            <div ref={lastElement} style={{height: '20px', background: 'red'}}/>

            {
                isPostsLoading &&
                    <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader/></div>
                    // <Loader style={{display: 'flex', justifyContent: 'center'}}/>
            }
            <Pagination
                page={page}
                changePage={changePage}
                totalPages={totalPages}
            />


        </div>
    );
}

export default Posts;
