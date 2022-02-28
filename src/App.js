import React, {useRef, useState} from 'react'
import Counter from "./components/Counter";
import ClassCounter from "./components/ClassCounter";
import './styles/App.css'
import PostItem from "./components/PostItem";
import PostsList from "./components/PostsList";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";
import PostForm from "./components/PostForm";
import MySelect from "./UI/select/MySelect";

function App() {
    const [posts, setPosts] = useState([
        {id: 1, title: "ava", body: "gfgfg"},
        {id: 2, title: "trew", body: "bvcc"},
        {id: 3, title: "erty", body: "assdfg"}
    ]);

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id));
    }

    const [selectedSort, setSelectedSort] = useState('');

    const sortPosts = (sort) => {
        setSelectedSort(sort);
        setPosts([...posts].sort((a,b) => a[sort].localeCompare(b[sort])));
    }
  return (
    <div className="App">
        <PostForm
            create={createPost}
        />
        <div>
            <hr style={{margin: '15px 0'}}/>
            <MySelect
                value={selectedSort}
                onChange={sortPosts}
                defaultValue={'Сортировка по '}
                options={ [
                    {value: 'title', name: 'по названию'},
                    {value: 'body', name: 'по описанию'}
                ]}
            />
        </div>
        { posts.length ?
            <PostsList
                remove={removePost}
                posts={posts}
                title={"Список постов 1"}
            />
            :
            <h1 style={{textAlign: 'center'}}>
                Посты не найдены!
            </h1>}
    </div>
  );
}

export default App;
