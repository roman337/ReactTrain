import React, {useEffect, useMemo, useRef, useState} from 'react'
import './styles/App.css'
import {BrowserRouter, Route, Routes, Switch, Link, Redirect} from "react-router-dom";
import {} from 'react-router';
import About from "./pages/About";
import Posts from "./pages/Posts";
import Navbar from "./UI/Navbar/Navbar";
import Error from "./pages/Error";
import AppRouter from "./components/AppRouter";
import {AuthContext} from "./context";

function App() {
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('auth'))
            setIsAuth(true)
    }, [])

    return (
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth
        }}>
            <BrowserRouter>
                <Navbar/>
                <AppRouter/>
            </BrowserRouter>
        </AuthContext.Provider>
    )

}

export default App;