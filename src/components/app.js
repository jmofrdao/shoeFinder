import React, {useState, useEffect} from 'react'
import { Routes,Route } from 'react-router-dom'
import {Login, Header, Home} from './index'

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [shoes, setShoes] = useState([])

    useEffect(()=> {
        const token = localStorage.getItem("token")
        if (token) {
            setIsLoggedIn(true)
        }
    }, [])

    return (
        <div>
            <Header/>
            <Routes>
            <Route 
            path='/'
            element={
                <Home shoes={shoes} setShoes={setShoes}/>
            }/>
            <Route 
            path='/login'
            element={
            <Login setIsLoggedIn={setIsLoggedIn}/>}/>
            </Routes>
        </div>
    )
}

export default App