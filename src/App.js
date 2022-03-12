import React, {useEffect, useMemo, useRef, useState} from 'react'
import './styles/App.css'
import {BrowserRouter, Route, Routes, Switch, Link, Redirect} from "react-router-dom";
import {} from 'react-router';
import About from "./pages/About";
import Posts from "./pages/Posts";
import Navbar from "./UI/Navbar/Navbar";
import Error from "./pages/Error";
import AppRouter from "./components/AppRouter";

function App() {
    return (
        <BrowserRouter>
            <Navbar/>
            <AppRouter/>

        </BrowserRouter>
    )

}

export default App;