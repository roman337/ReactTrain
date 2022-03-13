import React, {useContext} from 'react';
import {Route, Routes} from "react-router-dom";
import About from "../pages/About";
import Posts from "../pages/Posts";
import Error from "../pages/Error";
import PostIdPage from "../pages/PostIdPage";
import {privateRoutes, publicRoutes} from "../router";
import {AuthContext} from "../context";

const AppRouter = () => {
    const {isAuth, setAuth} = useContext(AuthContext);
    console.log(isAuth);
    return (
        <Routes>
            {/*<Route path="/about" element = {<About/>}/>*/}
            {/*<Route exact path="/posts" element = {<Posts/>}/>*/}
            {/*<Route exact path="/posts/:id" element = {<PostIdPage/>}/>*/}
            {/*<Route path="/error" element = {<Error/>}/>*/}
            {/*<Route path="/"/>*/}
            {/*<Route path='*' element = {<Error/>}/>*/}

            {isAuth ?
                privateRoutes.map(route =>
                    <Route
                        path={route.path}
                        element={<route.element/>}
                        exact={route.exact}
                        key={route.path}
                    />)
                :
                publicRoutes.map(route =>
                        <Route
                            path={route.path}
                            element={<route.element/>}
                            exact={route.exact}
                            key={route.path}
                        />)
            }
        </Routes>
    );
};

export default AppRouter;