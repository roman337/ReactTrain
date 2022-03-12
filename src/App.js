import React, {useEffect, useMemo, useRef, useState} from 'react'
import './styles/App.css'
import {BrowserRouter, Route, Routes, Link} from "react-router-dom";
import About from "./pages/About";
import Posts from "./pages/Posts";
import Navbar from "./UI/Navbar/Navbar";

function App() {
    return (
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path="/about" element = {<About/>}/>
                <Route path="/posts" element = {<Posts/>}/>
            </Routes>
        </BrowserRouter>
    )

}

export default App;